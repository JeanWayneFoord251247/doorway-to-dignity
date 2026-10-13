import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/admineventsmanager.css';

function AdminEventsManager() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data);
      if (data.length > 0) {
        setSelectedEventId((prev) => {
          const stillExists = data.some((e) => (e._id || e.id) === prev);
          return stillExists ? prev : data[0]._id || data[0].id;
        });
      } else {
        setSelectedEventId(null);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const selectedEvent =
    events.find((e) => (e._id || e.id) === selectedEventId) || events[0] || null;

  const handleEditClick = (eventId, e) => {
    if (e) e.stopPropagation();
    navigate(`/admin/events/edit/${eventId}`);
  };

  const handleDeleteClick = async () => {
    if (!selectedEvent) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${selectedEvent.title}"?`
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(
        `http://localhost:5000/api/events/${selectedEvent._id || selectedEvent.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete event');
      }

      fetchEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className='admin-events-section'>
      <div className='admin-events-viewer'>
        <h2 className='admin-card-inner-title dark'>Upcoming Events</h2>

        {loading ? (
          <p className='admin-loading-text'>Loading events...</p>
        ) : events.length === 0 ? (
          <div className='admin-empty-state'>
            <p>No events found.</p>
            <button
              type='button'
              className='btn-admin-edit'
              onClick={() => navigate('/admin/events/create')}
            >
              Create New Event
            </button>
          </div>
        ) : (
          <div className='admin-viewer-body'>
            <div className='admin-events-list'>
              {events.map((event) => {
                const eventKey = event._id || event.id;
                const isSelected =
                  selectedEvent && (selectedEvent._id || selectedEvent.id) === eventKey;
                return (
                  <div
                    key={eventKey}
                    className={`admin-list-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedEventId(eventKey)}
                  >
                    <img
                      src={
                        event.image ||
                        'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
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
                        Volunteers -{' '}
                        {event.volunteersCurrent ||
                          (event.volunteersList ? event.volunteersList.length : 0)}
                        /{event.volunteersMax || 20}
                      </p>
                      <button
                        type='button'
                        className='btn-card-inline-edit'
                        onClick={(e) => handleEditClick(eventKey, e)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedEvent && (
              <div className='admin-detail-pane'>
                <div className='admin-detail-content'>
                  <h3 className='detail-main-title'>{selectedEvent.title}</h3>
                  <p className='detail-description'>{selectedEvent.description}</p>

                  <div className='admin-event-quick-info'>
                    <p>
                      <i className='fi fi-sr-calendar'></i> {selectedEvent.date}
                    </p>
                    <p>
                      <i className='fi fi-sr-clock'></i> {selectedEvent.time}
                    </p>
                    <p>
                      <i className='fi fi-sr-marker'></i> {selectedEvent.location}
                    </p>
                  </div>

                  <div className='detail-meta-row'>
                    <div className='meta-badge-group'>
                      <span className='meta-label'>Roles</span>
                      <div className='meta-pill pill-wide'>
                        {selectedEvent.rolesNeeded && selectedEvent.rolesNeeded.length > 0
                          ? selectedEvent.rolesNeeded.join(', ')
                          : selectedEvent.selectedRole || 'General Volunteer'}
                      </div>
                    </div>

                    <div className='meta-badge-group'>
                      <span className='meta-label'>Volunteers</span>
                      <div className='meta-pill'>
                        {selectedEvent.volunteersCurrent ||
                          (selectedEvent.volunteersList ? selectedEvent.volunteersList.length : 0)}
                        /{selectedEvent.volunteersMax || 20}
                      </div>
                    </div>

                    <div className='meta-badge-group'>
                      <span className='meta-label'>Location</span>
                      <div className='meta-pill pill-wide'>{selectedEvent.location}</div>
                    </div>
                  </div>

                  <div className='admin-roster-table'>
                    <div className='roster-header'>
                      <span>Role</span>
                      <span>Volunteer Name</span>
                    </div>
                    <div className='roster-body'>
                      {selectedEvent.volunteersList && selectedEvent.volunteersList.length > 0 ? (
                        selectedEvent.volunteersList.map((vol, idx) => (
                          <div key={idx} className='roster-row'>
                            <span className='roster-cell'>{vol.role}</span>
                            <span className='roster-cell'>{vol.name}</span>
                          </div>
                        ))
                      ) : (
                        <div className='roster-row'>
                          <span className='roster-cell roster-empty-cell'>
                            No volunteers signed up yet.
                          </span>
                          <span className='roster-cell'></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='admin-detail-side'>
                  <img
                    src={
                      selectedEvent.image ||
                      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
                    }
                    alt={selectedEvent.title}
                    className='detail-large-img'
                  />
                  <div className='admin-detail-btn-group'>
                    <button
                      type='button'
                      className='btn-admin-edit'
                      onClick={() => handleEditClick(selectedEvent._id || selectedEvent.id)}
                    >
                      Edit Event
                    </button>
                    <button type='button' className='btn-admin-delete' onClick={handleDeleteClick}>
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminEventsManager;
