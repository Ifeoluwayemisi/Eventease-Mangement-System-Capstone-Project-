import express from "express";
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

router.post("/events", createEventValidator, validationInputMiddleware, createEvent);

router.get("/analytics/events/total", getNumberEvent);

router.get("/analytics/events/upcoming", getUpcomingEvent)

router.get("/events", getAllEvent);

router.get("/events/:eventId", getEvent);

router.put("/events/:eventId", updateEvent);

router.delete("/events/:eventId", deleteEvent);

export default router;