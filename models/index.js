// Importing the sequelize instance and User model

import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import User from './user.js'; // Import the User model
import Event from './event.js'; // Import the Event Model
import Guest from './guest.js';  // Import the Guest Model
import Schedule from './schedule.js'; // Import Schedule Model
import Checkin from './checkin.js';

const db = {
  sequelize,
  User,
  Event,
  Guest,
  Schedule,
  Checkin
};

// Relationship
Event.hasMany(Schedule, { foreignKey: 'eventId' });
Schedule.belongsTo(Event, { foreignKey: 'eventId' });

Guest.hasMany(Schedule, { foreignKey: 'guestId' });
Schedule.belongsTo(Guest, { foreignKey: 'guestId' });

Checkin.belongsTo(Guest, { foreignKey: 'guestId' });
Checkin.belongsTo(Event, { foreignKey: 'eventId' });

// Many-to-many:
Event.belongsToMany(Guest, {
  through: Checkin,
  foreignKey: 'eventId',
  otherKey: 'guestId',
});

Guest.belongsToMany( Events,{
  through: Checkin,
  foreignKey: 'guestId',
  otherKey: 'eventId',
});

export { User, Event, Guest, Schedule, Checkin };
export default db;
