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

router.post("/create",upload.single('image'), createEventValidator, validationInputMiddleware, createEvent);

router.get("/analytics/total", getNumberEvent);

router.get("/analytics/upcoming", getUpcomingEvent)

router.get("/", getAllEvent);

router.get("/:eventId", getEvent);

router.put("/:eventId", upload.single('image'), createEventValidator, validationInputMiddleware, updateEvent);

router.delete("/:eventId", deleteEvent);

export default router;