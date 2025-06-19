import sequelize from '../config/database.js';
import User from './user.js';
import Guest from './guest.js';
import Event from './event.js';
import Checkin from './checkin.js';

const db = {
  sequelize,
  User,
  Guest,
  Event,
  Checkin,
};

//Associations
Guest.hasMany(Checkin, { foreignKey: 'guestId' });
Event.hasMany(Checkin, { foreignKey: 'eventId' });

Checkin.belongsTo(Guest, { foreignKey: 'guestId' });
Checkin.belongsTo(Event, { foreignKey: 'eventId' });

// Many-to-many:
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

export { User, Guest, Event, Checkin };
export default db;
