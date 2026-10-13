import React from 'react';
import '../css/modal.css';

function ViewEventModal({ isOpen, event, userRole, onClose, onLeave }) {
  if (!isOpen || !event) return null;

  return (
    <div className='modal-backdrop' onClick={onClose}>
      <div className='modal-card modal-card-wide' onClick={(e) => e.stopPropagation()}>
        <button
          type='button'
          className='modal-close-icon'
          onClick={onClose}
          aria-label='Close modal'
        >
          <i className='fi fi-sr-cross-small'></i>
        </button>

        <img
          src={
            event.image ||
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
          }
          alt={event.title}
          className='modal-banner-img'
        />

        <div className='modal-detail-content'>
          <h3 className='modal-title left-aligned'>{event.title}</h3>
          <p className='modal-description left-aligned'>{event.description}</p>

          <div className='modal-quick-meta'>
            <div className='meta-badge-group'>
              <span className='meta-label'>Date & Time</span>
              <div className='meta-pill pill-wide'>
                {event.date} {event.time ? `• ${event.time}` : ''}
              </div>
            </div>

            <div className='meta-badge-group'>
              <span className='meta-label'>Location</span>
              <div className='meta-pill pill-wide'>{event.location}</div>
            </div>

            <div className='meta-badge-group'>
              <span className='meta-label'>Your Role</span>
              <div className='meta-pill role-pill'>{userRole || 'Volunteer'}</div>
            </div>
          </div>
        </div>

        <div className='modal-actions'>
          {onLeave && (
            <button
              type='button'
              className='btn-modal-outline-danger'
              onClick={() => {
                onClose();
                onLeave(event);
              }}
            >
              Withdraw from Event
            </button>
          )}
          <button type='button' className='btn-modal-primary' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewEventModal;
