import { DataTypes } from 'sequelize'; // Import DataTypes from Sequelize
import sequelize from '../config/database.js';// Import the Sequelize instance from the database configuration

// Schedule model for the EventEase Management System
const Schedule = sequelize.define('Schedule', {
  scheduleId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventId: DataTypes.INTEGER,
  activity: DataTypes.STRING,
  time: DataTypes.DATE,
},
{
    timestamps : true
});



export default Schedule;
