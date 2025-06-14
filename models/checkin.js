import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Import the Sequelize instance from the database configuration
import Guest from './guest.js';
import Event from './event.js';

const Checkin = sequelize.define('Checkin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  guestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Guest,
      key: 'id'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id'
    }
  },
  checkedInAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

// Associations
Guest.hasMany(Checkin, { foreignKey: 'guestId' });
Event.hasMany(Checkin, { foreignKey: 'eventId' });
Checkin.belongsTo(Guest, { foreignKey: 'guestId' });
Checkin.belongsTo(Event, { foreignKey: 'eventId' });

export default Checkin;
