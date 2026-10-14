import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AnimatedBackground from '../components/animatedbackground.jsx';
import '../css/login.css';
import loginHero from '../assets/img/signup.png';
import Grainient from '../components/gradient.jsx';


function Login() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const [isClosing, setIsClosing] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', data.role);

      navigate(data.role === 'admin' ? '/admin' : '/volunteer');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsClosing(true);
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

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

      <div className={`login-page ${isClosing ? 'page-exit' : ''}`}>
        <div className={`login-card ${isClosing ? 'card-exit' : ''}`}>
          <button type='button' className='card-close-btn' onClick={handleClose} aria-label='close'>
            ✕
          </button>

          <div className='login-visual-side'>
            <h2 className='login-slogan'>Restoring Dignity, Renewing Hope, One Step at a Time</h2>
            <img
              src={loginHero}
              alt='Community volunteers serving meals'
              className='login-hero-img'
            />
          </div>

          <div className='login-form-side'>
            <h1 className='login-title'>Login</h1>

            {errorMessage && <div className='signup-error-banner'>{errorMessage}</div>}

            <form className='login-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Enter your Email'
                  value={credentials.email}
                  onChange={handleChange}
                  className='form-input'
                  required
                />
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
                    value={credentials.password}
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

                <div className='forgot-password-wrapper'>
                  <Link to='/forgot-password' className='forgot-password-link'>
                    Forgot Password
                  </Link>
                </div>
              </div>

              <div className='form-actions'>
                <button type='submit' className='btn-login-primary' disabled={isLoading}>
                  {isLoading ? 'Logging In...' : 'Log In'}
                </button>
                <Link to='/signup' className='btn-signup-outline'>
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
