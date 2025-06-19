import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Guest = sequelize.define('Guest', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
}, { timestamps: true });

// Associations
Guest.associate = (models) => {
  Guest.hasMany(models.Checkin, { foreignKey: 'guestId' });
};

export default Guest;
