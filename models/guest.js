import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // your DB connection
import Event from './event.js'; // assuming event model already exists

const Guest = sequelize.define('Guest', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guestType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
});



export default Guest;