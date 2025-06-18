// // Importing the sequelize instance and User model
// import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
// import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation
// import User from '../models/user.js'; // Import the User model

 export const register = async (req, res) => {
   try {
     const { name, email, password, role } = req.body;
     const hashed = await bcrypt.hash(password, 10);
     const user = await User.create({ name, email, password: hashed, role });
     res.status(201).json({ message: 'User created', user });
   } catch (err) {
     res.status(400).json({ error: err.message });
   }
 };
 
// controllers/userController.js

import User from '../models/User.js';

// @desc    Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json({ status: 'success', data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    res.json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged-in user's profile
export const getUserProfile = async (req, res, next) => {
  try {
    res.json({ status: 'success', data: req.user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    await user.destroy();
    res.json({ status: 'success', message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
}


