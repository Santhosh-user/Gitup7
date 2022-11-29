import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js";

const Client = sequelize.define(
  "client",
  {
    client_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    client_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    client_location: {
      type: DataTypes.STRING(250),
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

export default Client;
