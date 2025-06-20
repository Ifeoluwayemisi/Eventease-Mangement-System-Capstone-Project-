// Importing the sequelize instance and User model
import Guest from './guest.js';
import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import User from './user.js'; // Import the User model
import Event from './event.js'; // Import the Event model


const db = {
  sequelize,
};


Event.hasMany(Guest, {foreignKey: 'eventId', onDelete: 'CASCADE'});
Guest.belongsTo(Event, {foreignKey: 'eventId'});

Event.belongsTo(User, { foreignKey: 'organizerId'});
User.hasMany(Event, {foreignKey: ' organizerId'});

export { db, Event, Guest,};


