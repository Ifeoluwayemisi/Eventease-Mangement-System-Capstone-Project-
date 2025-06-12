
import express from 'express'; // Import express for routing
import userRoutes from './userRoutes.js'; // Import user routes from userRoutes.js
import { validateQRCodeInput } from '../middlewares/validateinput.js';
import { generateAndStoreQRCode } from '../controllers/qrcontroller.js';
import { authenticate } from '../middleware/auth.js'; // Import authentication middleware

const router = express.Router(); // Create a new router instance

router.use('/users', userRoutes); // Use user routes for any requests to /users
router,post('/generate', validateQRCodeInput, generateAndStoreQRCode);
router.post('/authenticate', generateAndStoreQRCode); // Route for user authentication
// You can add more routes here as needed
//  Example: router.use('/events', eventRoutes);

// Export the router to be used in the main application
export default router;
