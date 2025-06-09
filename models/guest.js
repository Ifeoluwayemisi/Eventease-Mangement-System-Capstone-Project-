import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Guest = sequelize.define('Guest', {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  checkedIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
},
{
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    tableName: 'guests' 
});

export default Guest;
