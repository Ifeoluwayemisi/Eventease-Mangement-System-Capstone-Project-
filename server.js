import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import routes from './routes/index.js';
import checkinRoutes from './routes/checkin.js';
import { setupSwagger } from './swagger.js';
import { connectDB } from './config/database.js';

dotenv.config();
const app = express();
app.use(express.json());

// QR image access
app.use('/qrcodes', express.static('qrcodes'));

// Routes
app.use('/api', routes);
app.use('/api/checkin', checkinRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Swagger docs
setupSwagger(app);

// Port setup
const PORT = process.env.PORT || 5000;

// Start the server
const startServer = async () => {
  try {
    await connectDB();

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
