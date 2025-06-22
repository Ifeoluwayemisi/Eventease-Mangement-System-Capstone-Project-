import sequelize from '../config/database.js';
import User from './user.js';
import Event from './event.js';
import Guest from './guest.js';
import Schedule from './schedule.js';
import Checkin from './checkin.js';

// Model Associations 

//Event to Guest (One-to-Many)
Event.hasMany(Guest, { foreignKey: 'eventId', onDelete: 'CASCADE' });
Guest.belongsTo(Event, { foreignKey: 'eventId' });

// User to Event (One-to-Many)
User.hasMany(Event, { foreignKey: 'organizerId' });
Event.belongsTo(User, { foreignKey: 'organizerId' });

// Event to Schedule (One-to-Many)
Event.hasMany(Schedule, { foreignKey: 'eventId' });
Schedule.belongsTo(Event, { foreignKey: 'eventId' });

// Guest to Schedule (One-to-Many)
Guest.hasMany(Schedule, { foreignKey: 'guestId' });
Schedule.belongsTo(Guest, { foreignKey: 'guestId' });

// Guest to Event (Many-to-Many through Checkin)
Event.belongsToMany(Guest, {
  through: Checkin,
  foreignKey: 'eventId',
  otherKey: 'guestId',
});
Guest.belongsToMany(Event, {
  through: Checkin,
  foreignKey: 'guestId',
  otherKey: 'eventId',
});

// Checkin still needs direct reference to both models
Checkin.belongsTo(Guest, { foreignKey: 'guestId' });
Checkin.belongsTo(Event, { foreignKey: 'eventId' });

// Exporting Models 
const db = {
  sequelize,
  User,
  Event,
  Guest,
  Schedule,
  Checkin,
};

export { User, Event, Guest, Schedule, Checkin };
export default db;
