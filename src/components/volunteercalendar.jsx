import React, { useState } from 'react';

function VolunteerCalendar() {
  const [currentMonth, setCurrentMonth] = useState('August');
  const [currentYear, setCurrentYear] = useState(2026);

  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const calendarDays = [
    { day: 25, isMuted: true },
    { day: 26, isMuted: true },
    { day: 27, isMuted: true },
    { day: 28, isMuted: true },
    { day: 29, isMuted: true },
    { day: 30, isMuted: true },
    { day: null }, 

    { day: 2 },
    { day: 3 },
    { day: 4 },
    { day: 5, status: 'passed-event' },
    { day: 6 },
    { day: 7 },
    { day: 8 },

    { day: 9 },
    { day: 10, status: 'passed-event' },
    { day: 11 },
    { day: 12 },
    { day: 13 },
    { day: 14 },
    { day: 15 },

    { day: 16 },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20, status: 'current-day' },
    { day: 21, status: 'full-event' },
    { day: 22 },

    { day: 23, status: 'full-event' },
    { day: 24 },
    { day: 25 },
    { day: 26, status: 'your-event' },
    { day: 27 },
    { day: 28 },
    { day: 29, status: 'your-event' },

    { day: 30 },
    { day: 31, status: 'your-event' },
    { day: 1, isMuted: true },
    { day: 2, isMuted: true },
    { day: 3, isMuted: true },
    { day: 4, isMuted: true },
    { day: 5, isMuted: true },
  ];

  return (
    <div className="calendar-section-wrapper">
      

      <div className="calendar-card-body">
        
        <div className="calendar-main-grid">
            <h2 className="dashboard-section-title">Your Calendar</h2>
          <div className="calendar-week-header">
            {weekdays.map((day, idx) => (
              <span key={idx} className="calendar-weekday-col">
                {day}
              </span>
            ))}
          </div>

          <div className="calendar-dates-table">
            {calendarDays.map((item, index) => (
              <div key={index} className="calendar-cell">
                {item.day !== null && (
                  <span
                    className={`calendar-date-number ${
                      item.isMuted ? 'muted' : ''
                    } ${item.status || ''}`}
                  >
                    {item.day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <aside className="calendar-legend-side">
          <div className="calendar-nav-header">
            <button type="button" className="cal-nav-arrow" aria-label="Previous month">
              ‹
            </button>
            <div className="cal-month-display">
              <span className="cal-month-name">{currentMonth}</span>
              <span className="cal-year-name">{currentYear}</span>
            </div>
            <button type="button" className="cal-nav-arrow" aria-label="Next month">
              ›
            </button>
          </div>

          <ul className="calendar-legend-list">
            <li className="legend-item">
              <span className="legend-circle current-day-circle" />
              <span>Current Day</span>
            </li>
            <li className="legend-item">
              <span className="legend-circle your-event-circle" />
              <span>Your Events</span>
            </li>
            <li className="legend-item">
              <span className="legend-circle full-event-circle" />
              <span>Full Events</span>
            </li>
            <li className="legend-item">
              <span className="legend-circle needed-circle" />
              <span>Volunteers still needed</span>
            </li>
            <li className="legend-item">
              <span className="legend-circle passed-circle" />
              <span>Passed Events</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default VolunteerCalendar;