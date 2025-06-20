import express from 'express';
import checkinRoutes from './checkin.js';
import guestRoutes from './guestRoutes.js';

const router = express.Router();

//routes
router.use('/checkins', checkinRoutes);  // /api/checkins
router.use('/guests', guestRoutes);      // /api/guests

export default router;
