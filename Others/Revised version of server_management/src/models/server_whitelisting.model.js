import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js";

const ServerWhitelisting = sequelize.define(
  "server_whitelisting",
  {
    sw_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    server_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dest_server_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    dest_ip: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    dest_port: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default ServerWhitelisting;
