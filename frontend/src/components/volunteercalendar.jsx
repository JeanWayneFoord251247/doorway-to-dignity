import React, { useState, useEffect } from 'react';

function VolunteerCalendar({ events = [] }) {

  const [activeDate, setActiveDate] = useState(() => {
    return new Date(); 
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const currentYear = activeDate.getFullYear();
  const currentMonthIndex = activeDate.getMonth();
  const currentMonth = months[currentMonthIndex];

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserId = currentUser._id;
  const currentUserEmail = currentUser.email;
  const today = new Date();

  useEffect(() => {
    if (events.length > 0 && events[0].date) {
      const parts = events[0].date.split(' ');
      if (parts.length === 3) {
        const foundMonthIndex = months.findIndex(
          (m) => m.toLowerCase() === parts[1].toLowerCase()
        );
        const foundYear = parseInt(parts[2], 10);
        if (foundMonthIndex !== -1 && !isNaN(foundYear)) {
          setActiveDate(new Date(foundYear, foundMonthIndex, 1));
        }
      }
    }
  }, [events]);

  const handlePrevMonth = () => {
    setActiveDate(new Date(currentYear, currentMonthIndex - 1, 1));
  };

  const handleNextMonth = () => {
    setActiveDate(new Date(currentYear, currentMonthIndex + 1, 1));
  };

  const findEventsForDay = (year, monthIdx, dayNum) => {
    const targetMonthName = months[monthIdx].toLowerCase();

    return events.filter((evt) => {
      if (!evt.date) return false;
      const cleanDate = evt.date.trim().toLowerCase();

      const words = cleanDate.split(/\s+/);
      if (words.length >= 3) {
        const d = parseInt(words[0], 10);
        const m = words[1].toLowerCase();
        const y = parseInt(words[2], 10);
        if (d === dayNum && m === targetMonthName && y === year) {
          return true;
        }
      }

      if (cleanDate.includes('/')) {
        const slashParts = cleanDate.split('/');
        if (slashParts.length === 3) {
          const d = parseInt(slashParts[0], 10);
          const m = parseInt(slashParts[1], 10) - 1;
          let y = parseInt(slashParts[2], 10);
          if (y < 100) y += 2000;
          if (d === dayNum && m === monthIdx && y === year) {
            return true;
          }
        }
      }

      return false;
    });
  };

  const computeDayStatus = (year, monthIdx, dayNum) => {
    const cellDate = new Date(year, monthIdx, dayNum);

    if (
      cellDate.getDate() === today.getDate() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getFullYear() === today.getFullYear()
    ) {
      return 'current-day';
    }

    const matchedEvents = findEventsForDay(year, monthIdx, dayNum);
    if (!matchedEvents.length) return '';

    const isUserRegistered = matchedEvents.some((e) =>
      e.volunteersList?.some(
        (v) =>
          (v.userId && String(v.userId) === String(currentUserId)) ||
          (v.email && v.email === currentUserEmail)
      )
    );
    if (isUserRegistered) return 'your-event';

    const isPast =
      cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (isPast) return 'passed-event';

    const isFull = matchedEvents.every(
      (e) => (e.volunteersCurrent || 0) >= (e.volunteersMax || 1)
    );
    if (isFull) return 'full-event';

    return 'needed-event';
  };

  const buildCalendarGrid = () => {
    const days = [];

    const firstDay = new Date(currentYear, currentMonthIndex, 1).getDay();
    const mondayFirstOffset = firstDay === 0 ? 6 : firstDay - 1;

    const prevMonthDaysCount = new Date(currentYear, currentMonthIndex, 0).getDate();
    for (let i = mondayFirstOffset - 1; i >= 0; i--) {
      const prevDayNum = prevMonthDaysCount - i;
      const prevMonthIdx = currentMonthIndex - 1;
      const prevYear = prevMonthIdx < 0 ? currentYear - 1 : currentYear;
      const normalizedMonth = (prevMonthIdx + 12) % 12;

      days.push({
        day: prevDayNum,
        isMuted: true,
        status: computeDayStatus(prevYear, normalizedMonth, prevDayNum),
      });
    }

    const daysInCurrentMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      days.push({
        day: d,
        isMuted: false,
        status: computeDayStatus(currentYear, currentMonthIndex, d),
      });
    }

    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let nextDay = 1; nextDay <= remainingCells; nextDay++) {
      const nextMonthIdx = currentMonthIndex + 1;
      const nextYear = nextMonthIdx > 11 ? currentYear + 1 : currentYear;
      const normalizedMonth = nextMonthIdx % 12;

      days.push({
        day: nextDay,
        isMuted: true,
        status: computeDayStatus(nextYear, normalizedMonth, nextDay),
      });
    }

    return days;
  };

  const calendarDays = buildCalendarGrid();

  return (
    <div className='calendar-section-wrapper'>
      <div className='calendar-card-body'>
        <div className='calendar-main-grid'>
          <h2 className='dashboard-section-title'>Your Calendar</h2>
          <div className='calendar-week-header'>
            {weekdays.map((day, idx) => (
              <span key={idx} className='calendar-weekday-col'>
                {day}
              </span>
            ))}
          </div>

          <div className='calendar-dates-table'>
            {calendarDays.map((item, index) => (
              <div key={index} className='calendar-cell'>
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

        <aside className='calendar-legend-side'>
          <div className='calendar-nav-header'>
            <button
              type='button'
              className='cal-nav-arrow'
              onClick={handlePrevMonth}
              aria-label='Previous month'
            >
              ‹
            </button>
            <div className='cal-month-display'>
              <span className='cal-month-name'>{currentMonth}</span>
              <span className='cal-year-name'>{currentYear}</span>
            </div>
            <button
              type='button'
              className='cal-nav-arrow'
              onClick={handleNextMonth}
              aria-label='Next month'
            >
              ›
            </button>
          </div>

          <ul className='calendar-legend-list'>
            <li className='legend-item'>
              <span className='legend-circle current-day-circle' />
              <span>Current Day</span>
            </li>
            <li className='legend-item'>
              <span className='legend-circle your-event-circle' />
              <span>Your Events</span>
            </li>
            <li className='legend-item'>
              <span className='legend-circle full-event-circle' />
              <span>Full Events</span>
            </li>
            <li className='legend-item'>
              <span className='legend-circle needed-circle' />
              <span>Volunteers still needed</span>
            </li>
            <li className='legend-item'>
              <span className='legend-circle passed-circle' />
              <span>Passed Events</span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default VolunteerCalendar;
