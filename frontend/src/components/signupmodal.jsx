import React from 'react';
import '../css/modal.css';

function SignUpModal({
  isOpen,
  event,
  selectedRole,
  onConfirm,
  onCancel,
  isSubmitting = false,
  isSuccess = false,
  onCloseSuccess,
}) {
  if (!isOpen || !event) return null;

  return (
    <div className='modal-backdrop' onClick={isSuccess ? onCloseSuccess : onCancel}>
      <div className='modal-card' onClick={(e) => e.stopPropagation()}>
        {isSuccess ? (
          <>
            <div className='modal-icon-badge success'>
              <i className='fi fi-sr-check'></i>
            </div>

            <h3 className='modal-title'>Registered Successfully!</h3>
            <p className='modal-description'>
              You are signed up as <strong className='modal-highlight'>{selectedRole}</strong> for{' '}
              <strong className='modal-highlight'>{event.title}</strong>. This initiative has been
              added to your schedule.
            </p>

            <div className='modal-actions'>
              <button type='button' className='btn-modal-primary' onClick={onCloseSuccess}>
                Done
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='modal-icon-badge info'>
              <i className='fi fi-sr-user-add'></i>
            </div>

            <h3 className='modal-title'>Confirm Registration</h3>
            <p className='modal-description'>
              Sign up for <strong className='modal-highlight'>{event.title}</strong> as{' '}
              <strong className='modal-highlight'>{selectedRole}</strong>?
            </p>

            <div className='modal-meta-box'>
              <p className='modal-meta-line'>
                <span>Date:</span> {event.date}
              </p>
              {event.time && (
                <p className='modal-meta-line'>
                  <span>Time:</span> {event.time}
                </p>
              )}
              <p className='modal-meta-line'>
                <span>Location:</span> {event.location}
              </p>
            </div>

            <div className='modal-actions'>
              <button
                type='button'
                className='btn-modal-cancel'
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn-modal-primary'
                onClick={onConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Confirm Sign Up'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUpModal;
