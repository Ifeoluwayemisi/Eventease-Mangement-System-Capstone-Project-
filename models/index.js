<<<<<<< HEAD
// Importing the sequelize instance and User model

import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import User from './user.js'; // Import the User model
import Event from './event.js'; // Import the Event Model
import Guest from './guest.js';  // Import the Guest Model
import Schedule from './schedule.js'; // Import Schedule Model
=======
import sequelize from '../config/database.js';
import User from './user.js';
import Guest from './guest.js';
// import Event from './event.js';
import Checkin from './checkin.js';
>>>>>>> origin/QRCodeImplementation

const db = {
  sequelize,
  User,
<<<<<<< HEAD
  Event,
  Guest,
  Schedule
};

// Relationship
Event.hasMany(Schedule, { foreignKey: 'eventId' });
Schedule.belongsTo(Event, { foreignKey: 'eventId' });

Guest.hasMany(Schedule, { foreignKey: 'guestId' });
Schedule.belongsTo(Guest, { foreignKey: 'guestId' });

=======
  Guest,
  Event,
  Checkin,
};

//Associations
Guest.hasMany(Checkin, { foreignKey: 'guestId' });
// Event.hasMany(Checkin, { foreignKey: 'eventId' });

Checkin.belongsTo(Guest, { foreignKey: 'guestId' });
// Checkin.belongsTo(Event, { foreignKey: 'eventId' });

// Many-to-many:
/*Event.belongsToMany(Guest, {
  through: Checkin,
  foreignKey: 'eventId',
  otherKey: 'guestId',
});*/

/*Guest.belongsToMany({
  through: Checkin,
  foreignKey: 'guestId',
  otherKey: 'eventId',
});*/

export { User, Guest, Checkin };
>>>>>>> origin/QRCodeImplementation
export default db;
