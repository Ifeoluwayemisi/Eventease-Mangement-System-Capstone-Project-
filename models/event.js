import { DataTypes } from "sequelize";
import  sequelize  from "../config/database.js";

const Event = sequelize.define(
  "Event",
  {
    title: { // "Event Name"
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventType: { // "Event Type"
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientName: { // "Client's Name"
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: { // "Description"
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: { // "Date"
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
   time: { // "Time"
    type: DataTypes.TIME,
    allowNull: false,
  },
  location: { // "Location"
    type: DataTypes.STRING,
    allowNull: false,
  },
  guestLimit: { // "Guest Limit"
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: { // Uploaded image (optional)
    type: DataTypes.STRING,
    allowNull: true, // Cloudinary image URL or local path
  },
  organizerId: { // Foreign key to Users
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
     },
},

  { timestamps: true,
    tableName: 'Events'
   }
  
);

export default Event;