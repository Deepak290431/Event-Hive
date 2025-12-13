import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      if (data && data.user && data.token) {
        login(data);
        navigate("/");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)', padding: '2rem', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'url("data:image/svg+xml,%3Csvg width=&quot;80&quot; height=&quot;80&quot; viewBox=&quot;0 0 80 80&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.03&quot;%3E%3Cpath d=&quot;M0 0h40v40H0zM40 40h40v40H40z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', opacity: 0.8, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

        {/* Right side - Form */}
        <div style={{ animation: 'slideInRight 0.8s ease-out' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', width: '480px', maxWidth: '100%' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#667eea', textAlign: 'center' }}>Join EventHive</h1>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#333', textAlign: 'center' }}>Create Account</h2>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.95rem', textAlign: 'center' }}>Join thousands of event enthusiasts</p>

            <form onSubmit={submit}>
              <div style={{ marginBottom: '1.5rem', animation: 'fadeInUp 0.8s ease-out 0.2s both' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333', fontSize: '0.95rem' }}>Full Name</label>
                <input 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  placeholder="John Doe"
                  required
                  style={{ width: '100%', padding: '0.875rem', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '1rem', transition: 'all 0.3s ease', fontFamily: 'inherit' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem', animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333', fontSize: '0.95rem' }}>Email Address</label>
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  placeholder="you@example.com"
                  required
                  style={{ width: '100%', padding: '0.875rem', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '1rem', transition: 'all 0.3s ease', fontFamily: 'inherit' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem', animation: 'fadeInUp 0.8s ease-out 0.4s both' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333', fontSize: '0.95rem' }}>Password</label>
                <input
                  type="password"
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="At least 6 characters"
                  required
                  style={{ width: '100%', padding: '0.875rem', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '1rem', transition: 'all 0.3s ease', fontFamily: 'inherit' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '2rem', animation: 'fadeInUp 0.8s ease-out 0.5s both' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333', fontSize: '0.95rem' }}>I want to</label>
                <select 
                  value={form.role} 
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  style={{ width: '100%', padding: '0.875rem', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '1rem', transition: 'all 0.3s ease', fontFamily: 'inherit', cursor: 'pointer' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="user">Attend Events</option>
                  <option value="organizer">Host Events</option>
                </select>
              </div>

              {error && <p style={{ color: '#ef4444', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fee2e2', borderRadius: '10px', border: '1px solid #fecaca', fontSize: '0.9rem', animation: 'slideDown 0.3s ease-out' }}>{error}</p>}

              <button 
                type="submit" 
                disabled={loading}
                className="custom-btn"
                style={{ 
                  width: '100%', 
                  animation: 'fadeInUp 0.8s ease-out 0.6s both',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                <div className="custom-btn-bg"></div>
                <span className="custom-btn-text">{loading ? 'Creating Account...' : 'Create Account'}</span>
              </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', animation: 'fadeInUp 0.8s ease-out 0.8s both' }}>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Already have an account? <Link to="/login" style={{ color: '#667eea', fontWeight: '600', textDecoration: 'none', transition: 'color 0.3s ease' }} onMouseEnter={(e) => e.target.style.color = '#764ba2'} onMouseLeave={(e) => e.target.style.color = '#667eea'}>Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


