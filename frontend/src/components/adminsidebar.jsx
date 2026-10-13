import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/adminsidebar.css';

function AdminSidebar({ user, onLogout }) {
  const navigate = useNavigate();
  const [eventsOpen, setEventsOpen] = useState(true);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <aside className='admin-sidebar-wrapper'>
      <div className='admin-profile-card'>
        <div>
          <h2 className='admin-card-inner-title'>Admin Dashboard</h2>

          <div className='admin-profile-header'>
            <div className='admin-avatar-container'>
              <img
                src={
                  user?.avatar ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                }
                alt={user?.name || 'Admin'}
                className='admin-avatar-img'
              />
            </div>
            <p className='admin-contact-item'>
              <i className='fi fi-sr-user'></i> {user?.name || 'Administrator'}
            </p>
            <p className='admin-contact-item'>
              <i className='fi fi-sr-envelope'></i> {user?.email || 'admin@organization.org'}
            </p>
          </div>

          <nav className='admin-menu-list'>
            <div className='admin-menu-group'>
              <button
                type='button'
                className='admin-menu-item'
                onClick={() => setEventsOpen((prev) => !prev)}
              >
                <div className='admin-menu-left'>
                  <i className='fi fi-sr-calendar'></i>
                  <span>Events Management</span>
                </div>
                <span className={`admin-menu-arrow ${eventsOpen ? 'rotated' : ''}`}>›</span>
              </button>

              <div className={`admin-submenu-wrapper ${eventsOpen ? 'open' : ''}`}>
                <div className='admin-submenu-inner'>
      
                  <NavLink to='/admin/events/create' className='admin-submenu-item'>
                    <i className='fi fi-sr-plus'></i>
                    <span>Create Event</span>
                  </NavLink>
                </div>
              </div>
            </div>

            <button
              type='button'
              className='admin-menu-item'
              onClick={() => navigate('/admin/volunteers')}
            >
              <div className='admin-menu-left'>
                <i className='fi fi-sr-users-alt'></i>
                <span>Volunteers</span>
              </div>
              <span className='admin-menu-arrow'>›</span>
            </button>
          </nav>
        </div>

        <button type='button' className='admin-menu-item logout' onClick={handleLogout}>
          <div className='admin-menu-left'>
            <i className='fi fi-sr-sign-out-alt'></i>
            <span>Log Out</span>
          </div>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
