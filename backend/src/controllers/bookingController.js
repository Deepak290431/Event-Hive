import QRCode from "qrcode";
import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import crypto from "crypto";

export const createBooking = async (req, res, next) => {
  try {
    const { eventId, paymentId, orderId, signature } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // If event has a price, verify payment
    if (event.price > 0) {
      if (!paymentId || !orderId || !signature) {
        return res.status(400).json({ message: "Payment details required for paid events" });
      }

      // Verify Razorpay signature
      const body = `${orderId}|${paymentId}`;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

      if (expectedSignature !== signature) {
        return res.status(400).json({ message: "Invalid payment signature" });
      }
    }

    const booking = await Booking.create({
      event: event._id,
      user: req.user._id,
      paymentId: paymentId || null,
      orderId: orderId || null,
    });

    const qrPayload = { bookingId: booking._id.toString(), eventId: event._id.toString() };
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrPayload));
    booking.qrCode = qrCode;
    await booking.save();

    event.stats.bookings += 1;
    await event.save();

    res.status(201).json(booking);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already booked" });
    }
    next(err);
  }
};

export const listBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("event");
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id }).populate("event");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }
    if (booking.status === "checked-in") {
      return res.status(400).json({ message: "Cannot cancel after check-in" });
    }

    booking.status = "cancelled";
    await booking.save();

    if (booking.event) {
      booking.event.stats.bookings = Math.max(0, (booking.event.stats.bookings || 0) - 1);
      await booking.event.save();
    }

    res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    next(err);
  }
};

