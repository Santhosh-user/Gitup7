import express from "express";
// import axios from 'axios';
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./connection/db.js";
import userController from "./controllers/user.controller.js";
import clientController from "./controllers/client.controller.js";
import employeeController from "./controllers/employee.controller.js";
import empAndVpnAsso from "./controllers/emp_and_vpn_asso.controller.js";
import product from "./controllers/product.controller.js";
import serverWhiteListing from "./controllers/server_whitelisting.controller.js";
import vpndetails from "./controllers/vpn_details.controller.js";
import vpnserv from "./controllers/vpn_and_server_asso.controller.js";
import server from "./controllers/server.controller.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const { PORT } = process.env;

app.use("/user", userController);
app.use("/client", clientController);
app.use("/employee", employeeController);
app.use("/empvpn", empAndVpnAsso);
app.use("/product", product);
app.use("/servwhi", serverWhiteListing);
app.use("/vpndetails", vpndetails);
app.use("/vpnserv", vpnserv);
app.use("/server", server);

app.listen(PORT, async () => {
  try {
    console.log(`Server connected to ${PORT} sucessfully`);
    await sequelize.authenticate().then(() => {
      console.log("Connection has been established successfully.");
    });
  } catch (err) {
    console.log(err.message);
  }
});
