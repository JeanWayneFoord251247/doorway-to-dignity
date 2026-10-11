import React, { useState } from 'react';

const mockAdminEvents = [
  {
    id: 1,
    title: 'Jars of Hope',
    description:
      'Pack and prepare Jars of Hope filled with essential ingredients for families in need. This hands-on volunteer opportunity helps provide meals while bringing communities together through acts of compassion and service.',
    date: '31 August 2026',
    time: '10am - 5pm',
    location: 'Randburg',
    selectedRole: 'Designating Food',
    volunteersCurrent: 4,
    volunteersMax: 12,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    volunteersList: [
      { role: 'Food Designator', name: 'Kelly Miller' },
      { role: 'Inventory manager', name: 'George Nile' },
    ],
  },
  {
    id: 2,
    title: 'Shelter Bags',
    description:
      'Help assemble durable, weather-resistant shelter sleeping bags for vulnerable individuals. Join our team in making a direct, practical difference for those living without adequate shelter.',
    date: '13 September 2026',
    time: '10am - 5pm',
    location: 'Randburg',
    selectedRole: 'Assembly',
    volunteersCurrent: 2,
    volunteersMax: 18,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    volunteersList: [
      { role: 'Material Cutter', name: 'Sarah Jenkins' },
      { role: 'Quality Check', name: 'David Molefe' },
    ],
  },
  {
    id: 3,
    title: 'Pots Of Hope',
    description:
      'Cook nutritious, warm community meals in large cast-iron pots. A heartwarming day of cooking, serving, and sharing conversations with community members in need.',
    date: '27 September 2026',
    time: '10am - 5pm',
    location: 'Randburg',
    selectedRole: 'Cook',
    volunteersCurrent: 1,
    volunteersMax: 12,
    image: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=800&q=80',
    volunteersList: [
      { role: 'Head Cook', name: 'Amanda Sithole' },
    ],
  },
];

function AdminEventsManager() {
  const [selectedEvent, setSelectedEvent] = useState(mockAdminEvents[0]);

  return (
    <section className="admin-events-section">
      <div className="admin-events-viewer">
        <h2 className="admin-card-inner-title dark">Upcoming Events</h2>

        <div className="admin-viewer-body">
          <div className="admin-events-list">
            {mockAdminEvents.map((event) => {
              const isSelected = selectedEvent.id === event.id;
              return (
                <div
                  key={event.id}
                  className={`admin-list-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="list-card-thumb"
                  />
                  <div className="list-card-info">
                    <h4 className="list-card-title">{event.title}</h4>
                    <p className="list-card-sub">{event.location}</p>
                    <p className="list-card-sub">
                      {event.date} - {event.time}
                    </p>
                    <p className="list-card-sub">
                      Volunteers - {event.volunteersCurrent}/{event.volunteersMax}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="admin-detail-pane">
            <div className="admin-detail-content">
              <h3 className="detail-main-title">{selectedEvent.title}</h3>
              <p className="detail-description">{selectedEvent.description}</p>

              <div className="admin-event-quick-info">
                <p>
                  <i className="fi fi-sr-calendar"></i> {selectedEvent.date}
                </p>
                <p>
                  <i className="fi fi-sr-clock"></i> {selectedEvent.time}
                </p>
                <p>
                  <i className="fi fi-sr-marker"></i> {selectedEvent.location}
                </p>
              </div>

              <div className="detail-meta-row">
                <div className="meta-badge-group">
                  <span className="meta-label">Selected Role</span>
                  <div className="meta-pill pill-wide">
                    {selectedEvent.selectedRole}
                  </div>
                </div>

                <div className="meta-badge-group">
                  <span className="meta-label">Volunteers</span>
                  <div className="meta-pill">
                    {selectedEvent.volunteersCurrent}/{selectedEvent.volunteersMax}
                  </div>
                </div>

                <div className="meta-badge-group">
                  <span className="meta-label">Location</span>
                  <div className="meta-pill pill-wide">
                    {selectedEvent.location}
                  </div>
                </div>
              </div>

              <div className="admin-roster-table">
                <div className="roster-header">
                  <span>Role</span>
                  <span>Volunteer Name</span>
                </div>
                <div className="roster-body">
                  {selectedEvent.volunteersList.map((vol, idx) => (
                    <div key={idx} className="roster-row">
                      <span className="roster-cell">{vol.role}</span>
                      <span className="roster-cell">{vol.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="admin-detail-side">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="detail-large-img"
              />
              <button type="button" className="btn-admin-edit">
                Edit Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminEventsManager;