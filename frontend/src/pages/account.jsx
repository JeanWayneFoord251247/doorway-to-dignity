import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/animatedbackground.jsx';
import Grainient from '../components/gradient.jsx';
import '../css/account.css';

const initialPastEvents = [
  {
    id: 1,
    title: 'Jars of hope',
    date: '04/08/26',
    role: 'Packing Jars',
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    title: 'Shelterbag Project',
    date: '21/05/26',
    role: 'Designating Food',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    title: 'Pots of hope',
    date: '17/05/26',
    role: 'Designating Food',
    image:
      'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 4,
    title: 'Shelterbag Project',
    date: '16/02/26',
    role: 'Designating Food',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=150&q=80',
  },
];

function Account() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+27',
    phoneNumber: '',
    password: '••••••••',
    preferredRole: 'Packing Jars',
    emailNotifications: true,
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const phoneParts = (parsed.phone || '').split(' ');
        setUserData((prev) => ({
          ...prev,
          fullName: parsed.name || parsed.fullName || '',
          email: parsed.email || '',
          phoneCode: phoneParts[0] || '+27',
          phoneNumber: phoneParts[1] || parsed.phoneNumber || '',
          avatar: parsed.avatar || prev.avatar,
        }));
      } catch (err) {
        console.error('Error parsing user data', err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleRemoveImage = () => {
    setUserData((prev) => ({
      ...prev,
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    }));
  };

  return (
    <>
      <div className='account-bg-container'>
        <AnimatedBackground />
      </div>

      <div className='account-grain-container'>
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

      <main className='account-page-wrapper'>
        <div className='account-card'>
          <h1 className='account-main-title'>Profile</h1>

          <div className='account-grid'>
            <section className='account-form-section'>
              <h2 className='section-title'>Account</h2>

              <div className='profile-picture-row'>
                <img src={userData.avatar} alt='Profile' className='profile-avatar-img' />
                <div className='profile-picture-actions'>
                  <span className='profile-picture-label'>Profile Picture</span>
                  <div className='profile-btn-group'>
                    <label className='btn-upload-img'>
                      + Upload Image
                      <input type='file' accept='image/*' onChange={handleImageUpload} hidden />
                    </label>
                    <button type='button' className='btn-remove-img' onClick={handleRemoveImage}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <form className='account-inputs-grid' onSubmit={(e) => e.preventDefault()}>
                <div className='account-form-group'>
                  <label htmlFor='fullName' className='account-label'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='fullName'
                    name='fullName'
                    placeholder='Full name'
                    value={userData.fullName}
                    onChange={handleChange}
                    className='account-input'
                  />
                </div>

                <div className='account-form-group'>
                  <label htmlFor='email' className='account-label'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='@'
                    value={userData.email}
                    onChange={handleChange}
                    className='account-input'
                  />
                </div>

                <div className='account-form-group'>
                  <label htmlFor='password' className='account-label'>
                    Password
                  </label>
                  <div className='account-password-wrapper'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      value={userData.password}
                      onChange={handleChange}
                      className='account-input'
                    />
                    <button
                      type='button'
                      className='account-password-toggle'
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label='Toggle password visibility'
                    >
                      <i className={`fi ${showPassword ? 'fi-sr-eye-crossed' : 'fi-sr-eye'}`}></i>
                    </button>
                  </div>
                </div>

                <div className='account-form-group'>
                  <label htmlFor='phoneNumber' className='account-label'>
                    Phone Number
                  </label>
                  <div className='account-phone-row'>
                    <input
                      type='text'
                      name='phoneCode'
                      value={userData.phoneCode}
                      onChange={handleChange}
                      className='account-input phone-prefix'
                    />
                    <input
                      type='tel'
                      id='phoneNumber'
                      name='phoneNumber'
                      placeholder='00000000'
                      value={userData.phoneNumber}
                      onChange={handleChange}
                      className='account-input phone-body'
                    />
                  </div>
                </div>

                <div className='account-form-group'>
                  <label htmlFor='preferredRole' className='account-label'>
                    Preferred Role
                  </label>
                  <select
                    id='preferredRole'
                    name='preferredRole'
                    value={userData.preferredRole}
                    onChange={handleChange}
                    className='account-input account-select'
                  >
                    <option value='Packing Jars'>Packing Jars</option>
                    <option value='Designating Food'>Designating Food</option>
                    <option value='Community Outreach'>Community Outreach</option>
                    <option value='Logistics'>Logistics</option>
                  </select>
                </div>

                <div className='account-form-group checkbox-cell'>
                  <label className='checkbox-row-label'>
                    <span>Receive email notifications</span>
                    <input
                      type='checkbox'
                      name='emailNotifications'
                      checked={userData.emailNotifications}
                      onChange={handleChange}
                      className='account-checkbox'
                    />
                  </label>
                </div>

                <div className='account-actions-row'>
                  <button type='button' className='btn-logout' onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              </form>
            </section>

            <section className='account-events-section'>
              <h2 className='section-title'>Past participated Events</h2>
              <div className='events-card-wrapper'>
                <div className='events-list'>
                  {initialPastEvents.map((evt) => (
                    <div key={evt.id} className='event-item-row'>
                      <img src={evt.image} alt={evt.title} className='event-thumb' />
                      <div className='event-details'>
                        <h3 className='event-name'>{evt.title}</h3>
                        <p className='event-meta-date'>{evt.date}</p>
                        <p className='event-meta-role'>
                          Chosen Role: <span>{evt.role}</span>
                        </p>
                      </div>
                      <button
                        type='button'
                        className='btn-view-event'
                        onClick={() => navigate(`/events/${evt.id}`)}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>

                <div className='events-pagination-dots'>
                  <span className='dot'>•</span>
                  <span className='dot'>•</span>
                  <span className='dot'>•</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Account;
