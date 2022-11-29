import express from "express";
import Client from "../models/client.model.js";
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
      const clients = await Client.findAll();
      return genResponses(res, 200, "Success", clients);
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
    if (req.authuser.role !== 0 && req.authuser.role !== 1) {
      return genResponses(res, 412, "Permission denied");
    }
    const bodyData = req.body;
    try {
      await Client.create(bodyData);
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
    const clientNo = bodyData.client_no;
    delete bodyData.client_no;
    try {
      await Client.update(bodyData, {
        where: {
          client_no: clientNo,
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
    const clientNo = bodyData.client_no;
    try {
      await Client.destroy({
        where: {
          client_no: clientNo,
        },
      });
      return genResponses(res, 200, "Success");
    } catch (err) {
      console.log(err.meaasage);
      return genResponses(res, 406, "Schema Validation Failed");
    }
  } catch (err) {
    console.log(err.meaasage);
    return genResponses(res, 500, "Internal error");
  }
});

export default router;
