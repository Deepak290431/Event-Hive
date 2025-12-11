import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const BookingSuccessPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [qrCode] = useState('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TICKET-' + eventId + '-' + Date.now());

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const bookingDetails = {
    eventName: 'Summer Music Festival',
    date: 'June 15, 2024',
    time: '6:00 PM - 11:00 PM',
    location: 'Central Park, New York',
    ticketId: 'TICKET-' + eventId + '-' + Date.now(),
    price: '$45',
    bookingDate: new Date().toLocaleDateString()
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center'
    }}>
      <div style={{ maxWidth: '600px', width: '100%', background: 'white', borderRadius: '20px', padding: '3rem', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', animation: 'slideUp 0.8s ease-out' }}>
        {/* Success Icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', animation: 'slideDown 0.6s ease-out' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'bounce 2s ease-in-out infinite' }}>✅</div>
          <h1 style={{ fontSize: '2.5rem', color: '#667eea', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Your ticket has been successfully booked</p>
        </div>

        {/* Booking Details */}
        <div style={{ background: '#f9fafb', borderRadius: '15px', padding: '2rem', marginBottom: '2rem', animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
          <h2 style={{ color: '#333', marginBottom: '1.5rem', fontSize: '1.3rem' }}>Booking Details</h2>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Event</p>
            <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600' }}>{bookingDetails.eventName}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Date & Time</p>
            <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600' }}>{bookingDetails.date} • {bookingDetails.time}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Location</p>
            <p style={{ color: '#333', fontSize: '1.1rem', fontWeight: '600' }}>{bookingDetails.location}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Ticket ID</p>
            <p style={{ color: '#667eea', fontSize: '1rem', fontWeight: '600', fontFamily: 'monospace' }}>{bookingDetails.ticketId}</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Price</p>
            <p style={{ color: '#333', fontSize: '1.3rem', fontWeight: '700' }}>{bookingDetails.price}</p>
          </div>

          <div>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Booking Date</p>
            <p style={{ color: '#333', fontSize: '1rem' }}>{bookingDetails.bookingDate}</p>
          </div>
        </div>

        {/* QR Code Section */}
        <div style={{ background: '#f9fafb', borderRadius: '15px', padding: '2rem', marginBottom: '2rem', textAlign: 'center', animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
          <h3 style={{ color: '#333', marginBottom: '1rem' }}>Your Ticket QR Code</h3>
          <img src={qrCode} alt="Ticket QR Code" style={{ width: '200px', height: '200px', marginBottom: '1rem' }} />
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            <strong>What is this QR code?</strong>
          </p>
          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
            This QR code is your digital ticket. It contains your unique ticket ID and event information. Show this code at the event entrance for check-in. You can screenshot it or save it to your phone for easy access.
          </p>
        </div>

        {/* Check-in Info */}
        <div style={{ background: '#e3f2fd', borderRadius: '15px', padding: '1.5rem', marginBottom: '2rem', borderLeft: '4px solid #667eea', animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
          <h3 style={{ color: '#667eea', marginBottom: '0.5rem', fontSize: '1.1rem' }}>📍 Check-in Information</h3>
          <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
            <strong>What is Check-in?</strong> Check-in is the process of verifying your ticket at the event entrance. Our staff will scan your QR code to confirm your booking and grant you entry. This ensures only valid ticket holders can attend and helps us manage crowd capacity and security.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', animation: 'fadeInUp 0.8s ease-out 0.5s both' }}>
          <Link to="/dashboard" style={{ padding: '1rem', backgroundColor: '#667eea', color: 'white', textAlign: 'center', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', transition: 'all 0.3s ease', cursor: 'pointer', border: 'none' }} onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#764ba2';
            e.target.style.transform = 'translateY(-2px)';
          }} onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#667eea';
            e.target.style.transform = 'translateY(0)';
          }}>
            Go to Dashboard
          </Link>
          <Link to="/" style={{ padding: '1rem', backgroundColor: '#f0f0f0', color: '#333', textAlign: 'center', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', transition: 'all 0.3s ease', cursor: 'pointer', border: 'none' }} onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e0e0e0';
            e.target.style.transform = 'translateY(-2px)';
          }} onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f0f0f0';
            e.target.style.transform = 'translateY(0)';
          }}>
            Back to Home
          </Link>
        </div>

        {/* Additional Info */}
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff3cd', borderRadius: '10px', borderLeft: '4px solid #ffc107', animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
          <p style={{ color: '#856404', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>
            <strong>💡 Tip:</strong> Save your ticket ID and QR code. You can view your bookings anytime in your dashboard. Arrive 15-30 minutes early for smooth check-in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
