import express from 'express';
import FAQ from '../models/Faq.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ createdAt: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFaq = new FAQ({ question, answer });
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const updated = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;