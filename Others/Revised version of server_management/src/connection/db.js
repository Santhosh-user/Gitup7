import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  "server_management",
  "root",
  process.env.DBPASS,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
