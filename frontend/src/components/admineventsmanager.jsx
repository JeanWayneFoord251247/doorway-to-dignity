import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Edit, Trash2, Plus } from 'lucide-react';
import DeleteModal from './DeleteModal.jsx';
import { useAdminEvents } from '../hooks/useadminevents.jsx';
import '../css/admineventsmanager.css';

const DEFAULT_IMAGE = './assets/img/placeholder.png';

function AdminEventsManager() {
  const navigate = useNavigate();
  const {
    events,
    selectedEvent,
    setSelectedEventId,
    loading,
    isDeleteOpen,
    setIsDeleteOpen,
    isDeleting,
    deleteSelectedEvent,
  } = useAdminEvents();

  return (
    <section className='admin-events-section'>
      <div className='admin-events-viewer'>
        <h2 className='admin-card-title'>Upcoming Events</h2>

        {loading ? (
          <p className='loading-state'>Loading events...</p>
        ) : events.length === 0 ? (
          <div className='empty-state'>
            <p>No events found.</p>
            <button
              type='button'
              className='btn-primary'
              onClick={() => navigate('/admin/events/create')}
            >
              <Plus size={16} /> Create New Event
            </button>
          </div>
        ) : (
          <div className='admin-events-grid'>
            <aside className='events-list'>
              {events.map((event) => {
                const isSelected = selectedEvent?._id === event._id;
                const volunteerCount = event.volunteersList?.length || 0;

                return (
                  <div
                    key={event._id}
                    className={`event-card ${isSelected ? 'active' : ''}`}
                    onClick={() => setSelectedEventId(event._id)}
                  >
                    <img
                      src={event.image || DEFAULT_IMAGE}
                      alt={event.title}
                      className='card-thumb'
                    />
                    <div className='card-details'>
                      <h4>{event.title}</h4>
                      <p>{event.location}</p>
                      <p>
                        {event.date} {event.time ? `• ${event.time}` : ''}
                      </p>
                      <p>
                        Volunteers - {volunteerCount}/{event.volunteersMax || 20}
                      </p>
                      <button
                        type='button'
                        className='btn-link'
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/events/edit/${event._id}`);
                        }}
                      >
                        <Edit size={12} /> Edit
                      </button>
                    </div>
                  </div>
                );
              })}
            </aside>

            {selectedEvent && (
              <main className='event-detail'>
                <div className='detail-body'>
                  <h3>{selectedEvent.title}</h3>
                  <p className='description'>{selectedEvent.description}</p>

                  <div className='quick-info'>
                    <span>
                      <Calendar size={14} /> {selectedEvent.date}
                    </span>
                    <span>
                      <Clock size={14} /> {selectedEvent.time}
                    </span>
                    <span>
                      <MapPin size={14} /> {selectedEvent.location}
                    </span>
                  </div>

                  <div className='meta-grid'>
                    <div className='meta-group'>
                      <label>Roles</label>
                      <div className='meta-pill pill-wide'>
                        {selectedEvent.rolesNeeded?.length > 0
                          ? selectedEvent.rolesNeeded.join(', ')
                          : selectedEvent.selectedRole || 'General Volunteer'}
                      </div>
                    </div>

                    <div className='meta-group'>
                      <label>Volunteers</label>
                      <div className='meta-pill'>
                        {selectedEvent.volunteersList?.length || 0}/
                        {selectedEvent.volunteersMax || 20}
                      </div>
                    </div>

                    <div className='meta-group'>
                      <label>Location</label>
                      <div className='meta-pill pill-wide'>{selectedEvent.location}</div>
                    </div>
                  </div>

                  <div className='roster-section'>
                    <div className='roster-scroll-wrapper'>
                      <table className='roster-table'>
                        <thead>
                          <tr>
                            <th>Role</th>
                            <th>Volunteer Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedEvent.volunteersList?.length > 0 ? (
                            selectedEvent.volunteersList.map((vol, idx) => (
                              <tr key={idx}>
                                <td>{vol.role}</td>
                                <td>{vol.name}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan='2' className='empty-roster'>
                                No volunteers signed up yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className='detail-media'>
                  <img
                    src={selectedEvent.image || DEFAULT_IMAGE}
                    alt={selectedEvent.title}
                    className='detail-large-img'
                  />
                  <div className='action-buttons'>
                    <button
                      type='button'
                      className='btn-primary'
                      onClick={() => navigate(`/admin/events/edit/${selectedEvent._id}`)}
                    >
                      <Edit size={16} /> Edit Event
                    </button>
                    <button
                      type='button'
                      className='btn-danger'
                      onClick={() => setIsDeleteOpen(true)}
                    >
                      <Trash2 size={16} /> Delete Event
                    </button>
                  </div>
                </div>
              </main>
            )}
          </div>
        )}

        <DeleteModal
          isOpen={isDeleteOpen}
          eventTitle={selectedEvent?.title || 'this event'}
          onConfirm={deleteSelectedEvent}
          onCancel={() => setIsDeleteOpen(false)}
          isDeleting={isDeleting}
        />
      </div>
    </section>
  );
}

export default AdminEventsManager;
