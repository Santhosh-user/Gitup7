import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js";

const User = sequelize.define(
  "user",
  {
    user_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    role_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    userpwd: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
    },
    city: {
      type: DataTypes.STRING(100),
    },
    state: {
      type: DataTypes.STRING(100),
    },
    pincode: {
      type: DataTypes.STRING(10),
    },
    name: {
      type: DataTypes.STRING(100),
    },
    useremail: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    userphone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    employeeid: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    pht: {
      type: DataTypes.TEXT("long"),
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
    remarks: {
      type: DataTypes.STRING,
    },
    resetcode: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    onlinestatus: {
      type: DataTypes.INTEGER,
    },
    onlinestatusremark: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

export default User;
