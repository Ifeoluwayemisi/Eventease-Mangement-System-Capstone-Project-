import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Event', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  date: DataTypes.DATE,
}, { timestamps: true });

export default Event;
