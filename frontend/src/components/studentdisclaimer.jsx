import React, { useState, useEffect } from 'react';
import '../css/studentdisclaimermodal.css';

function StudentDisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasAcknowledged = localStorage.getItem('student_disclaimer_accepted');
    if (!hasAcknowledged) {
      setIsOpen(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem('student_disclaimer_accepted', 'true');

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'select_content', {
        content_type: 'disclaimer',
        item_id: 'student_academic_notice',
      });
    }

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className='student-disclaimer-overlay'>
      <div className='student-disclaimer-card' role='dialog' aria-modal='true'>
        <div className='student-disclaimer-icon-wrapper'>
          <i className='fi fi-sr-shield-check'></i>
        </div>

        <span className='student-disclaimer-badge'>Student Project Notice</span>
        <h2 className='student-disclaimer-title'>Academic Prototype & Privacy</h2>

        <div className='student-disclaimer-content'>
          <p>
            Welcome to <strong>Doorway To Dignity</strong>. This platform is built and hosted as a
            student-developed interactive prototype.
          </p>
          <p>
            All information and data provided on this site are treated with strict confidentiality,
            kept private, and stored safely in an isolated, secure database.
          </p>
        </div>

        <button type='button' className='btn-student-disclaimer-ack' onClick={handleAcknowledge}>
          I Understand & Agree
        </button>
      </div>
    </div>
  );
}

export default StudentDisclaimerModal;
