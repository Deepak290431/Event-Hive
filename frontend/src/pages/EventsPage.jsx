import { useEffect, useMemo, useState } from "react";
import { api, useAuthorizedApi } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    capacity: 100,
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ show: false, type: null, eventId: null });
  const [successModal, setSuccessModal] = useState({ show: false, message: "", type: null });
  const { user } = useAuth();
  const authApi = useAuthorizedApi();

  const isOrganizer = useMemo(() => user?.role === "organizer" || user?.role === "admin", [user]);

  const halls = [
    {
      name: "Nehru Centre, Mumbai",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=60",
    },
    {
      name: "India Habitat Centre, Delhi",
      img: "https://images.unsplash.com/photo-1529429617124-aee7c3c6c7b7?auto=format&fit=crop&w=900&q=60",
    },
    {
      name: "Chowdiah Memorial Hall, Bengaluru",
      img: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=60",
    },
    {
      name: "Kala Academy, Goa",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=60",
    },
  ];

  useEffect(() => {
    setLoading(true);
    api.get("/events").then(({ data }) => {
      const now = new Date();
      const activeEvents = [];
      const finishedEventIds = [];

      // Separate active and finished events
      data.forEach((event) => {
        const endTime = new Date(event.endTime);
        if (endTime > now) {
          activeEvents.push(event);
        } else {
          finishedEventIds.push(event._id);
        }
      });

      // Delete finished events
      finishedEventIds.forEach((eventId) => {
        authApi.delete(`/events/${eventId}`).catch((err) => {
          console.error(`Failed to delete finished event ${eventId}:`, err);
        });
      });

      setEvents(activeEvents);
      setFilteredEvents(activeEvents);
    }).finally(() => setLoading(false));
  }, [authApi]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEvents(events);
      return;
    }
    const query = searchQuery.toLowerCase();
    setFilteredEvents(
      events.filter(
        (ev) =>
          ev.title?.toLowerCase().includes(query) ||
          ev.description?.toLowerCase().includes(query) ||
          ev.location?.toLowerCase().includes(query)
      )
    );
  }, [searchQuery, events]);

  const handleBook = (eventId) => {
    if (!user) return alert("Login to book");
    setConfirmModal({ show: true, type: "book", eventId });
  };

  const handleConfirmBook = async () => {
    try {
      await authApi.post("/bookings", { eventId: confirmModal.eventId });
      setConfirmModal({ show: false, type: null, eventId: null });
      setSuccessModal({ show: true, message: "Booking created! View QR in dashboard.", type: "tick" });
      setTimeout(() => setSuccessModal({ show: false, message: "", type: null }), 3000);
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Failed to create booking");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const now = new Date();
      const startDateTime = new Date(form.startTime);
      const endDateTime = new Date(form.endTime);

      // Validate start time is in the future
      if (startDateTime <= now) {
        alert("Start date and time must be in the future");
        return;
      }

      // Validate end time is after start time
      if (endDateTime <= startDateTime) {
        alert("End date and time must be after start date and time");
        return;
      }

      const payload = { ...form };
      payload.capacity = Number(payload.capacity) || 0;
      await authApi.post("/events", payload);
      const { data } = await api.get("/events");
      setEvents(data);
      setCreating(false);
      setForm({ title: "", description: "", location: "", startTime: "", endTime: "", capacity: 100 });
    } catch (error) {
      console.error("Create error:", error);
      alert(error.response?.data?.message || "Failed to create event");
    }
  };

  const handleDelete = (id) => {
    setConfirmModal({ show: true, type: "delete", eventId: id });
  };

  const handleConfirmDelete = async () => {
    try {
      await authApi.delete(`/events/${confirmModal.eventId}`);
      setEvents((prev) => prev.filter((e) => e._id !== confirmModal.eventId));
      setConfirmModal({ show: false, type: null, eventId: null });
      setSuccessModal({ show: true, message: "Event deleted successfully!", type: "delete" });
      setTimeout(() => setSuccessModal({ show: false, message: "", type: null }), 3000);
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete event. You may not have permission to delete this event.");
      setConfirmModal({ show: false, type: null, eventId: null });
    }
  };

  const handleEdit = (id) => {
    const event = events.find((e) => e._id === id);
    if (event) {
      setEditing(id);
      const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        // Use local time instead of UTC
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };
      setForm({
        title: event.title,
        description: event.description,
        location: event.location,
        startTime: formatDateTime(event.startTime),
        endTime: formatDateTime(event.endTime),
        capacity: event.capacity,
      });
    }
  };

  const handleSaveEdit = async () => {
    try {
      const now = new Date();
      const startDateTime = new Date(form.startTime);
      const endDateTime = new Date(form.endTime);

      // Validate start time is in the future
      if (startDateTime <= now) {
        alert("Start date and time must be in the future");
        return;
      }

      // Validate end time is after start time
      if (endDateTime <= startDateTime) {
        alert("End date and time must be after start date and time");
        return;
      }

      const payload = { ...form };
      payload.capacity = Number(payload.capacity) || 0;
      await authApi.put(`/events/${editing}`, payload);
      const { data } = await api.get("/events");
      setEvents(data);
      setEditing(null);
      setForm({ title: "", description: "", location: "", startTime: "", endTime: "", capacity: 100 });
      setSuccessModal({ show: true, message: "Event updated successfully!" });
      setTimeout(() => setSuccessModal({ show: false, message: "" }), 3000);
    } catch (error) {
      console.error("Edit error:", error);
      alert(error.response?.data?.message || "Failed to update event");
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setForm({ title: "", description: "", location: "", startTime: "", endTime: "", capacity: 100 });
  };

  if (loading) return <div className="loading"><p>Loading events...</p></div>;

  const getEventImage = (title) => {
    const images = [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80",
    ];
    return images[title?.length % images.length] || images[0];
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '2rem', animation: 'pageLoad 0.6s ease-out' }}>
      {/* Hero Section */}
      <div className="hero-section" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '3rem 1rem',
        textAlign: 'center'
      }}>
        <h1>Discover Amazing Events</h1>
        <p>Find and book tickets for events happening near you</p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="Search events, locations, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button">Search</button>
        </div>
      </div>

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div className="section-title" style={{ marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '600', 
            color: '#ffffff',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>All Events</h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            margin: '0'
          }}>
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} available
          </p>
        </div>
        {isOrganizer && (
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button onClick={() => setCreating((v) => !v)} style={{ 
              padding: '0.75rem 1.5rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              {creating ? "Cancel" : "+ Create Event"}
            </button>
          </div>
        )}

      {creating && (
        <article className="card" style={{ marginBottom: "2rem", padding: "2rem" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>Create New Event</h2>
          <form onSubmit={handleCreate} className="grid two">
            <div>
              <label>Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <label>Location</label>
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </div>
            <div>
              <label>Start</label>
              <input
                type="datetime-local"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                required
              />
            </div>
            <div>
              <label>End</label>
              <input
                type="datetime-local"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Capacity</label>
              <input
                type="number"
                min="1"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                required
              />
            </div>
            <div className="full">
              <label>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe your event... What makes it special?"
              />
            </div>
            <div className="full actions">
              <button type="submit">Publish</button>
            </div>
          </form>
        </article>
      )}

      <div className="grid events-grid" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem',
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        justifyContent: 'center'
      }}>
        {filteredEvents.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem" }}>
            <p style={{ fontSize: "1.1rem", color: "#9ca3af" }}>
              {searchQuery ? "No events found matching your search." : "No events available yet."}
            </p>
          </div>
        ) : (
          filteredEvents.map((ev) => (
            <article key={ev._id} className="card event-card">
              <img src={getEventImage(ev.title)} alt={ev.title} className="event-card-image" />
              <div className="event-card-content">
                <h3>{ev.title}</h3>
                <p>{ev.description || "Join us for an amazing experience!"}</p>
                <div className="event-meta">
                  <div className="event-meta-item">
                    <span>📍</span>
                    <span>{ev.location}</span>
                  </div>
                  <div className="event-meta-item">
                    <span>📅</span>
                    <span>{new Date(ev.startTime).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}</span>
                  </div>
                  <div className="event-meta-item">
                    <span>🕐</span>
                    <span>{new Date(ev.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  {ev.capacity && (
                    <div className="event-meta-item">
                      <span>👥</span>
                      <span>{ev.capacity} seats available</span>
                    </div>
                  )}
                </div>
                <div className="event-footer">
                  {isOrganizer ? (
                    <>
                      <button className="ghost" onClick={() => handleEdit(ev._id)}>
                        Edit
                      </button>
                      <button className="ghost" onClick={() => handleDelete(ev._id)}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleBook(ev._id)} className="animated-button" style={{ width: '100%', marginTop: '1rem' }}>
                      <span className="circle"></span>
                      <span className="text">Book Now</span>
                      <svg className="arr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                      <svg className="arr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
      </section>

      {editing && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h2 style={{ marginTop: 0, color: '#333' }}>Edit Event</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box', minHeight: '100px' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ marginBottom: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Start Time</label>
                <input
                  type="datetime-local"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>End Time</label>
                <input
                  type="datetime-local"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Capacity</label>
              <input
                type="number"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCancelEdit}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmModal.show && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h2 style={{ marginTop: 0, color: '#333', marginBottom: '1rem' }}>
              {confirmModal.type === 'delete' ? 'Delete Event?' : 'Confirm Booking?'}
            </h2>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1rem' }}>
              {confirmModal.type === 'delete' 
                ? 'Are you sure you want to delete this event? This action cannot be undone.'
                : 'Are you sure you want to book this event? You will receive a QR code for check-in.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setConfirmModal({ show: false, type: null, eventId: null })}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.type === 'delete' ? handleConfirmDelete : handleConfirmBook}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: confirmModal.type === 'delete' ? '#e74c3c' : '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                {confirmModal.type === 'delete' ? 'Delete' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {successModal.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: successModal.type === 'delete' ? '#e74c3c' : '#27ae60',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1002,
          animation: successModal.type === 'delete' 
            ? 'slideInRight 0.3s ease-out, slideOutRight 0.3s ease-out 2.7s forwards' 
            : 'slideInRight 0.3s ease-out, slideOutRight 0.3s ease-out 2.7s forwards',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '1rem',
          fontWeight: '500'
        }}>
          {successModal.type === 'delete' ? (
            <span style={{ fontSize: '1.5rem', animation: 'trashToDustbin 1s ease-in-out' }}>🗑️</span>
          ) : (
            <span style={{ fontSize: '1.5rem', animation: 'checkmarkTick 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}>✓</span>
          )}
          {successModal.message}
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
        @keyframes checkmarkTick {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        @keyframes trashToDustbin {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(20px) rotate(15deg) scale(0.9);
          }
          100% {
            transform: translateY(60px) rotate(45deg) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default EventsPage;

