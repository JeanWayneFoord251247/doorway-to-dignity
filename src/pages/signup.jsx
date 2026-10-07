import React, { useState } from 'react';
import '../css/signup.css';
import joinImg from '../assets/img/signup.png';
import { Link, useNavigate } from 'react-router-dom';
import Grainient from '../components/gradient.jsx';
import AnimatedBackground from '../components/animatedbackground.jsx';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+27',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', 'volunteer');
    localStorage.setItem('user', JSON.stringify(formData));

    navigate('/');
  };

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <AnimatedBackground />
      </div>

      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
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
      </div>
      <div className='signup-page'>
        <div className='signup-card'>
          <Link to='/' className='card-close-btn' aria-label='Close'>
            ✕
          </Link>
          <div className='signup-columns'>
            <div className='signup-left'>
              <h1 className='signup-title'>Sign Up</h1>
              <form className='signup-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='fullName' className='form-label'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='fullName'
                    name='fullName'
                    placeholder='Full name'
                    value={formData.fullName}
                    onChange={handleChange}
                    className='form-input'
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='email' className='form-label'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    className='form-input'
                    required
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='phoneNumber' className='form-label'>
                    Phone Number
                  </label>
                  <div className='phone-input-row'>
                    <input
                      type='text'
                      name='phoneCode'
                      value={formData.phoneCode}
                      onChange={handleChange}
                      className='form-input phone-code-input'
                    />
                    <input
                      type='tel'
                      id='phoneNumber'
                      name='phoneNumber'
                      placeholder='000000000'
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className='form-input phone-number-input'
                      required
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <div className='password-input-wrapper'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      placeholder='••••••••'
                      value={formData.password}
                      onChange={handleChange}
                      className='form-input password-input'
                      required
                    />
                    <button
                      type='button'
                      className='password-toggle-btn'
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label='Toggle password visibility'
                    >
                      <i className={`fi ${showPassword ? 'fi-sr-eye-crossed' : 'fi-sr-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='confirmPassword' className='form-label'>
                    Confirm Password
                  </label>
                  <div className='password-input-wrapper'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='confirmPassword'
                      name='confirmPassword'
                      placeholder='••••••••'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className='form-input password-input'
                      required
                    />
                    <button
                      type='button'
                      className='password-toggle-btn'
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label='Toggle confirm password visibility'
                    >
                      <i className={`fi ${showPassword ? 'fi-sr-eye-crossed' : 'fi-sr-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className='terms-row'>
                  <div className='terms-text-group'>
                    <span className='terms-title'>Terms &amp; conditions</span>
                    <p className='terms-subtitle'>
                      I agree to the terms and privacy conditions of the organisation
                    </p>
                  </div>
                  <input
                    type='checkbox'
                    id='agreedToTerms'
                    name='agreedToTerms'
                    checked={formData.agreedToTerms}
                    onChange={handleChange}
                    className='terms-checkbox'
                    required
                  />
                </div>

                <div className='form-actions'>
                  <button type='submit' className='btn-signup-primary'>
                    Sign Up
                  </button>
                  <Link to='/login' className='btn-login-secondary'>
                    Log In
                  </Link>
                </div>
              </form>
            </div>

            <div className='signup-right'>
              <div className='why-join-header'>
                <h2 className='why-join-title'>Why Join?</h2>
                <span className='why-join-subtitle'>Doorway To Dignity</span>
              </div>

              <div className='why-join-image-container'>
                <img
                  src={joinImg}
                  alt='Volunteers serving food in the community'
                  className='why-join-image'
                />
              </div>

              <div className='why-join-benefits'>
                <div className='benefit-item'>
                  <div className='benefit-icon-badge'>
                    <i className='fi fi-sr-heart'></i>
                  </div>
                  <p className='benefit-text'>
                    Your time and skills can directly support people in need, helping Doorway To
                    Dignity create meaningful change in the community.
                  </p>
                </div>

                <div className='benefit-item'>
                  <div className='benefit-icon-badge'>
                    <i className='fi fi-sr-smile'></i>
                  </div>
                  <p className='benefit-text'>
                    Volunteering gives you the opportunity to gain experience, develop new skills,
                    meet like-minded people, and grow personally.
                  </p>
                </div>

                <div className='benefit-item'>
                  <div className='benefit-icon-badge'>
                    <i className='fi fi-sr-sun'></i>
                  </div>
                  <p className='benefit-text'>
                    Join a community that cares. Your contribution helps Doorway To Dignity continue
                    its work and create a positive impact for those who need it most.
                  </p>
                </div>
              </div>
              <p className='why-join-faq-hint'>
                Have questions before joining? Check our <Link to='/faq'>FAQ</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
