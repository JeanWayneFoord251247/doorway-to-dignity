import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/adminsidebar.css';

function AdminSidebar({ user, onLogout }) {
  const navigate = useNavigate();
  const [eventsOpen, setEventsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <aside className='admin-sidebar-wrapper'>
      <div className='admin-profile-card'>
        <div>
          <h2 className='admin-card-inner-title'>Admin Dashboard</h2>

          <div className='admin-profile-header'>
            <div className='admin-avatar-container'>
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.name || 'Admin'}
                  className='admin-avatar-img'
                />
              ) : (
                <div className='admin-avatar-fallback'>
                  <i className='fi fi-sr-user'></i>
                </div>
              )}
            </div>
            <p className='admin-contact-item'>
              <i className='fi fi-sr-user'></i> {user?.name || user?.fullName || 'Administrator'}
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

            <NavLink
              to='/admin/volunteers'
              className={({ isActive }) => `admin-menu-item ${isActive ? 'active' : ''}`}
            >
              <div className='admin-menu-left'>
                <i className='fi fi-sr-users-alt'></i>
                <span>Volunteers</span>
              </div>
              <span className='admin-menu-arrow'>›</span>
            </NavLink>
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