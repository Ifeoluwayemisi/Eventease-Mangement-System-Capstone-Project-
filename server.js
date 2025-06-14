
import express from 'express';
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import sequelize from './config/database.js'; // Import the Sequelize instance from the database configuration
import registrationRoutes from './routes/registration.js'; // Import registration routes
import checkinRoutes from './routes/checkinRoute.js'; // Import check-in routes
import qrcodeRoutes from './routes/qrcoderoute.js'; // Import QR code routes
import path from 'path'; // Import path to handle file paths
import errorHandler from './middleware/errorHandler.js'; // Import error handling middleware
import './models/index.js'; // Import all models to ensure they are registered with Sequelize
import {logger} from './middleware/logger.js'; // Import logger middleware for logging requests


// Load environment variables from .env file
dotenv.config();
const app = express();

console.log('errorHandler:', errorHandler);


// Middleware to parse JSON requests
app.use(logger); // Use logger middleware for logging requests
app.use(express.json());
app.use('/api/registration', registrationRoutes); // Use registration routes
app.use('/api', checkinRoutes); 
app.use('/api/qr', qrcodeRoutes); // Use QR code routes
app.use('/qrcodes', express.static('qrcodes'));
app.use(errorHandler); // Use error handling middleware


const PORT = process.env.PORT || 5000; 

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
