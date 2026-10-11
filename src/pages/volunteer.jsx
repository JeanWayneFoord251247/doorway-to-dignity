import React from 'react';
import Navbar from '../components/navbar.jsx';
import AnimatedBackground from '../components/animatedbackground.jsx';
import '../css/volunteer.css';
import Grainient from '../components/gradient.jsx';
import UpcomingEvents from '../components/upcomingevents';
import VolunteerCalendar from '../components/volunteercalendar.jsx';
import AvailableEvents from '../components/availableevents.jsx'

function VolunteerPage() {
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

      <div className='volunteer-page'>
        <main className='volunteer-container'>
          <div className='volunteer-top-grid'>
            <UpcomingEvents />
            <VolunteerCalendar />
          </div>

          <AvailableEvents />
        </main>
      </div>
    </>
  );
}

export default VolunteerPage;
