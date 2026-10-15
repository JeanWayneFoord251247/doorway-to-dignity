import React, { useState, useEffect } from 'react';
import '../css/cookiebanner.css';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (!savedConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'granted');

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }

    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'denied');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className='cookie-banner-wrapper' role='region' aria-label='Cookie consent banner'>
      <div className='cookie-banner-content'>
        <div className='cookie-banner-text'>
          <p className='cookie-banner-title'>We value your privacy</p>
          <p className='cookie-banner-desc'>
            We use analytics cookies to understand how you interact with our website and improve
            your experience. You can choose whether to enable these cookies.
          </p>
        </div>
        <div className='cookie-banner-actions'>
          <button type='button' onClick={handleDecline} className='btn-cookie-decline'>
            Decline
          </button>
          <button type='button' onClick={handleAccept} className='btn-cookie-accept'>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
