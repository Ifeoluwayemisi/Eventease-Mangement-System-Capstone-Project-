import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Guest = sequelize.define(
    'Guest',
     {
    name:  { type: DataTypes.STRING, allowNull: false },
    email:  { type: DataTypes.STRING, allowNull: false },
    checkedIn: {type: DataTypes.BOOLEAN, defaultValue: false},
    eventId:  { type: DataTypes.INTEGER, allowNull: false}

},
 { timestamps: true }
);


export default Guest;