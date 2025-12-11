import Event from "../models/Event.js";
import Booking from "../models/Booking.js";
import seedEventsUtil from "../utils/seed.js";

export const listEvents = async (_req, res, next) => {
  try {
    const events = await Event.find().sort({ startTime: 1 }).limit(50);
    res.json(events);
  } catch (err) {
    next(err);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const data = { ...req.body, organizer: req.user._id };
    const event = await Event.create(data);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const isOwner = event.organizer?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await Booking.deleteMany({ event: event._id });
    await event.deleteOne();

    res.json({ message: "Event deleted" });
  } catch (err) {
    next(err);
  }
};

export const seedEvents = async (_req, res, next) => {
  try {
    await seedEventsUtil(true); // Force reseed
    const count = await Event.countDocuments();
    res.json({ message: `Successfully seeded events. Total events in database: ${count}` });
  } catch (err) {
    next(err);
  }
};

