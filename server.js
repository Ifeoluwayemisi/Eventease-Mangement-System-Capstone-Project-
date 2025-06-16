
import express from 'express';
import dotenv from 'dotenv'; // Import dotenv to manage environment variables
import routes from './routes/index.js'; // Import routes from the index file in the routes directory
import sequelize from './config/database.js'; // Import the Sequelize instance from the database configuration
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

// Load environment variables from .env file
dotenv.config();


const app = express();
app.use(express.json());

// Load Swagger YAML
const swaggerDocument = YAML.load('./swagger.yaml');
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

const PORT = process.env.PORT || 3306; // Set the port from environment variables or default to 3306

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(` Swagger UI available at http://localhost:${port}/api-docs`);
  
  });
});












