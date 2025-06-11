// This code defines a route for checking in a guest at an event.

import express from 'express';
import { checkInGuest } from '../controllers/checkinController.js';

const router = express.Router();

// Route to check in a guest
router.post('/checkin', checkInGuest);

export default router;
