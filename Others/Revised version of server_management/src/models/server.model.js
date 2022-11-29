import { DataTypes } from "sequelize";
import sequelize from "../connection/db.js";

const Server = sequelize.define(
  "server",
  {
    server_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    server_datacenter: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    env: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    server_location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    vdom_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hostname: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    vmname: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    os_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    private_ip: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    public_ip: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    cpu: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ram: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    storage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    server_pwd: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    client_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pro_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    server_apptype: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    responsible_emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ssh_port: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ref1: {
      type: DataTypes.STRING(100),
    },
    ref2: {
      type: DataTypes.STRING(200),
    },
    ref3: {
      type: DataTypes.STRING,
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
    user_remarks: {
      type: DataTypes.STRING(250),
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

export default Server;
