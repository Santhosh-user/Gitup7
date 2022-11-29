import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js";

const Employee = sequelize.define(
  "employee",
  {
    emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    emp_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    emp_name: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    emp_password: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    role_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isvpn_created: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

export default Employee;
