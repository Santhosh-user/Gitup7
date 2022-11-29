import express from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import authenticate from "../middlewares/auth.js";
import bodyValidator from "../middlewares/bodyValidator.js";
import genResponses from "../utils/responseCode.js";

const router = express.Router();

dotenv.config();

const newToken = (lice) => {
  try {
    const algorithm = "aes256";

    const IV_LENGTH = 16;

    const { ENCRYPTION_KEY } = process.env;

    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(ENCRYPTION_KEY),
      iv
    );

    let encrypted = cipher.update(lice);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    const finalPart = iv.toString("hex") + ":" + encrypted.toString("hex");

    return jwt.sign({ finalPart }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1200s",
    });
  } catch (err) {
    throw new Error(err);
  }
};

router.get("/", authenticate, async (req, res) => {
  try {
    if (req.authuser.role !== 0 && req.authuser.role !== 1) {
      return genResponses(res, 412, "Permission denied");
    }
    let users;
    try {
      users = await User.findAll();

      return genResponses(res, 200, "Success", users);
    } catch (err) {
      return genResponses(res, 406, "Schema Validation Failed");
    }
  } catch (err) {
    console.log(err.message);
    return genResponses(res, 500, "Internal error");
  }
});

router.post(
  "/register",
  bodyValidator,
  body("useremail", "Invalid EmailId").not().isEmpty().isEmail(),
  body("username", "Username field is required").not().isEmpty(),
  body("userpwd", "Password field is required").not().isEmpty(),
  body("userphone")
    .not()
    .isEmpty()
    .matches(
      /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/
    )
    .withMessage("Invalid Mobile Number"),
  body("userpwd")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    )
    .withMessage("Weak Password"),
  authenticate,
  async (req, res) => {
    try {
      const userData = req.body;

      const errOccured = validationResult(req);

      if (!errOccured.isEmpty()) {
        const arrErrors = errOccured
          .array()
          .map((err) => ({ message: err.msg }));

        return genResponses(res, 308, "null", arrErrors);
      }
      if (req.authuser.role !== 0) {
        return genResponses(res, 412, "Permission denied");
      }
      let detectEmail;
      try {
        detectEmail = await User.findOne({
          where: { useremail: userData.useremail },
        });
      } catch (err) {
        return genResponses(res, 406, "Schema Validation Failed");
      }

      if (detectEmail !== null) genResponses(res, 465, "User already exist");

      const saltRounds = 10;

      const myPlaintextPassword = userData.userpwd;

      const hashPasscode = bcrypt.hashSync(myPlaintextPassword, saltRounds);

      userData.userpwd = hashPasscode;
      try {
        await User.create(userData);

        return genResponses(res, 200, "Success");
      } catch (err) {
        return genResponses(res, 406, "Schema Validation Failed");
      }
    } catch (err) {
      console.log(err.message);
      return genResponses(res, 500, "Internal error");
    }
  }
);

router.post(
  "/login",
  bodyValidator,
  body("useremail", "UserID Missing").not().isEmpty(),
  body("userpwd", "Password Missing").not().isEmpty(),
  async (req, res) => {
    try {
      const userData = req.body;

      const errOccured = validationResult(req);

      if (!errOccured.isEmpty()) {
        const arrErrors = errOccured
          .array()
          .map((err) => ({ message: err.msg }));

        return genResponses(res, 408, "UserID or Password Missing", arrErrors);
      }

      let users;

      try {
        users = await User.findOne({
          where: { useremail: userData.useremail },
        });
      } catch (err) {
        return genResponses(res, 406, "Schema Validation Failed");
      }

      if (users === null) return genResponses(res, 411, "Invalid credentials");

      const hashedPassword = users.userpwd;

      const checkingPassword = await bcrypt.compare(
        userData.userpwd,
        hashedPassword
      );

      if (!checkingPassword) {
        return genResponses(res, 411, "Invalid credentials");
      }

      try {
        await User.update(
          { onlinestatus: 1 },
          {
            where: {
              useremail: userData.useremail,
            },
          }
        );
      } catch (err) {
        return genResponses(res, 406, "Schema Validation Failed");
      }

      const keygen = newToken(userData.useremail);

      return genResponses(res, 200, "Success", {
        token: keygen,
        role: users.role_no,
      });
    } catch (err) {
      console.log(err.message);
      return genResponses(res, 500, "Internal error");
    }
  }
);

router.post(
  "/forgot-password",
  bodyValidator,
  body("useremail", "UserID Missing").not().isEmpty(),
  async (req, res) => {
    try {
      const userData = req.body;

      const errOccured = validationResult(req);

      if (!errOccured.isEmpty()) {
        const arrErrors = errOccured
          .array()
          .map((err) => ({ message: err.msg }));

        return genResponses(res, 408, "UserID or Password Missing", arrErrors);
      }

      let getUser;
      try {
        getUser = await User.findOne({
          where: { useremail: `${userData.useremail}` },
        });
      } catch (err) {
        return genResponses(res, 406, "Schema Validation Failed");
      }

      if (getUser === null) {
        return genResponses(res, 406, "Enter a valid email address");
      }

      const keygen = newToken(userData.useremail);

      console.log(keygen, "keygen");

      const resetLink = `http://localhost:2456/reset-password/${keygen}`;

      const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "noreply@syntizen.com", // generated ethereal user
          pass: "AmSMLUqPVI8v7cSv", // generated ethereal password
        },
      });

      // send mail with defined transport object
      await transporter.sendMail({
        from: "noreply@syntizen.com", // sender address
        to: "santhosh.s@syntizen.com", // list of receivers
        subject: "Reset your password", // Subject line
        text: "Hello world?", // plain text body
        html: `<p>To reset your password <a href=${resetLink}>Click Here</a></p>`, // html body
      });

      return genResponses(
        res,
        203,
        "Password reset link has been sent to email"
      );
    } catch (err) {
      return genResponses(res, 501, "There is problem in sending the email");
    }
  }
);

router.post(
  "/reset-password",
  bodyValidator,
  authenticate,
  body("userpwd", "Password Missing").not().isEmpty(),
  async (req, res) => {
    try {
      const userData = req.body;
      const errOccured = validationResult(req);

      if (!errOccured.isEmpty()) {
        const arrErrors = errOccured
          .array()
          .map((err) => ({ message: err.msg }));

        return genResponses(res, 408, "UserID or Password Missing", arrErrors);
      }

      const saltRounds = 10;

      let getUser;
      try {
        getUser = await User.findOne({
          where: { useremail: `${userData.useremail}` },
        });
      } catch (err) {
        return genResponses(res, 406, "Schema Validation Failed");
      }

      if (getUser.length === 0) {
        return genResponses(res, 406, "Enter a valid email address");
      }

      const myPlaintextPassword = userData.userpwd;

      const hashPasscode = bcrypt.hashSync(myPlaintextPassword, saltRounds);

      try {
        await User.update(
          { userpwd: hashPasscode },
          { where: { useremail: req.authuser } }
        );
      } catch (err) {
        return genResponses(res, 406, "Schema Validation Failed");
      }

      return genResponses(res, 201, "Password has been changed successfully");
    } catch (err) {
      return genResponses(res, 504, "There is a problem in sending email");
    }
  }
);

router.patch("/", authenticate, async (req, res) => {
  try {
    if (req.authuser.role !== 0) {
      return genResponses(res, 412, "Permission denied");
    }

    const bodyData = req.body;
    const userNo = bodyData.user_no;
    delete bodyData.user_no;

    try {
      await User.update(bodyData, {
        where: {
          user_no: userNo,
        },
      });
    } catch (err) {
      return genResponses(res, 406, "Schema Validation Failed");
    }

    return genResponses(res, 200, "Success");
  } catch (err) {
    console.log(err.message);
    return genResponses(res, 500, "Internal error");
  }
});

router.delete("/", authenticate, async (req, res) => {
  try {
    if (req.authuser.role !== 0) {
      return genResponses(res, 412, "Permission denied");
    }

    const bodyData = req.body;
    const userNo = bodyData.user_no;
    delete bodyData.user_no;

    try {
      await User.destroy({
        where: {
          user_no: userNo,
        },
      });
    } catch (err) {
      return genResponses(res, 406, "Schema Validation Failed");
    }

    return genResponses(res, 200, "Success");
  } catch (err) {
    console.log(err.message);
    return genResponses(res, 500, "Internal error");
  }
});

export default router;
