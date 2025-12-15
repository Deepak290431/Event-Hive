import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import EventHiveLogo from "./EventHiveLogo.jsx";
import { useState, useEffect } from "react";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMenuClick = (path, action) => {
    setDropdownOpen(false);
    if (action === 'logout') {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown-container')) {
      setDropdownOpen(false);
    }
  };

  if (isMobile) {
    return (
      <header className="navbar">
        {/* Mobile: Only Three-Dot Menu */}
        <div className="mobile-dropdown-container" style={{ position: 'relative' }}>
          <button
            onClick={toggleDropdown}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0px',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="12" cy="5" r="1"/>
              <circle cx="12" cy="19" r="1"/>
            </svg>
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                overflow: 'hidden',
                zIndex: 1000,
                minWidth: '200px',
                marginTop: '0.5rem'
              }}
            >
            <div
              onClick={() => handleMenuClick('/', null)}
              style={{
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background-color 0.2s ease',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              <span>Home</span>
            </div>

            <div
              onClick={() => handleMenuClick('/events', null)}
              style={{
                padding: '0.75rem 1rem',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'background-color 0.2s ease',
                fontSize: '0.95rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>Events</span>
            </div>

            {user && (
              <>
                <div
                  onClick={() => handleMenuClick('/dashboard', null)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'background-color 0.2s ease',
                    fontSize: '0.95rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                  </svg>
                  <span>Dashboard</span>
                </div>

                <div
                  onClick={() => handleMenuClick('/checkin', null)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'background-color 0.2s ease',
                    fontSize: '0.95rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="m22 21-3-3"/>
                    <circle cx="17" cy="17" r="3"/>
                  </svg>
                  <span>Check-in</span>
                </div>

                <div
                  onClick={() => handleMenuClick(null, 'logout')}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'background-color 0.2s ease',
                    fontSize: '0.95rem',
                    color: '#dc3545'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8d7da';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>Logout</span>
                </div>
              </>
            )}
            </div>
          )}
        </div>
        <div className="mobile-title" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', color: '#ffffff', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.3px', pointerEvents: 'none' }}>
          EventHive
        </div>
      </header>
    );
  }

  // Desktop View
  return (
    <header className="navbar">
      <Link to="/" className="brand" style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', fontWeight: '900', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 0.75rem)', textDecoration: 'none', position: 'relative' }}>
        <EventHiveLogo size={40} />
        <span style={{ 
          position: 'relative',
          color: '#667eea',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          animation: 'superShining 4s ease-in-out infinite',
          textShadow: '0 0 15px rgba(102, 126, 234, 0.3), 0 0 30px rgba(102, 126, 234, 0.2)',
          filter: 'drop-shadow(0 0 8px rgba(102, 126, 234, 0.3))'
        }}>
          EventHive
        </span>
      </Link>

      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="navbar-nav">
        <div className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
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
        </div>
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

