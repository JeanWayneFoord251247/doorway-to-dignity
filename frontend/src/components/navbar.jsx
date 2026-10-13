import React, { useState } from 'react';
import '../css/navbar.css';
import logo from '../assets/img/Icon.png';
import { NavLink, Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  const dashboardRoute = userRole === 'admin' ? '/admin' : '/volunteer';

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className='navbar-header'>
      <div className='navbar-container'>
        <NavLink to='/' className='navbar-brand-group' onClick={closeMenu}>
          <img src={logo} alt='Logo' className='navbar-logo' />
          <span className='navbar-brand'>Doorway To Dignity</span>
        </NavLink>

        <div className='navbar-right'>
          {!isAuthenticated ? (
            <NavLink
              to='/'
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          ) : (
            <NavLink
              to={dashboardRoute}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Dashboard
            </NavLink>
          )}

          <NavLink
            to='/faq'
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            FAQ
          </NavLink>
          <NavLink
            to={isAuthenticated ? '/account' : '/signup'}
            className={({ isActive }) => `nav-icon-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
            aria-label={isAuthenticated ? 'Account' : 'Sign Up'}
          >
            <i className='fi fi-sr-user'></i>
          </NavLink>
        </div>

        <button
          className='navbar-toggle-btn'
          onClick={() => setIsOpen(!isOpen)}
          aria-label='Toggle navigation'
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`navbar-mobile-drawer ${isOpen ? 'open' : ''}`}>
        {!isAuthenticated ? (
          <NavLink
            to='/'
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        ) : (
          <NavLink
            to={dashboardRoute}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
        )}

        <NavLink
          to='/faq'
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={closeMenu}
        >
          FAQ
        </NavLink>

        <NavLink
          to={isAuthenticated ? '/account' : '/signup'}
          className={({ isActive }) => `nav-icon-link ${isActive ? 'active' : ''}`}
          onClick={closeMenu}
          aria-label={isAuthenticated ? 'Account' : 'Sign Up'}
        >
          <i className='fi fi-sr-user'></i>
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
