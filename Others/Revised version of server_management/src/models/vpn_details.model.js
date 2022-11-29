import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js";

const VpnDetails = sequelize.define(
  "vpn_detail",
  {
    vpn_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    vpn_id: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    vpn_password: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    vdom_no: {
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

export default VpnDetails;
