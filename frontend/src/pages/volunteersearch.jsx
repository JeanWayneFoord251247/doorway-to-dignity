import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import AnimatedBackground from '../components/animatedbackground.jsx';
import Grainient from '../components/gradient.jsx';
import '../css/volunteersearch.css';

function VolunteersSearch() {
  const navigate = useNavigate();

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

      <main className='coming-soon-wrapper'>
        <div className='coming-soon-card'>
          <div className='coming-soon-icon'>
            <i className='fi fi-sr-users-alt'></i>
          </div>

          <h1 className='coming-soon-title'>Volunteers Search</h1>
          <span className='coming-soon-badge'>Coming Soon</span>

          <p className='coming-soon-desc'>
            We are working on this feature. You will soon be able to search, inspect volunteer
            activity, and manage member profiles here.
          </p>

          <button type='button' className='btn-coming-soon-back' onClick={() => navigate('/admin')}>
            Back to Dashboard
          </button>
        </div>
      </main>
    </>
  );
}

export default VolunteersSearch;
