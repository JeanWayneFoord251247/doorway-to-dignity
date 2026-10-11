import React from 'react';

const mockUpcomingEvents = [
  {
    id: 1,
    title: 'Shelter Bags',
    date: '28/08/2026 ',
    time: '10:00 - 17:00',
    role: 'Distributing food',
  },
  {
    id: 2,
    title: 'Jars of Hope',
    date: '31/08/2026 ',
    time: '09:00 - 13:00',
    role: 'Packing dry ingredients',
  },
  {
    id: 3,
    title: 'Pots of Hope',
    date: '12/09/2026 ',
    time: '10:00 - 14:00',
    role: 'Community soup kitchen',
  },
];

function UpcomingEvents() {
  return (
    <section className='upcoming-events-card'>
      <h2 className='dashboard-section-title'>Your Upcoming Events</h2>
      <div className='upcoming-events-list'>
        {mockUpcomingEvents.map((event) => (
          <div key={event.id} className='upcoming-event-item'>
            <div className='event-icon-badge'>
              <i className='fi fi-sr-calendar'></i>
            </div>

            <div className='event-details'>
              <h3 className='event-title'>{event.title}</h3>
              <p className='event-meta'>
                <span>{event.date}</span>
                <span>{event.time}</span>
              </p>
              <p className='event-role'>{event.role}</p>
            </div>

            <button type='button' className='btn-event-view'>
              View
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingEvents;
