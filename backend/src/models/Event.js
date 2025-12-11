import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    capacity: { type: Number, default: 100 },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    image: { type: String },
    qrTemplate: { type: String },
    tags: [{ type: String }],
    stats: {
      bookings: { type: Number, default: 0 },
      checkIns: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);

