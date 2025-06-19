import express from 'express';
import checkinRoutes from './checkin.js';
import guestRoutes from './guestRoutes.js';


const router = express.Router();

router.use('/checkins', checkinRoutes); // Base path: /api/
router.use('/guests', guestRoutes);

export default router;
