import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Checkin = sequelize.define('Checkin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  guestId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  checkedInAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true // includes createdAt and updatedAt
});

export default Checkin;
