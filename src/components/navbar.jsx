import React, { useState } from 'react';
import '../css/navbar.css';
import logo from '../assets/img/Icon.png';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <NavLink
          to="/"
          className="navbar-brand-group"
          onClick={() => handleNavClick('home')}
        >
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="navbar-brand">Doorway To Dignity</span>
        </NavLink>

        <div className="navbar-right">
          <NavLink
            to="/"
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </NavLink>

          <NavLink
            to="/faq"
            className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => handleNavClick('faq')}
          >
            FAQ
          </NavLink>

          <NavLink
            to="/profile"
            className={`nav-icon-link ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavClick('profile')}
            aria-label="Profile"
          >
            <i className="fi fi-sr-user"></i>
          </NavLink>
        </div>

        <button
          className="navbar-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`navbar-mobile-drawer ${isOpen ? 'open' : ''}`}>
        <NavLink
          to="/"
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          Home
        </NavLink>

        <NavLink
          to="/faq"
          className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => handleNavClick('faq')}
        >
          FAQ
        </NavLink>

        <NavLink
          to="/profile"
          className={`nav-icon-link ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleNavClick('profile')}
          aria-label="Profile"
        >
          <i className="fi fi-sr-user"></i>
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;