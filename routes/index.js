import express from 'express';
import dotenv from 'dotenv';

import userRoutes from './userRoutes.js';
import eventRoutes from './eventRoutes.js';
import guestRoutes from './guestRoutes.js';
import checkinRoutes from './checkin.js';

dotenv.config(); // Optional: load env variables

const router = express.Router();

// Mounting all routes
router.use('/users', userRoutes);       // /api/users
router.use('/events', eventRoutes);     // /api/events
router.use('/guests', guestRoutes);     // /api/guests
router.use('/checkins', checkinRoutes); // /api/checkins

export default router;
