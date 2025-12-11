import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["booked", "cancelled", "checked-in"], default: "booked" },
    qrCode: { type: String },
  },
  { timestamps: true }
);

bookingSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);


