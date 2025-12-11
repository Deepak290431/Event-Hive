import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true, unique: true },
    scannedAt: { type: Date, default: Date.now },
    deviceId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);


