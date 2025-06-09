import { DataTypes } from 'sequelize'; // Import DataTypes from Sequelize
import sequelize from '../config/database.js';// Import the Sequelize instance from the database configuration

// Schedule model for the EventEase Management System
const Schedule = sequelize.define('Schedule', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
    timestamps : true
});



export default Schedule;
