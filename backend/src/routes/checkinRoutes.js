import { Router } from "express";
import { checkIn, verify, getCheckInStats } from "../controllers/checkinController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use(auth);
router.post("/verify", verify);
router.post("/confirm", checkIn);
router.get("/stats", getCheckInStats);

export default router;


