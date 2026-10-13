import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/availableevents.css';

function AvailableEvents({ events = [], loading = false, onSignUp }) {
  const navigate = useNavigate();
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    if (events.length > 0) {
      const stillExists = events.find((e) => (e._id || e.id) === selectedEventId);
      if (!stillExists) {
        setSelectedEventId(events[0]._id || events[0].id);
      }
    } else {
      setSelectedEventId(null);
    }
  }, [events, selectedEventId]);

  const activeEvent = events.find((e) => (e._id || e.id) === selectedEventId) || events[0] || null;

  useEffect(() => {
    if (activeEvent?.rolesNeeded && activeEvent.rolesNeeded.length > 0) {
      setSelectedRole(activeEvent.rolesNeeded[0]);
    } else {
      setSelectedRole('General Volunteer');
    }
  }, [selectedEventId, activeEvent]);

  const handleSignUpClick = async () => {
    if (!activeEvent || !onSignUp) return;
    setIsSubmitting(true);
    await onSignUp(activeEvent._id || activeEvent.id, selectedRole);
    setIsSubmitting(false);
  };

  const handleEditClick = (eventId, e) => {
    if (e) e.stopPropagation();
    navigate(`/admin/events/edit/${eventId}`);
  };

  return (
    <section className='available-events-section'>
      <div className='available-events-viewer'>
        <h2 className='dashboard-section-title'>Available Events</h2>

        {loading ? (
          <p className='available-status-text'>Loading available events...</p>
        ) : events.length === 0 ? (
          <div className='available-empty-state'>
            <p className='available-empty-text'>No available events right now.</p>
            <span className='available-empty-sub'>
              Check back soon for new opportunities to get involved!
            </span>
          </div>
        ) : (
          <div className='available-viewer-body'>
            <div className='available-events-list'>
              {events.map((event) => {
                const eventKey = event._id || event.id;
                const isSelected = activeEvent && (activeEvent._id || activeEvent.id) === eventKey;

                return (
                  <div
                    key={eventKey}
                    className={`available-list-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedEventId(eventKey)}
                  >
                    <img
                      src={
                        event.image ||
                        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={event.title}
                      className='list-card-thumb'
                    />
                    <div className='list-card-info'>
                      <h4 className='list-card-title'>{event.title}</h4>
                      <p className='list-card-sub'>{event.location}</p>
                      <p className='list-card-sub'>
                        {event.date} {event.time ? `• ${event.time}` : ''}
                      </p>
                      <p className='list-card-sub'>
                        Volunteers - {event.volunteersCurrent || 0}/{event.volunteersMax || 20}
                      </p>
                      {isAdmin && (
                        <button
                          type='button'
                          className='btn-card-inline-edit'
                          onClick={(e) => handleEditClick(eventKey, e)}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {activeEvent && (
              <div className='available-detail-pane'>
                <div className='detail-text-col'>
                  <h3 className='detail-main-title'>{activeEvent.title}</h3>
                  <p className='detail-description'>{activeEvent.description}</p>

                  {activeEvent.rolesNeeded && activeEvent.rolesNeeded.length > 0 && (
                    <div className='detail-role-selection'>
                      <label htmlFor='volunteer-role-select' className='role-dropdown-label'>
                        Choose your role:
                      </label>
                      <select
                        id='volunteer-role-select'
                        className='role-dropdown-select'
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        {activeEvent.rolesNeeded.map((roleName, idx) => (
                          <option key={idx} value={roleName}>
                            {roleName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className='detail-meta-footer'>
                    <div className='meta-badge-group'>
                      <span className='meta-label'>Volunteers</span>
                      <div className='meta-pill'>
                        {activeEvent.volunteersCurrent || 0}/{activeEvent.volunteersMax || 20}
                      </div>
                    </div>

                    <div className='meta-badge-group'>
                      <span className='meta-label'>Location</span>
                      <div className='meta-pill pill-wide'>{activeEvent.location}</div>
                    </div>

                    {isAdmin ? (
                      <button
                        type='button'
                        className='btn-detail-edit'
                        onClick={() => handleEditClick(activeEvent._id || activeEvent.id)}
                      >
                        Edit Event
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn-detail-signup'
                        onClick={handleSignUpClick}
                        disabled={
                          isSubmitting ||
                          (activeEvent.volunteersCurrent || 0) >= (activeEvent.volunteersMax || 20)
                        }
                      >
                        {isSubmitting
                          ? 'Signing Up...'
                          : (activeEvent.volunteersCurrent || 0) >=
                              (activeEvent.volunteersMax || 20)
                            ? 'Event Full'
                            : 'Sign Up'}
                      </button>
                    )}
                  </div>
                </div>

                <div className='detail-image-col'>
                  <img
                    src={
                      activeEvent.image ||
                      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={activeEvent.title}
                    className='detail-large-img'
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AvailableEvents;
