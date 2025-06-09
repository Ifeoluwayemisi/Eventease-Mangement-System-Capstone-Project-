import express from 'express';
import { registerGuest } from '../controllers/registrationController.js';

const router = express.Router();
// Route to register a guest for an event

router.post('/events/:id/guests', registerGuest);

// Export the router
export default router;