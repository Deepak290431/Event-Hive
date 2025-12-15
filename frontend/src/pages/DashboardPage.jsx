import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useAuthorizedApi } from "../api/client.js";
import QRCode from "qrcode.react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardPage = () => {
  const api = useAuthorizedApi();
  const [bookings, setBookings] = useState([]);
  const [cancelConfirm, setCancelConfirm] = useState({ show: false, bookingId: null });

  useEffect(() => {
    api.get("/bookings").then(({ data }) => {
      const activeBookings = data.filter((b) => b.status !== "cancelled");
      setBookings(activeBookings);
    });
  }, []);

  const chartData = {
    labels: bookings.map((b) => b.event?.title || "Event"),
    datasets: [
      {
        label: "Bookings",
        data: bookings.map(() => 1),
        backgroundColor: "#6f6cf3",
      },
    ],
  };

  const handleCancel = async (id) => {
    setCancelConfirm({ show: true, bookingId: id });
  };

  const confirmCancel = async () => {
    try {
      await api.patch(`/bookings/${cancelConfirm.bookingId}/cancel`);
      setBookings((prev) => prev.filter((b) => b._id !== cancelConfirm.bookingId));
      setCancelConfirm({ show: false, bookingId: null });
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <section style={{ animation: 'pageLoad 0.6s ease-out' }}>
      <h1>My tickets</h1>
      <div className="grid">
        {bookings.map((b) => (
          <article key={b._id} className="card">
            <h3>{b.event?.title}</h3>
            <p className="muted">{new Date(b.createdAt).toLocaleString()}</p>
            {b.qrCode ? <img src={b.qrCode} alt="QR code" className="qr" /> : <QRCode value={b._id} size={96} />}
            <p>Status: {b.status}</p>
            {b.status === "booked" && (
              <button className="ghost" onClick={() => handleCancel(b._id)}>
                Cancel booking
              </button>
            )}
          </article>
        ))}
      </div>

      <div className="card">
        <h2>Booking summary</h2>
        <Bar data={chartData} />
      </div>

      {/* Cancel Confirmation Dialog */}
      {cancelConfirm.show && (
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
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h2 style={{ marginTop: 0, color: '#333', marginBottom: '1rem' }}>
              Cancel Booking?
            </h2>
            <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1rem' }}>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setCancelConfirm({ show: false, bookingId: null })}
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
                No, Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardPage;

