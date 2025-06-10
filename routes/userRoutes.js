// Importing the sequelize instance and User model
import express from 'express'; // Import express for routing
import { register} from '../controllers/userController.js'; // Import the register function from userController

const router = express.Router();

router.post('/register', register);

// Export the router to be used in the main application
export default router;
