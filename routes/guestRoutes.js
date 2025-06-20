import express from 'express';
import { getGuestsByEvent } from '../controllers/guestController.js';
import Guest from '../models/guest.js';


const router = express.Router();

// routes/guestRoutes.js
router.get('/', async (req, res) => {
  const guests = await Guest.findAll();
  res.json(guests);
});

/**
 * @swagger
 * tags:
 *   name: Guests List
 *   description: Get Guest list by event endpoints
 */

/**
 * @swagger
 * /api/guests/event/{eventId}:
 *   get:
 *     summary: Get guests registered for a specific event
 *     tags: [Guests Lists]
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

export default router;
