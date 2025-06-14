// Setup Sequelize connection using environment variables

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Make sure this runs before using process.env

// Destructure environment variables for clarity
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT || 3306, // Default MySQL port
});

export default sequelize;
