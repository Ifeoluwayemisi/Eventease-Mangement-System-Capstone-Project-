import express from "express";
import { createGuest, getGuestsByEvent, deleteGuest, updateGuest, getGuestById, } from "../controllers/guestController.js";
import { createGuestValidator, validationInputMiddleware } from "../middlewares/validateinput.js";

const router = express.Router();

// Create a new guest
router.post('/create', createGuestValidator, validationInputMiddleware, createGuest);

// // Get all guests
// router.get('/', getAllGuests);

// Get guests by event ID (with pagination)
router.get('/event/:eventId' , getGuestsByEvent);

// Get single guest by ID
router.get('/:guestId', getGuestById);

// Update a guest
router.put('/:guestId', createGuestValidator, validationInputMiddleware, updateGuest);

// Delete a guest
router.delete('/:guestId', deleteGuest);

export default router;