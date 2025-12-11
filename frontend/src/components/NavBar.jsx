import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import EventHiveLogo from "./EventHiveLogo.jsx";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
        <EventHiveLogo size={32} />
        EventHive
      </Link>
      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'nav-link--active' : ''}`}
          style={{ 
            color: location.pathname === '/' ? 'white' : 'var(--text-dark)', 
            fontWeight: '600', 
            fontSize: '1.1rem', 
            padding: '0.5rem 1rem', 
            transition: 'all 0.3s ease', 
            borderRadius: '8px',
            backgroundColor: location.pathname === '/' ? 'var(--primary)' : 'transparent'
          }} 
          onMouseEnter={(e) => { 
            if (location.pathname !== '/') {
              e.target.style.color = 'var(--primary)'; 
              e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'; 
              e.target.style.transform = 'scale(1.05)'; 
            }
          }} 
          onMouseLeave={(e) => { 
            if (location.pathname !== '/') {
              e.target.style.color = 'var(--text-dark)'; 
              e.target.style.backgroundColor = 'transparent'; 
              e.target.style.transform = 'scale(1)'; 
            }
          }}
        >
          Home
        </Link>
        <Link 
          to="/events" 
          className={`nav-link ${location.pathname === '/events' ? 'nav-link--active' : ''}`}
          style={{ 
            color: location.pathname === '/events' ? 'white' : 'var(--text-dark)', 
            fontWeight: '600', 
            fontSize: '1.1rem', 
            padding: '0.5rem 1rem', 
            transition: 'all 0.3s ease', 
            borderRadius: '8px',
            backgroundColor: location.pathname === '/events' ? 'var(--primary)' : 'transparent'
          }} 
          onMouseEnter={(e) => { 
            if (location.pathname !== '/events') {
              e.target.style.color = 'var(--primary)'; 
              e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'; 
              e.target.style.transform = 'scale(1.05)'; 
            }
          }} 
          onMouseLeave={(e) => { 
            if (location.pathname !== '/events') {
              e.target.style.color = 'var(--text-dark)'; 
              e.target.style.backgroundColor = 'transparent'; 
              e.target.style.transform = 'scale(1)'; 
            }
          }}
        >
          Events
        </Link>
        {user && (
          <>
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'nav-link--active' : ''}`}
              style={{ 
                color: location.pathname === '/dashboard' ? 'white' : 'var(--text-dark)', 
                fontWeight: '600', 
                fontSize: '1.1rem', 
                padding: '0.5rem 1rem', 
                transition: 'all 0.3s ease', 
                borderRadius: '8px',
                backgroundColor: location.pathname === '/dashboard' ? 'var(--primary)' : 'transparent'
              }} 
              onMouseEnter={(e) => { 
                if (location.pathname !== '/dashboard') {
                  e.target.style.color = 'var(--primary)'; 
                  e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'; 
                  e.target.style.transform = 'scale(1.05)'; 
                }
              }} 
              onMouseLeave={(e) => { 
                if (location.pathname !== '/dashboard') {
                  e.target.style.color = 'var(--text-dark)'; 
                  e.target.style.backgroundColor = 'transparent'; 
                  e.target.style.transform = 'scale(1)'; 
                }
              }}
            >
              Dashboard
            </Link>
            <Link 
              to="/checkin" 
              className={`nav-link ${location.pathname === '/checkin' ? 'nav-link--active' : ''}`}
              style={{ 
                color: location.pathname === '/checkin' ? 'white' : 'var(--text-dark)', 
                fontWeight: '600', 
                fontSize: '1.1rem', 
                padding: '0.5rem 1rem', 
                transition: 'all 0.3s ease', 
                borderRadius: '8px',
                backgroundColor: location.pathname === '/checkin' ? 'var(--primary)' : 'transparent'
              }} 
              onMouseEnter={(e) => { 
                if (location.pathname !== '/checkin') {
                  e.target.style.color = 'var(--primary)'; 
                  e.target.style.backgroundColor = 'rgba(99, 102, 241, 0.1)'; 
                  e.target.style.transform = 'scale(1.05)'; 
                }
              }} 
              onMouseLeave={(e) => { 
                if (location.pathname !== '/checkin') {
                  e.target.style.color = 'var(--text-dark)'; 
                  e.target.style.backgroundColor = 'transparent'; 
                  e.target.style.transform = 'scale(1)'; 
                }
              }}
            >
              Check-in
            </Link>
          </>
        )}
      </nav>
      <div className="nav-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--bg-light)', borderRadius: 'var(--radius-full)', color: 'var(--primary)', fontWeight: '600' }}>
              {user.name}
            </span>
            <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary-hover)'} onMouseLeave={(e) => e.target.style.color = 'var(--primary)'}>
              Login
            </Link>
            <button className="btn btn-primary" onClick={() => navigate("/register")} style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;

