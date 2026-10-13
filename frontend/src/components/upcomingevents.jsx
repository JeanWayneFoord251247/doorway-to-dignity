import React from 'react';

function UpcomingEvents({ events = [], loading = false, currentUser, onLeave }) {
  const currentUserId = currentUser?._id || currentUser?.id;
  const currentUserEmail = currentUser?.email;

  const getAssignedRole = (event) => {
    if (!event.volunteersList || !Array.isArray(event.volunteersList)) {
      return event.selectedRole || 'Volunteer';
    }

    const rosterEntry = event.volunteersList.find((v) => {
      const rosterId = v.userId?._id || v.userId;
      const matchesId = currentUserId && String(rosterId) === String(currentUserId);
      const matchesEmail = currentUserEmail && v.email?.toLowerCase() === currentUserEmail.toLowerCase();
      return matchesId || matchesEmail;
    });

    return rosterEntry?.role || event.selectedRole || 'Volunteer';
  };

  return (
    <section className="upcoming-events-card">
      <h2 className="dashboard-section-title">Your Upcoming Events</h2>

      {loading ? (
        <p className="upcoming-status-text">Loading your events...</p>
      ) : events.length === 0 ? (
        <div className="upcoming-empty-state">
          <p>No upcoming events yet.</p>
          <span>Sign up for an event below to add it to your schedule!</span>
        </div>
      ) : (
        <div className="upcoming-events-list">
          {events.map((event) => (
            <div key={event._id || event.id} className="upcoming-event-item">
              <div className="event-icon-badge">
                <i className="fi fi-sr-calendar"></i>
              </div>

              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-meta">
                  <span>{event.date}</span>
                  {event.time && <span>{event.time}</span>}
                </p>
                <p className="event-role">{getAssignedRole(event)}</p>
              </div>

              <div className="event-actions-group">
                {onLeave && (
                  <button
                    type="button"
                    className="btn-event-leave"
                    onClick={() => onLeave(event._id || event.id)}
                    title="Withdraw from this event"
                  >
                    Leave
                  </button>
                )}
                <button type="button" className="btn-event-view">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default UpcomingEvents;