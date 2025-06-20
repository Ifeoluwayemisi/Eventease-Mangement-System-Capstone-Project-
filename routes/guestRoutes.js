import express from "express";
import { createGuest, getGuestsByEvent, deleteGuest, updateGuest, getGuestById, } from "../controllers/guestController.js";
import { createGuestValidator, validationInputMiddleware } from "../middlewares/validateinput.js";

const router = express.Router();

// Create a new guest
router.post('/create', createGuestValidator, validationInputMiddleware, createGuest);

// Get all guests
router.get('/', authenticateOrganizer, getAllGuests);

// Get guests by event ID (with pagination)
router.get('/event/:eventId', authenticateOrganizer, getGuestsByEvent);

// Get single guest by ID
router.get('/:guestId', authenticateOrganizer, getGuestById);

// Update a guest
router.put('/:guestId', createGuestValidator, validationInputMiddleware, updateGuest);

// Delete a guest
router.delete('/:guestId', authenticateOrganizer, deleteGuest);

export default router;