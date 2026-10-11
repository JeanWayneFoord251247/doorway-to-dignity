import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminSidebar() {
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isAdminToolsOpen, setIsAdminToolsOpen] = useState(false);

  return (
    <aside className="admin-profile-card">
      <h2 className="admin-card-inner-title">Admin</h2>

      <div className="admin-profile-header">
        <div className="admin-avatar-container">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt="Admin Profile"
            className="admin-avatar-img"
          />
        </div>
        <p className="admin-contact-item">
          <i className="fi fi-sr-envelope"></i> trevorbaxton@gmail.com
        </p>
        <p className="admin-contact-item">
          <i className="fi fi-sr-phone-call"></i> 073 482 2068
        </p>
      </div>

      <nav className="admin-menu-list">
        <div className="admin-menu-group">
          <button
            type="button"
            className={`admin-menu-item ${isEventsOpen ? 'active' : ''}`}
            onClick={() => setIsEventsOpen(!isEventsOpen)}
          >
            <span className="admin-menu-left">
              <i className="fi fi-sr-calendar"></i> Events
            </span>
            <span className={`admin-menu-arrow ${isEventsOpen ? 'rotated' : ''}`}>
              ›
            </span>
          </button>

          <div className={`admin-submenu-wrapper ${isEventsOpen ? 'open' : ''}`}>
            <div className="admin-submenu-inner">
              <Link to="/admin/create-event" className="admin-submenu-item">
                <i className="fi fi-sr-plus-small"></i> Create Event
              </Link>
              <Link to="/admin/edit-event" className="admin-submenu-item">
                <i className="fi fi-sr-pencil"></i> Edit Event
              </Link>
            </div>
          </div>
        </div>

        <div className="admin-menu-group">
          <button
            type="button"
            className={`admin-menu-item ${isAdminToolsOpen ? 'active' : ''}`}
            onClick={() => setIsAdminToolsOpen(!isAdminToolsOpen)}
          >
            <span className="admin-menu-left">
              <i className="fi fi-sr-settings"></i> Admin Tools
            </span>
            <span className={`admin-menu-arrow ${isAdminToolsOpen ? 'rotated' : ''}`}>
              ›
            </span>
          </button>

          <div className={`admin-submenu-wrapper ${isAdminToolsOpen ? 'open' : ''}`}>
            <div className="admin-submenu-inner">
              <Link to="/admin/manage-volunteers" className="admin-submenu-item">
                <i className="fi fi-sr-users"></i> Manage Volunteers
              </Link>
            </div>
          </div>
        </div>

        <button type="button" className="admin-menu-item">
          <span className="admin-menu-left">
            <i className="fi fi-sr-comment"></i> Messenger
          </span>
          <span className="admin-menu-arrow">›</span>
        </button>

        <button type="button" className="admin-menu-item logout">
          <span className="admin-menu-left">
            <i className="fi fi-sr-exit"></i> Logout
          </span>
        </button>
      </nav>
    </aside>
  );
}

export default AdminSidebar;