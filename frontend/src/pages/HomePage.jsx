import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';
import EventHiveLogo from '../components/EventHiveLogo.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [teamMembers] = useState([
    { id: 1, name: 'Sarah Johnson', role: 'Event Manager', emoji: '👩‍💼', desc: 'Expert in planning and executing memorable events with attention to detail.' },
    { id: 2, name: 'Mike Chen', role: 'DJ & Sound Engineer', emoji: '🎧', desc: 'Creates the perfect atmosphere with curated music and professional sound.' },
    { id: 3, name: 'Emma Davis', role: 'Coordinator', emoji: '👩‍💻', desc: 'Ensures every event runs smoothly with perfect timing and coordination.' },
    { id: 4, name: 'Alex Rodriguez', role: 'Venue Manager', emoji: '🏢', desc: 'Manages all aspects of venue logistics and guest experience.' },
    { id: 5, name: 'Lisa Wong', role: 'Marketing Specialist', emoji: '📱', desc: 'Promotes events and builds excitement through creative campaigns.' },
    { id: 6, name: 'James Miller', role: 'Technical Director', emoji: '⚙️', desc: 'Handles all technical aspects including lighting, video, and effects.' },
  ]);

  const [services] = useState([
    { id: 1, name: 'Corporate Events', emoji: '🏢', desc: 'Professional events for conferences, meetings, and team building.' },
    { id: 2, name: 'Weddings', emoji: '💍', desc: 'Unforgettable wedding celebrations tailored to your vision.' },
    { id: 3, name: 'Birthday Parties', emoji: '🎂', desc: 'Fun and memorable birthday celebrations for all ages.' },
    { id: 4, name: 'Concerts', emoji: '🎵', desc: 'Live music events with professional sound and lighting.' },
    { id: 5, name: 'Product Launches', emoji: '🚀', desc: 'Impactful product launches that create buzz and excitement.' },
    { id: 6, name: 'VIP Service', emoji: '👑', desc: 'Premium service for exclusive and high-profile events.' },
  ]);

  useEffect(() => {
    api.get('/events')
      .then(({ data }) => {
        const filteredEvents = data.filter(event => 
          event.title !== "Tech Startup Summit Mumbai" && 
          // event.title !== "Business Network Meetup" &&
          event.title !== "Business Networking Meetup"
        );
        const limitedEvents = filteredEvents.slice(0, 6);
        setUpcomingEvents(limitedEvents);
      })
      .catch((err) => console.error('Failed to fetch events:', err));
  }, []);

  const getEventImage = (event, index) => {
    // Ultra-reliable fallback images that always work
    const reliableImages = [
      'https://picsum.photos/400/300?random=1', // Random image 1
      'https://picsum.photos/400/300?random=2', // Random image 2
      'https://picsum.photos/400/300?random=3', // Random image 3
      'https://picsum.photos/400/300?random=4', // Random image 4
      'https://picsum.photos/400/300?random=5', // Random image 5
      'https://picsum.photos/400/300?random=6', // Random image 6
      'https://picsum.photos/400/300?random=7', // Random image 7
      'https://picsum.photos/400/300?random=8', // Random image 8
      'https://picsum.photos/400/300?random=9', // Random image 9
      'https://picsum.photos/400/300?random=10' // Random image 10
    ];
    
    // Always return a reliable image based on index
    return reliableImages[index % reliableImages.length];
  };

  return (
    <div className="home-page" style={{ minHeight: '100vh', animation: 'pageLoad 0.6s ease-out' }}>
      {/* Hero Section */}
      <section className="hero" style={{ position: 'relative', zIndex: 1, backgroundImage: 'url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(185, 140, 248, 0.85) 0%, rgba(154, 99, 247, 0.85) 100%)', zIndex: 1 }} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ animation: 'slideDown 1s ease-out', fontSize: '4.5rem', fontWeight: '800', color: 'white' }}>EventHive</h1>
          <p style={{ animation: 'fadeInUp 1s ease-out 0.3s both', fontSize: '2rem', fontWeight: '600' }}>Create Unforgettable Moments</p>
          <p style={{ fontSize: '1.3rem', marginBottom: '2rem', animation: 'fadeInUp 1s ease-out 0.5s both' }}>
            Your one-stop platform for discovering, booking, and managing amazing events
          </p>
          <div className="hero-buttons">
            <button 
              onClick={() => user ? navigate('/dashboard') : navigate('/register')} 
              className="btn btn-primary" 
              style={{ 
                animation: 'slideUp 1s ease-out 0.7s both', 
                transition: 'all 0.3s ease', 
                border: 'none', 
                cursor: 'pointer' 
              }} 
              onMouseEnter={(e) => { e.target.style.animation = 'buttonHover 0.4s ease-out forwards'; }} 
              onMouseLeave={(e) => { e.target.style.animation = 'none'; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; }}
              onMouseDown={(e) => { e.target.style.animation = 'buttonClick 0.2s ease-out'; }}
            >
              Get Started
            </button>
            <Link 
              to="/events" 
              className="btn btn-outline" 
              style={{ 
                color: 'white', 
                borderColor: 'white', 
                animation: 'slideUp 1s ease-out 0.9s both', 
                transition: 'all 0.3s ease' 
              }} 
              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; }} 
              onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>About EventHive</h2>
            <p>We are dedicated to creating extraordinary events that bring people together and create lasting memories.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3>Our Mission</h3>
              <p>To make event planning simple, affordable, and accessible to everyone.</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
              <h3>Our Vision</h3>
              <p>To be the leading platform for event discovery and management worldwide.</p>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💪</div>
              <h3>Our Values</h3>
              <p>Excellence, innovation, and customer satisfaction in everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      
      {/* Services Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>We offer comprehensive event solutions for every occasion and budget.</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={service.id} className="service-card" style={{ animation: `scaleIn 0.6s ease-out ${0.1 * index}s both` }}>
                <div className="service-icon" style={{ animation: `bounce 2s ease-in-out infinite`, animationDelay: `${0.1 * index}s` }}>{service.emoji}</div>
                <h3 style={{ animation: `slideUp 0.6s ease-out ${0.1 * index + 0.2}s both` }}>{service.name}</h3>
                <p style={{ animation: `slideUp 0.6s ease-out ${0.1 * index + 0.3}s both` }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Upcoming Events</h2>
            <p>Discover and book amazing events happening near you.</p>
          </div>
          <div className="events-grid">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <div key={event._id} className="event-card" style={{ animation: `fadeInUp 0.8s ease-out ${0.15 * index}s both`, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div 
                    className="event-image" 
                    style={{ 
                      height: '200px',
                      width: '100%',
                      backgroundImage: `url(${getEventImage(event, index)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      overflow: 'hidden',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '8px 8px 0 0',
                      flexShrink: 0
                    }}
                  />
                  <div className="event-content" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="event-date" style={{ animation: `slideUp 0.6s ease-out ${0.15 * index + 0.2}s both` }}>
                      {new Date(event.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 style={{ animation: `slideUp 0.6s ease-out ${0.15 * index + 0.3}s both` }}>{event.title}</h3>
                    <p style={{ animation: `slideUp 0.6s ease-out ${0.15 * index + 0.4}s both` }}>{event.description?.substring(0, 80)}...</p>
                    <div className="event-price" style={{ animation: `slideUp 0.6s ease-out ${0.15 * index + 0.5}s both` }}>📍 {event.location}</div>
                    <button onClick={() => user ? navigate(`/booking-success/${event._id}`) : navigate('/register')} className="animated-button" style={{ animation: `slideUp 0.6s ease-out ${0.15 * index + 0.6}s both` }}>
                      <span className="circle"></span>
                      <span className="text">Book Now</span>
                      <svg className="arr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                      <svg className="arr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Loading events...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Create Your Event?</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Join thousands of event organizers who trust EventHive
          </p>
          <Link to="/register" className="btn btn-primary">
            Start Planning Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)', 
        color: 'white', 
        padding: '3rem 0 2rem',
        marginTop: '4rem'
      }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '1rem',
                color: '#f7fafc'
              }}>EventHive</h3>
              <p style={{ 
                color: '#cbd5e0', 
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                Your premier platform for creating and managing unforgettable events.
              </p>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '1.2rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#f7fafc'
              }}>Contact Us</h4>
              <div style={{ color: '#cbd5e0', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#e2e8f0' }}>Mobile:</strong> 9865432122
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: '#e2e8f0' }}>Email:</strong> admin@eventhive.com
                </p>
              </div>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: '1.2rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#f7fafc'
              }}>Quick Links</h4>
              <div style={{ color: '#cbd5e0', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '0.5rem' }}>
                  <Link to="/" style={{ color: '#cbd5e0', textDecoration: 'none' }}>Home</Link>
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <Link to="/events" style={{ color: '#cbd5e0', textDecoration: 'none' }}>Events</Link>
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                  <Link to="/register" style={{ color: '#cbd5e0', textDecoration: 'none' }}>Register</Link>
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid #4a5568', 
            marginTop: '2rem', 
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: '#718096', 
              margin: '0',
              fontSize: '0.9rem'
            }}>
              © 2024 EventHive. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
