import express from "express";
import { body } from "express-validator";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword
} from "../controllers/authcontroller.js";

import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'moderator'])
    .withMessage('Invalid role specified')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const passwordValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const changePasswordValidation = [
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('currentPassword')
    .notEmpty()
    .withMessage('Please enter your current password'),
];

// User registration
router.post("/register", registerValidation, register);

// User login
router.post("/login", loginValidation, login);

// Forgot password (request reset token)
router.post("/forgot-password", forgotPassword);

// Reset password using token
router.post("/reset-password/:token",passwordValidation,  resetPassword);

// Change password (authenticated user)
router.post("/change-password", protect, changePasswordValidation, changePassword);

router.get('/admin-only', protect, authorize('admin'), (req, res) => {
  res.json({
    status: 'success',
    message: 'You have admin access',
    user: req.user
  });
});

export default router;
