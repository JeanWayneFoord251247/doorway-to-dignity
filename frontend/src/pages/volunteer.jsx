import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import AnimatedBackground from '../components/animatedbackground.jsx';
import Grainient from '../components/gradient.jsx';
import UpcomingEvents from '../components/upcomingevents.jsx';
import VolunteerCalendar from '../components/volunteercalendar.jsx';
import AvailableEvents from '../components/availableevents.jsx';
import '../css/volunteer.css';

function VolunteerPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem('user');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const currentUserId = currentUser?._id || currentUser?.id;
  const currentUserEmail = currentUser?.email;

  const fetchAllEvents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/events');
      if (!res.ok) throw new Error('Failed to load events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Error fetching events:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const handleSignUpForEvent = async (eventId, chosenRole) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: chosenRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Could not sign up for this event');
      }

      setEvents((prev) =>
        prev.map((evt) => (evt._id === eventId ? data.event : evt))
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLeaveEvent = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Could not leave event');
      }

      setEvents((prev) =>
        prev.map((evt) => (evt._id === eventId ? data.event : evt))
      );
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  };

  const isUserRegistered = (evt) => {
    if (!evt.volunteersList || !Array.isArray(evt.volunteersList)) return false;
    return evt.volunteersList.some((v) => {
      const rosterUserId = v.userId?._id || v.userId;
      const matchesId = currentUserId && String(rosterUserId) === String(currentUserId);
      const matchesEmail =
        currentUserEmail && v.email?.toLowerCase() === currentUserEmail.toLowerCase();
      return matchesId || matchesEmail;
    });
  };

  const upcomingEvents = events.filter((evt) => isUserRegistered(evt));
  const availableEvents = events.filter((evt) => !isUserRegistered(evt));

  return (
    <>
      <AnimatedBackground />
      <Grainient
        color1="#E9E3D5"
        color2="#13C0D1"
        color3="#E9E3D5"
        timeSpeed={1.0}
        colorBalance={0}
        warpStrength={4}
        warpFrequency={0}
        warpSpeed={2}
        warpAmplitude={80}
        blendAngle={0}
        blendSoftness={0}
        rotationAmount={0}
        noiseScale={0}
        grainAmount={0}
        grainScale={0.2}
        grainAnimated={false}
        contrast={2}
        gamma={2.5}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />

      <Navbar />

      <div className="volunteer-page">
        <main className="volunteer-container">
          <div className="volunteer-top-grid">
            <UpcomingEvents
              events={upcomingEvents}
              loading={loading}
              currentUser={currentUser}
              onLeave={handleLeaveEvent}
            />
            <VolunteerCalendar events={events} />
          </div>

          <AvailableEvents
            events={availableEvents}
            loading={loading}
            onSignUp={handleSignUpForEvent}
          />
        </main>
      </div>
    </>
  );
}

export default VolunteerPage;