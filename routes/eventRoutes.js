import express from "express";
import { upload } from '../config/storage.js';
import { createEventValidator, validationInputMiddleware } from "../middlewares/validateinput.js";
import {
  createEvent,
  getAllEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getNumberEvent,
  getUpcomingEvent,
} from "../controllers/eventController.js";

const router = express.Router();

// Create a new event
router.post(
  "/create",
  upload.single('image'),
  createEventValidator,
  validationInputMiddleware,
  createEvent
);

// Analytics: Total number of events
router.get("/analytics/total", getNumberEvent);

// Analytics: Upcoming events
router.get("/analytics/upcoming", getUpcomingEvent);

// Get all events with pagination
router.get("/", getAllEvent);

// Get a single event by ID
router.get("/:id", getEvent); // Use `:id` instead of `:eventId` to match controller usage

// Update an event by ID
router.put(
  "/:id",
  upload.single('image'),
  createEventValidator,
  validationInputMiddleware,
  updateEvent
);

// Delete an event by ID
router.delete("/:id", deleteEvent);

export default router;
