// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/authRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import checkinRoutes from "./routes/checkinRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";

// const app = express();

// app.use(
//   cors({
//     origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(helmet());
// app.use(express.json());
// app.use(cookieParser());
// app.use(morgan("dev"));

// app.get("/health", (_req, res) => {
//   res.json({ status: "ok" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/events", eventRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/checkin", checkinRoutes);
// app.use("/api/payments", paymentRoutes);

// app.use((err, _req, res, _next) => {
//   console.error(err);
//   res.status(err.status || 500).json({ message: err.message || "Server error" });
// });

// export default app;


import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import checkinRoutes from "./routes/checkinRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

/* =========================
   CORS CONFIG (FIXED)
========================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://event-hive-blond.vercel.app/" // 👈 YOUR VERCEL DOMAIN
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
  })
);

// Handle preflight requests
app.options("*", cors());

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/checkin", checkinRoutes);
app.use("/api/payments", paymentRoutes);

/* =========================
   ERROR HANDLER
========================= */

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Server error"
  });
});

export default app;
