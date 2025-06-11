import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Event = sequelize.define("Event", {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
},
{
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});


// Export the Event model
export default Event;