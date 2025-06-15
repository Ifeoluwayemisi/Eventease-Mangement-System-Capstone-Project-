import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import checkinRoutes from './routes/checkin.js';

dotenv.config();
const app = express();
app.use(express.json());

// QR image access
app.use('/qrcodes', express.static('qrcodes'));
app.use('/api', routes);
app.use('/api/checkin', checkinRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
});
