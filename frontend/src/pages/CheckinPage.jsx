import { useState } from "react";
import QrReader from "react-qr-scanner";
import { useAuthorizedApi } from "../api/client.js";

const CheckinPage = () => {
  const api = useAuthorizedApi();
  const [message, setMessage] = useState("Scan a ticket");

  const handleScan = async (payload) => {
    if (!payload?.text) return;
    try {
      const { bookingId } = JSON.parse(payload.text);
      await api.post("/checkin/confirm", { bookingId, deviceId: "web" });
      setMessage("Check-in successful");
    } catch (err) {
      setMessage(err.response?.data?.message || "Check-in failed");
    }
  };

  return (
    <section className="card" style={{ animation: 'pageLoad 0.6s ease-out' }}>
      <h1>Check-in scanner</h1>
      <QrReader
        delay={500}
        onError={(e) => setMessage(e?.message || "Camera error")}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{message}</p>
    </section>
  );
};

export default CheckinPage;

