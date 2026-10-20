import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, X, Eye, EyeOff, Calendar, Plus } from 'lucide-react';
import AnimatedBackground from '../components/animatedbackground.jsx';
import Grainient from '../components/gradient.jsx';
import ViewEventModal from '../components/vieweventmodal.jsx';
import LogoutModal from '../components/logoutmodal.jsx';
import '../css/account.css';

function Account() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneCode: '+27',
    phoneNumber: '',
    password: '••••••••',
    preferredRole: 'Packing Jars',
    emailNotifications: true,
    avatar: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [pastEvents, setPastEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [selectedEventForView, setSelectedEventForView] = useState(null);

  const storedUser = localStorage.getItem('user');
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const currentUserId = currentUser?._id || currentUser?.id;
  const currentUserEmail = currentUser?.email;

  const parseEventDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.trim().split(/[\s/.-]+/);
    if (parts.length === 3) {
      if (isNaN(parts[1])) {
        const [day, monthName, year] = parts;
        const parsed = new Date(`${monthName} ${day}, ${year}`);
        if (!isNaN(parsed)) return parsed;
      } else {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        let year = parseInt(parts[2], 10);
        if (year < 100) year += 2000;
        return new Date(year, month, day);
      }
    }
    const directDate = new Date(dateStr);
    return isNaN(directDate) ? null : directDate;
  };

  const getAssignedRole = (event) => {
    if (!event.volunteersList || !Array.isArray(event.volunteersList)) {
      return event.selectedRole || 'Volunteer';
    }

    const rosterEntry = event.volunteersList.find((v) => {
      const rosterId = v.userId?._id || v.userId;
      const matchesId = currentUserId && String(rosterId) === String(currentUserId);
      const matchesEmail =
        currentUserEmail && v.email?.toLowerCase() === currentUserEmail.toLowerCase();
      return matchesId || matchesEmail;
    });

    return rosterEntry?.role || event.selectedRole || 'Volunteer';
  };

  useEffect(() => {
    if (currentUser) {
      const phoneParts = (currentUser.phone || '').split(' ');
      setUserData((prev) => ({
        ...prev,
        fullName: currentUser.name || currentUser.fullName || '',
        email: currentUser.email || '',
        phoneCode: phoneParts[0] || '+27',
        phoneNumber: phoneParts[1] || currentUser.phoneNumber || '',
        avatar: currentUser.avatar || '',
      }));
    }

    const fetchUserPastEvents = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/events`);
        if (!res.ok) throw new Error('Failed to load events');
        const data = await res.json();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const participatedPast = data.filter((evt) => {
          if (!evt.volunteersList || !Array.isArray(evt.volunteersList)) return false;

          const isRegistered = evt.volunteersList.some((v) => {
            const rosterId = v.userId?._id || v.userId;
            const matchesId = currentUserId && String(rosterId) === String(currentUserId);
            const matchesEmail =
              currentUserEmail && v.email?.toLowerCase() === currentUserEmail.toLowerCase();
            return matchesId || matchesEmail;
          });

          if (!isRegistered) return false;

          const eventDate = parseEventDate(evt.date);
          return eventDate ? eventDate < today : false;
        });

        setPastEvents(participatedPast);
      } catch (err) {
        console.error('Error loading participated past events:', err.message);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchUserPastEvents();
  }, [currentUserId, currentUserEmail]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleConfirmLogout = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'logout');
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  const handleCloseToDashboard = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/volunteer');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUserData((prev) => ({
      ...prev,
      avatar: '',
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
          <button
            type='button'
            className='account-card-close'
            onClick={handleCloseToDashboard}
            aria-label='Return to dashboard'
          >
            <X size={18} />
          </button>
          <h1 className='account-main-title'>Profile</h1>

          <div className='account-grid'>
            <section className='account-form-section'>
              <h2 className='section-title'>Account</h2>

              <div className='profile-picture-row'>
                {userData.avatar ? (
                  <img src={userData.avatar} alt='Profile' className='profile-avatar-img' />
                ) : (
                  <div className='profile-avatar-default'>
                    <User size={32} />
                  </div>
                )}

                <div className='profile-picture-actions'>
                  <span className='profile-picture-label'>Profile Picture</span>
                  <div className='profile-btn-group'>
                    <label className='btn-upload-img'>
                      <Plus size={14} /> Upload Image
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
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
                  <button
                    type='button'
                    className='btn-logout'
                    onClick={() => setIsLogoutModalOpen(true)}
                  >
                    Log Out
                  </button>
                </div>
              </form>
            </section>

            <section className='account-events-section'>
              <h2 className='section-title'>Past participated Events</h2>
              <div className='events-card-wrapper'>
                {loadingEvents ? (
                  <p className='upcoming-status-text'>Loading your past events...</p>
                ) : pastEvents.length === 0 ? (
                  <div className='upcoming-empty-state'>
                    <p className='available-empty-text'>No past events participated in yet.</p>
                    <span className='available-empty-sub'>
                      Events you join will appear here once their dates pass!
                    </span>
                  </div>
                ) : (
                  <div className='events-list'>
                    {pastEvents.map((evt) => (
                      <div key={evt._id || evt.id} className='event-item-row'>
                        {evt.image ? (
                          <img src={evt.image} alt={evt.title} className='event-thumb' />
                        ) : (
                          <div className='event-thumb-fallback'>
                            <Calendar size={20} />
                          </div>
                        )}
                        <div className='event-details'>
                          <h3 className='event-name'>{evt.title}</h3>
                          <p className='event-meta-date'>{evt.date}</p>
                          <p className='event-meta-role'>
                            Chosen Role: <span>{getAssignedRole(evt)}</span>
                          </p>
                        </div>
                        <button
                          type='button'
                          className='btn-view-event'
                          onClick={() => setSelectedEventForView(evt)}
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                )}

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

      <ViewEventModal
        isOpen={Boolean(selectedEventForView)}
        event={selectedEventForView}
        userRole={selectedEventForView ? getAssignedRole(selectedEventForView) : ''}
        onClose={() => setSelectedEventForView(null)}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </>
  );
}

export default Account;
