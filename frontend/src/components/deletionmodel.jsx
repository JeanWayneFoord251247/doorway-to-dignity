import React from 'react';
import '../css/modal.css';

function DeleteModal({ isOpen, eventTitle, onConfirm, onCancel, isDeleting = false }) {
  if (!isOpen) return null;

  return (
    <div className='modal-backdrop' onClick={onCancel}>
      <div className='modal-card' onClick={(e) => e.stopPropagation()}>
        <div className='modal-icon-badge danger'>
          <i className='fi fi-sr-trash'></i>
        </div>

        <h3 className='modal-title'>Delete Event</h3>
        <p className='modal-description'>
          Are you sure you want to delete <strong className='modal-highlight'>{eventTitle}</strong>?
          This action cannot be undone and will remove all volunteer roster entries.
        </p>

        <div className='modal-actions'>
          <button
            type='button'
            className='btn-modal-cancel'
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type='button'
            className='btn-modal-delete'
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
