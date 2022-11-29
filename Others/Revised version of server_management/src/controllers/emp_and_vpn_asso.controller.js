import express from "express";
import EmpVpnAsso from "../models/employee.model.js";
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
      const empvpnass = await EmpVpnAsso.findAll();
      return genResponses(res, 200, "Success", empvpnass);
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
      await EmpVpnAsso.create(bodyData);
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

router.patch("/", bodyValidator, authenticate, async (req, res) => {
  try {
    if (req.authuser.role !== 0 && req.authuser.role !== 1) {
      return genResponses(res, 412, "Permission denied");
    }
    const bodyData = req.body;
    const evNo = bodyData.ev_no;
    delete bodyData.ev_no;
    try {
      await EmpVpnAsso.update(bodyData, {
        where: {
          ev_no: evNo,
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
    const evNo = bodyData.ev_no;

    try {
      await EmpVpnAsso.destroy({
        where: {
          ev_no: evNo,
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
