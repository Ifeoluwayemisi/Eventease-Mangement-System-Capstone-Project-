// sync.js
import sequelize from './config/database.js';
import './models/event.js';
import './models/guest.js';
import './models/user.js'; 


try {
  await sequelize.sync({ alter: true }); // or { force: true } to drop and recreate
  console.log('Tables created successfully!');
} catch (err) {
  console.error('Failed to sync DB:', err);
} finally {
  await sequelize.close();
}
