// Importing the sequelize instance and User model

import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import User from './user.js'; // Import the User model

const db = {
  sequelize,
  User,
};

export default db;
