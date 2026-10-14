import React from 'react';
import '../css/modal.css';

function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className='logout-modal-overlay' onClick={onCancel}>
      <div className='logout-modal-card' onClick={(e) => e.stopPropagation()}>
        <div className='logout-modal-icon'>
          <i className='fi fi-sr-sign-out-alt'></i>
        </div>

        <h2 className='logout-modal-title'>Log Out</h2>
        <p className='logout-modal-message'>
          Are you sure you want to log out of your account?
        </p>

        <div className='logout-modal-actions'>
          <button type='button' className='btn-logout-cancel' onClick={onCancel}>
            Cancel
          </button>
          <button type='button' className='btn-logout-confirm' onClick={onConfirm}>
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;