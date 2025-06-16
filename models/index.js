// Importing the sequelize instance and User model

import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import User from './user.js'; // Import the User model
import Event from './event.js'; // Import the Event Model
import Guest from './guest.js';  // Import the Guest Model
import Schedule from './schedule.js'; // Import Schedule Model

const db = {
  sequelize,
  User,
  Event,
  Guest,
  Schedule
};

// Relationship
Event.hasMany(Schedule, { foreignKey: 'eventId' });
Schedule.belongsTo(Event, { foreignKey: 'eventId' });

Guest.hasMany(Schedule, { foreignKey: 'guestId' });
Schedule.belongsTo(Guest, { foreignKey: 'guestId' });

export default db;
