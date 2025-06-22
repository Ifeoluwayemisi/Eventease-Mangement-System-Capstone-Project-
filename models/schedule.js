import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Schedule = sequelize.define('Schedule', {
  scheduleId: {
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
  tableName: 'Schedules',
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