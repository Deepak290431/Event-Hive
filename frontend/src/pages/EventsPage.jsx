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
    api.get("/events").then(({ data }) => {
      setEvents(data);
      setFilteredEvents(data);
    }).finally(() => setLoading(false));
  }, []);

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

  const handleBook = async (eventId) => {
    if (!user) return alert("Login to book");
    await authApi.post("/bookings", { eventId });
    alert("Booking created! View QR in dashboard.");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    payload.capacity = Number(payload.capacity) || 0;
    await authApi.post("/events", payload);
    const { data } = await api.get("/events");
    setEvents(data);
    setCreating(false);
    setForm({ title: "", description: "", location: "", startTime: "", endTime: "", capacity: 100 });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await authApi.delete(`/events/${id}`);
    setEvents((prev) => prev.filter((e) => e._id !== id));
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
                  {isOrganizer && (
                    <button className="ghost" onClick={() => handleDelete(ev._id)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
      </section>
    </div>
  );
};

export default EventsPage;

