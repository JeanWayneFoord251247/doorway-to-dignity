import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, ChevronRight, Plus, Users, LogOut } from 'lucide-react';
import LogoutModal from './logoutmodal.jsx';
import '../css/adminsidebar.css';

function AdminSidebar({ user }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(true);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsLogoutModalOpen(false);
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
                <img src={user.avatar} alt={user?.name || 'Admin'} className='admin-avatar-img' />
              ) : (
                <div className='admin-avatar-fallback'>
                  <User size={32} />
                </div>
              )}
            </div>
            <p className='admin-contact-item'>
              <User size={14} /> {user?.name || user?.fullName || 'Administrator'}
            </p>
            <p className='admin-contact-item'>
              <Mail size={14} /> {user?.email || 'admin@organization.org'}
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
                  <Calendar size={16} />
                  <span>Events Management</span>
                </div>
                <span className={`admin-menu-arrow ${eventsOpen ? 'rotated' : ''}`}>
                  <ChevronRight size={16} />
                </span>
              </button>

              <div className={`admin-submenu-wrapper ${eventsOpen ? 'open' : ''}`}>
                <div className='admin-submenu-inner'>
                  <NavLink to='/admin/events/create' className='admin-submenu-item'>
                    <Plus size={14} />
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
                <Users size={16} />
                <span>Volunteers</span>
              </div>
              <span className='admin-menu-arrow'>
                <ChevronRight size={16} />
              </span>
            </NavLink>
          </nav>
        </div>

        <button
          type='button'
          className='admin-menu-item logout'
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <div className='admin-menu-left'>
            <LogOut size={16} />
            <span>Log Out</span>
          </div>
        </button>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </aside>
  );
}

export default AdminSidebar;
