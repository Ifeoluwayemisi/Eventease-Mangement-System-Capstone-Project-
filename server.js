
import express from 'express';
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import routes from './routes/index.js'; // Import routes from the index file in the routes directory
import sequelize from './config/database.js'; // Import the Sequelize instance from the database configuration
// import YAML from 'yamljs';
// import swaggerUi from 'swagger-ui-express';

// Load environment variables from .env file
dotenv.config();


const app = express();
app.use(express.json());


app.use('/api', routes);

// Handle invalid routes (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
});

// Global error handler (500)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    status: false,
    message: 'Internal Server Error',
    error: err.message,
  });
});




const PORT = process.env.PORT || 5000; // Set the port from environment variables or default to 3306

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  
  });
});

