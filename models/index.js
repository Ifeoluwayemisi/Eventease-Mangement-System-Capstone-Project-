// Importing the sequelize instance and User model

import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import User from './user.js'; // Import the User model  
import Event from './event.js'
import Guest from './guest.js';

// Organizer (user) creates Events
User.hasMany(Event, { foreignKey: 'organizerId' }); // Define a one-to-many relationship between User and Event
Event.belongsTo(User, { foreignKey: 'organizerId', as: "organizer" }); // Define a many-to-one relationship from Event to User

// Events and Guests relationship (many to many)
Event.hasMany(Guest, { foreignKey: 'eventId' }); // Define a one-to-many relationship between Event and Guest
Guest.belongsTo(Event, { foreignKey: 'eventId', as: "event" }); // Define a many-to-one relationship from Guest to Event


export { User, Event, Guest };