
import express from 'express'; // Import express for routing
import userRoutes from './userRoutes.js'; // Import user routes from userRoutes.js

const router = express.Router(); // Create a new router instance

router.post('/users', userRoutes); // Use user routes for any requests to /users
// You can add more routes here as needed
//  Example: router.use('/events', eventRoutes);

// Export the router to be used in the main application
export default router;
