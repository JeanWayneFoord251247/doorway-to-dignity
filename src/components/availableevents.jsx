import React, { useState } from 'react';

const availableEventsData = [
  {
    id: 1,
    title: 'Jars Of Hope',
    location: 'Randburg',
    date: '31/8/26',
    time: '10am to 5pm',
    volunteersCurrent: 8,
    volunteersMax: 12,
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    description:
      'Pack and prepare Jars of Hope filled with essential ingredients for families in need. This hands-on volunteer opportunity helps provide meals while bringing communities together through acts of compassion and service.',
  },
  {
    id: 2,
    title: 'Shelter Bags',
    location: 'Randburg',
    date: '13/9/26',
    time: '10am to 5pm',
    volunteersCurrent: 2,
    volunteersMax: 18,
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    description:
      'Help assemble durable, weather-resistant shelter sleeping bags for vulnerable individuals. Join our team in making a direct, practical difference for those living without adequate shelter.',
  },
  {
    id: 3,
    title: 'Pots Of Hope',
    location: 'Randburg',
    date: '27/9/26',
    time: '10am to 5pm',
    volunteersCurrent: 1,
    volunteersMax: 12,
    image:
      'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?auto=format&fit=crop&w=800&q=80',
    description:
      'Cook nutritious, warm community meals in large cast-iron pots. A heartwarming day of cooking, serving, and sharing conversations with community members in need.',
  },
];

function AvailableEvents() {
  const [selectedEvent, setSelectedEvent] = useState(availableEventsData[0]);

  return (
    <section className='available-events-section'>
      <div className='available-events-viewer'>
        <h2 className='dashboard-section-title'>Available Events</h2>
        <div className='available-viewer-body'>
          <div className='available-events-list'>
            {availableEventsData.map((event) => {
              const isSelected = selectedEvent.id === event.id;
              return (
                <div
                  key={event.id}
                  className={`available-list-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <img src={event.image} alt={event.title} className='list-card-thumb' />
                  <div className='list-card-info'>
                    <h4 className='list-card-title'>{event.title}</h4>
                    <p className='list-card-sub'>{event.location}</p>
                    <p className='list-card-sub'>
                      {event.date} - {event.time}
                    </p>
                    <p className='list-card-sub'>
                      Volunteers - {event.volunteersCurrent}/{event.volunteersMax}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='available-detail-pane'>
            <div className='detail-text-col'>
              <h3 className='detail-main-title'>{selectedEvent.title}</h3>
              <p className='detail-description'>{selectedEvent.description}</p>

              <div className='detail-meta-footer'>
                <div className='meta-badge-group'>
                  <span className='meta-label'>Volunteers</span>
                  <div className='meta-pill'>
                    {selectedEvent.volunteersCurrent}/{selectedEvent.volunteersMax}
                  </div>
                </div>

                <div className='meta-badge-group'>
                  <span className='meta-label'>Location</span>
                  <div className='meta-pill pill-wide'>{selectedEvent.location}</div>
                </div>

                <button type='button' className='btn-detail-signup'>
                  Sign Up
                </button>
              </div>
            </div>

            <div className='detail-image-col'>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className='detail-large-img'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AvailableEvents;
