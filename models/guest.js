import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Guest = sequelize.define(
    'Guest',
     {
    name:  { type: DataTypes.STRING, allowNull: false },
    email:  { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true, }, unique: true},
    checkedIn: {type: DataTypes.BOOLEAN, defaultValue: false},
    eventId:  { type: DataTypes.INTEGER, allowNull: false, references:{ model: 'Events', key: 'id', } , onDelete: 'CASCADE' },

},
 { timestamps: true,
   tableName: 'Guests'
  }
 
);


export default Guest;