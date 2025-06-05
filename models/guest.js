import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Guest = sequelize.define('Guest', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    checkedIn: {type: DataTypes.BOOLEAN, defaultValue: false}

});


export default Guest;