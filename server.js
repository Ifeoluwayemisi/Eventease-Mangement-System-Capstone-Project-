import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import checkinRoutes from './routes/checkin.js';
import { setupSwagger } from './swagger.js';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();
app.use(express.json());

// Serve QR images
app.use('/qrcodes', express.static('qrcodes'));

// Routes
app.use('/api', routes);
app.use('/api/checkin', checkinRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Swagger Documentation
setupSwagger(app);

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    status: false,
    message: 'Internal Server Error',
    error: err.message,
  });
});

// Server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(); // Sequelize DB connection

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
