import React from 'react';
import '../css/modal.css';

function LeaveModal({
  isOpen,
  eventTitle,
  onConfirm,
  onCancel,
  isLeaving = false,
  isSuccess = false,
  onCloseSuccess,
}) {
  if (!isOpen) return null;

  return (
    <div className='modal-backdrop' onClick={isSuccess ? onCloseSuccess : onCancel}>
      <div className='modal-card' onClick={(e) => e.stopPropagation()}>
        {isSuccess ? (
          <>
            <div className='modal-icon-badge success'>
              <i className='fi fi-sr-check'></i>
            </div>

            <h3 className='modal-title'>Withdrawn Successfully</h3>
            <p className='modal-description'>
              You have been removed from <strong className='modal-highlight'>{eventTitle}</strong>.
              Your spot has been returned to the available events pool.
            </p>

            <div className='modal-actions'>
              <button type='button' className='btn-modal-primary' onClick={onCloseSuccess}>
                Done
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='modal-icon-badge warning'>
              <i className='fi fi-sr-exit'></i>
            </div>

            <h3 className='modal-title'>Withdraw from Event</h3>
            <p className='modal-description'>
              Are you sure you want to withdraw from{' '}
              <strong className='modal-highlight'>{eventTitle}</strong>? Your volunteer slot will be
              released back to the community.
            </p>

            <div className='modal-actions'>
              <button
                type='button'
                className='btn-modal-cancel'
                onClick={onCancel}
                disabled={isLeaving}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn-modal-warning'
                onClick={onConfirm}
                disabled={isLeaving}
              >
                {isLeaving ? 'Leaving...' : 'Yes, Withdraw'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LeaveModal;
