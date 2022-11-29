import express from "express";
import VpnServAsso from "../models/vpn_and_server_asso.model.js";
import genResponses from "../utils/responseCode.js";
import authenticate from "../middlewares/auth.js";
import bodyValidator from "../middlewares/bodyValidator.js";
const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    if (req.authuser.role !== 0 && req.authuser.role !== 1) {
      return genResponses(res, 412, "Permission denied");
    }
    try {
      const vpsevassos = await VpnServAsso.findAll();

      return genResponses(res, 200, "Success", vpsevassos);
    } catch (err) {
      console.log(err.message);
      return genResponses(res, 406, "Schema Validation Failed");
    }
  } catch (err) {
    console.log(err.message);
    return genResponses(res, 500, "Internal error");
  }
});

router.post("/", bodyValidator, authenticate, async (req, res) => {
  try {
    const bodyData = req.body;
    if (req.authuser.role !== 0 && req.authuser.role !== 1) {
      return genResponses(res, 412, "Permission denied");
    }
    try {
      await VpnServAsso.create(bodyData);
      return genResponses(res, 200, "Success");
    } catch (err) {
      return genResponses(res, 406, "Schema Validation Failed");
    }
  } catch (err) {
    console.log(err.message);
    return genResponses(res, 500, "Internal error");
  }
});

router.patch("/", bodyValidator, authenticate, async (req, res) => {
  try {
    if (req.authuser.role !== 0 && req.authuser.role !== 1) {
      return genResponses(res, 412, "Permission denied");
    }
    const bodyData = req.body;
    const vpsNo = bodyData.vps_no;
    delete bodyData.vps_no;
    try {
      await VpnServAsso.update(bodyData, {
        where: {
          vps_no: vpsNo,
        },
      });

      return genResponses(res, 200, "Success");
    } catch (err) {
      console.log(err.message);
      return genResponses(res, 406, "Schema Validation Failed");
    }
  } catch (err) {
    console.log(err.message);
    return genResponses(res, 500, "Internal error");
  }
});

router.delete("/", bodyValidator, authenticate, async (req, res) => {
  try {
    if (req.authuser.role !== 0 && req.authuser.role !== 1) {
      return genResponses(res, 412, "Permission denied");
    }
    const bodyData = req.body;
    const vpsNo = bodyData.vps_no;
    try {
      await VpnServAsso.destroy({
        where: {
          vps_no: vpsNo,
        },
      });

      return genResponses(res, 200, "Success");
    } catch (err) {
      console.log(err.message);
      return genResponses(res, 406, "Schema Validation Failed");
    }
  } catch (err) {
    console.log(err.message);
    return genResponses(res, 500, "Internal error");
  }
});

export default router;
