import { DataTypes } from "sequelize";
import  sequelize  from "../config/database.js";

const Event = sequelize.define(
  "Event",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    startsAt: {type: DataTypes.DATE, allowNull: false},
    endsAt: {type: DataTypes.DATE, allowNull: false},
    location: { type: DataTypes.STRING, allowNull: false },
    description:  { type: DataTypes.STRING, allowNull: false },
    organizerId:  { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id'} },
  },
  
  { timestamps: true }
  
);

export default Event;