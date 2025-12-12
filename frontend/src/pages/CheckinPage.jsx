import { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { useAuthorizedApi } from "../api/client.js";

const CheckinPage = () => {
  const api = useAuthorizedApi();
  const [message, setMessage] = useState("Scan a ticket");
  const [stats, setStats] = useState({ today: 0, total: 0, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/checkin/stats");
      setStats(response.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async (payload) => {
    if (!payload?.text) return;
    try {
      const { bookingId } = JSON.parse(payload.text);
      await api.post("/checkin/confirm", { bookingId, deviceId: "web" });
      setMessage("Check-in successful");
      fetchStats(); // Refresh stats after successful check-in
    } catch (err) {
      setMessage(err.response?.data?.message || "Check-in failed");
    }
  };

  return (
    <div style={{ animation: 'pageLoad 0.6s ease-out' }}>
      {/* Stats Section */}
      <section className="card" style={{ marginBottom: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Check-in Dashboard</h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white', 
            padding: '1.5rem', borderRadius: '12px', 
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {loading ? '...' : stats.today}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Today's Check-ins</div>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
            color: 'white', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(240, 147, 251, 0.3)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              {loading ? '...' : stats.total}
            </div>
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>Total Check-ins</div>
          </div>
        </div>

        {/* Recent Check-ins */}
        {stats.recent.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Recent Check-ins</h3>
            <div style={{ 
              display: 'grid', 
              gap: '0.5rem',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {stats.recent.map((checkin, index) => (
                <div key={index} style={{ 
                  background: '#f8f9fa', 
                  padding: '0.75rem', 
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  {checkin.booking?.name || 'Unknown'} - {new Date(checkin.createdAt).toLocaleTimeString()}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Scanner Section */}
      <section className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>QR Scanner</h2>
        <QrReader
          delay={500}
          onError={(e) => setMessage(e?.message || "Camera error")}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <p style={{ 
          textAlign: 'center', 
          marginTop: '1rem',
          padding: '1rem',
          background: message.includes("successful") ? '#d4edda' : message.includes("failed") ? '#f8d7da' : '#e2e3e5',
          borderRadius: '8px',
          color: message.includes("successful") ? '#155724' : message.includes("failed") ? '#721c24' : '#383d41'
        }}>
          {message}
        </p>
      </section>
    </div>
  );
};

export default CheckinPage;

