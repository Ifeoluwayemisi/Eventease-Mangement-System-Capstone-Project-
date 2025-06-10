
import express from 'express';
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import routes from './routes/index.js'; // Import routes from the index file in the routes directory
import sequelize from './config/database.js'; // Import the Sequelize instance from the database configuration
import registrationRoutes from './routes/registration.js'; // Import registration routes
import checkinRoutes from './routes/checkin.js'; // Import check-in routes
import qrcodeRoutes from './routes/qrcode.js'; // Import QR code routes


// Load environment variables from .env file
dotenv.config();
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api/registration', registrationRoutes); // Use registration routes
app.use('/api/checkin', checkinRoutes); // Use check-in routes
app.use('/api', routes);
app.use('qr', qrcodeRoutes); // Use QR code routes

const PORT = process.env.PORT || 3306; // Set the port from environment variables or default to 3306

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
