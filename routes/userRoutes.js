<<<<<<< HEAD
// Importing the sequelize instance and User model
import express from 'express'; // Import express for routing
import { register} from '../controllers/userController.js'; // Import the register function from userController
=======
// // Importing the sequelize instance and User model
// import express from 'express'; // Import express for routing
// import { register } from '../controllers/userController.js'; // Import the register function from userController

// const router = express.Router();

// router.post('/register', register);


// // Export the router to be used in the main application
// export default router;

// routes/userRoutes.js

import express from 'express';
import {
  getAllUsers,
  getUserById,
  getUserProfile,
  deleteUser
} from '../controllers/userController.js';

import { protect, authorize } from '../middlewares/authMiddleware.js';
>>>>>>> SokeBra

const router = express.Router();

// Get all users - Admin only
router.get('/', protect, authorize('admin'), getAllUsers);

<<<<<<< HEAD
// Export the router to be used in the main application
=======
// Get user by ID - Admin only
router.get('/:id', protect, authorize('admin'), getUserById);

// Get logged-in user's profile
router.get('/me/profile', protect, getUserProfile);

// Delete user by ID - Admin only
router.delete('/:id', protect, authorize('admin'), deleteUser);

>>>>>>> SokeBra
export default router;
