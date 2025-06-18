// routes/userRoutes.js

import express from 'express';
import {
  register,
  getAllUsers,
  getUserById,
  getUserProfile,
  deleteUser
} from '../controllers/userController.js';

import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public route - User registration
router.post('/register', register);

// Get all users - Admin only
router.get('/', protect, authorize('admin'), getAllUsers);

// Get user by ID - Admin only
router.get('/:id', protect, authorize('admin'), getUserById);

// Get logged-in user's profile
router.get('/me/profile', protect, getUserProfile);

// Delete user by ID - Admin only
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router;
