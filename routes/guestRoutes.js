import express from 'express';
import { getGuestsByEvent } from '../controllers/guestController.js';

const router = express.Router();

// routes/guestRoutes.js
router.get('/', async (req, res) => {
  const guests = await Guest.findAll();
  res.json(guests);
});


router.get('/event/:eventId', getGuestsByEvent); // GET /guests/event/1

export default router;
