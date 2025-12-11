import { Router } from "express";
import { createBooking, listBookings, cancelBooking } from "../controllers/bookingController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use(auth);
router.post("/", createBooking);
router.get("/", listBookings);
router.patch("/:id/cancel", cancelBooking);

export default router;

