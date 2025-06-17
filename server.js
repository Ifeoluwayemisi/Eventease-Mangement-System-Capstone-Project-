
import express from 'express';
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import routes from './routes/index.js'; // Import routes from the index file in the routes directory
import sequelize from './config/database.js'; // Import the Sequelize instance from the database configuration

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 3306

//  Log environment variables for debugging
console.log("🔹 Environment Variables Loaded:");
console.log("PORT:", process.env.PORT);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
console.log("JWT_SECRET:", process.env.JWT_SECRET);



//Authentication Routes
app.use('/api/auth', authRoutes);

//User Routes
app.use('/api/users', userRoutes);
// const PORT = process.env.PORT || 3306; // Set the port from environment variables or default to 3306

// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// });

// Start server
// const PORT = process.env.PORT || 3306;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      //console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();