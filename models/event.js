<<<<<<< HEAD
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['date'],
    },
  ],
});

module.exports = Event;
=======
/* import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Event', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  date: DataTypes.DATE,
}, { timestamps: true });

//Association
Event.associate = (models) => {
  Event.hasMany(models.Checkin, { foreignKey: 'eventId' });
};

export default Event;*/
>>>>>>> origin/QRCodeImplementation
