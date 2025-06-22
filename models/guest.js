import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Event from './event.js'; // ensure associations are defined elsewhere

const Guest = sequelize.define('Guest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guestType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkedIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  timestamps: true,
});

export default Guest;
// Associations
Event.hasMany(Guest, { foreignKey: 'eventId', onDelete: 'CASCADE' });
Guest.belongsTo(Event, { foreignKey: 'eventId' });
