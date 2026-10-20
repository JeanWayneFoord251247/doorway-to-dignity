import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export function useAdminEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/events`);
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data);

      if (data.length > 0) {
        setSelectedEventId((prev) => 
          data.some((e) => e._id === prev) ? prev : data[0]._id
        );
      } else {
        setSelectedEventId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const selectedEvent = events.find((e) => e._id === selectedEventId) || events[0] || null;

  const deleteSelectedEvent = async () => {
    if (!selectedEvent) return;

    setIsDeleting(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE}/api/events/${selectedEvent._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete event');
      }

      setIsDeleteOpen(false);
      await fetchEvents();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    events,
    selectedEvent,
    selectedEventId,
    setSelectedEventId,
    loading,
    isDeleteOpen,
    setIsDeleteOpen,
    isDeleting,
    deleteSelectedEvent,
  };
}