import express from "express";
import {
  createGuest,
  getGuestsByEvent,
  deleteGuest,
  updateGuest,
  getGuestById,
} from "../controllers/guestController.js";
import Guest from "../models/guest.js";
import {
  createGuestValidator,
  validationInputMiddleware,
} from "../middlewares/validateinput.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Guests
 *   description: Guest management and retrieval
 */

/**
 * @swagger
 * /api/guests/event/{eventId}:
 *   get:
 *     summary: Get guests registered for a specific event
 *     tags: [Guests]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of guests for the event
 */
router.get('/event/:eventId', getGuestsByEvent);

// Get all guests (for admin/debug, optional)
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.findAll();
    res.status(200).json({ status: true, data: guests });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Create a guest
router.post(
  '/create',
  createGuestValidator,
  validationInputMiddleware,
  createGuest
);

// Get a single guest
router.get('/:guestId', getGuestById);

// Update a guest
router.put(
  '/:guestId',
  createGuestValidator,
  validationInputMiddleware,
  updateGuest
);

// Delete a guest
router.delete('/:guestId', deleteGuest);

export default router;
