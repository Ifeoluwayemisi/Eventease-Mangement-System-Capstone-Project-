
import express from 'express'; // Import express for routing
import userRoutes from './userRoutes.js'; // Import user routes from userRoutes.js
import eventRoutes from './eventRoutes.js'; // Import event routes from eventRoutes.js (if needed)
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import guestRoutes from './guestRoutes.js'; // Import guest routes from guestRoutes.js (if needed)

const router = express.Router(); // Create a new router instance

router.use('/users', userRoutes); // Use user routes for any requests to /users
// You can add more routes here as needed
//  Example: router.use('/events', eventRoutes);

router.use('/events', eventRoutes);
router.use('/guest', guestRoutes);

// Export the router to be used in the main application
export default router;
