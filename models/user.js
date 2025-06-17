// UseR model for the EventEase Management System
// This model defines the structure of the User table in the database
// It includes fields for name, email, password, and role
// It uses Sequelize ORM for database interactions

import { DataTypes } from 'sequelize'; // Import DataTypes from Sequelize
import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

// Define the User model with its attributes and constraints
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'organizer', 'guest'),
    defaultValue: 'organizer', // Default role is 'organizer'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // ✅ Automatically set creation timestamp
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // ✅ Automatically set update timestamp
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
},
{
    timestamps: true, // ✅ Enables automatic handling of createdAt & updatedAt
}
);

// Hash password before saving
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

// Hash password before updating
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// method to compare passwords
User.prototype.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ensure that when data is pulled, certain sensitive data are not sent back
User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  delete values.resetPasswordToken;
  delete values.resetPasswordExpires;
  return values;
};

export default User;
