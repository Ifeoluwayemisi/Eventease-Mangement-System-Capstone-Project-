import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Events',
      key: 'id',
    },
  },
  guestId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Guests',
      key: 'id',
    },
  },
  scheduleDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['eventId'],
    },
    {
      fields: ['guestId'],
    },
  ],
});

export default Schedule;