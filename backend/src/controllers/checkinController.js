import Booking from "../models/Booking.js";
import Attendance from "../models/Attendance.js";
import Event from "../models/Event.js";

export const verify = async (req, res, next) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ valid: true, booking });
  } catch (err) {
    next(err);
  }
};

export const checkIn = async (req, res, next) => {
  try {
    const { bookingId, deviceId } = req.body;
    const booking = await Booking.findById(bookingId).populate("event");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const attendance = await Attendance.create({ booking: booking._id, deviceId });
    booking.status = "checked-in";
    await booking.save();

    const event = await Event.findById(booking.event._id);
    if (event) {
      event.stats.checkIns += 1;
      await event.save();
    }

    res.json({ message: "Checked in", attendance });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already checked-in" });
    }
    next(err);
  }
};

export const getCheckInStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayCheckIns = await Attendance.countDocuments({
      createdAt: { $gte: today }
    });
    
    const totalCheckIns = await Attendance.countDocuments();
    
    const recentCheckIns = await Attendance.find()
      .populate('booking')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      today: todayCheckIns,
      total: totalCheckIns,
      recent: recentCheckIns
    });
  } catch (err) {
    next(err);
  }
};


