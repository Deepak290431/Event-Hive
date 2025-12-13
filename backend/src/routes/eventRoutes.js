import { Router } from "express";
import { createEvent, deleteEvent, getEvent, listEvents, seedEvents, updateEvent } from "../controllers/eventController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", listEvents);
router.get("/:id", getEvent);
router.post("/", auth, createEvent);
router.post("/seed", seedEvents); // Public endpoint to seed events
router.put("/:id", auth, updateEvent);
router.delete("/:id", auth, deleteEvent);

export default router;

