import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import AnimatedBackground from '../components/animatedbackground.jsx';
import AdminSidebar from '../components/adminsidebar.jsx';
import VolunteerCalendar from '../components/volunteercalendar.jsx';
import '../css/admin.css';
import Grainient from '../components/gradient.jsx';
import AdminEventsManager from '../components/admineventsmanager.jsx';

function AdminPage() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchAllEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/events`);
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

  return (
    <>
      <AnimatedBackground />
      <Grainient
        color1='#E9E3D5'
        color2='#13C0D1'
        color3='#E9E3D5'
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

      <div className='admin-page'>
        <main className='admin-container'>
          <div className='admin-top-grid'>
            <AdminSidebar />
            <VolunteerCalendar events={events} />
          </div>

          <AdminEventsManager />
        </main>
      </div>
    </>
  );
}

export default AdminPage;
