import express from 'express';
import Event from '../models/Event.js';
import { protect, requireAdmin } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/participated', protect, async (req, res) => {
  try {
    const userEvents = await Event.find({
      'volunteersList.userId': req.user._id,
    }).sort({ date: -1 });

    res.json(userEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, requireAdmin, async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.user._id,
      volunteersCurrent: 0,
      volunteersList: [],
    };

    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:id/signup', protect, async (req, res) => {
  const { role } = req.body;

  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.volunteersCurrent >= event.volunteersMax) {
      return res.status(400).json({ message: 'This event is already full' });
    }

    const isAlreadySignedUp = event.volunteersList.some(
      (v) => v.userId && v.userId.toString() === req.user._id.toString()
    );

    if (isAlreadySignedUp) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    event.volunteersList.push({
      userId: req.user._id,
      role: role || (event.rolesNeeded && event.rolesNeeded[0]) || 'General Volunteer',
      name: req.user.name,
      email: req.user.email,
    });

    event.volunteersCurrent = event.volunteersList.length;
    await event.save();

    res.json({ message: 'Successfully signed up!', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/leave', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.volunteersList = event.volunteersList.filter((v) => {
      const rosterId = v.userId?._id;
      const matchesId = rosterId && rosterId.toString() === req.user._id.toString();
      const matchesEmail = v.email && v.email.toLowerCase() === req.user.email.toLowerCase();
      return !matchesId && !matchesEmail;
    });

    event.volunteersCurrent = event.volunteersList.length;
    await event.save();

    res.json({ message: 'Successfully removed from event', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;