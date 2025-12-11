import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { useAuthorizedApi } from "../api/client.js";
import QRCode from "qrcode.react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardPage = () => {
  const api = useAuthorizedApi();
  const [bookings, setBookings] = useState([]);

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
    await api.patch(`/bookings/${id}/cancel`);
    setBookings((prev) => prev.filter((b) => b._id !== id));
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
    </section>
  );
};

export default DashboardPage;

