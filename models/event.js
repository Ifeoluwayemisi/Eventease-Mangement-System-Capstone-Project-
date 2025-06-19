import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Event', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
   location: DataTypes.STRING,
  date: DataTypes.DATE,
}, { timestamps: true });

//Association
Event.associate = (models) => {
  Event.hasMany(models.Checkin, { foreignKey: 'eventId' });
};

export default Event;
