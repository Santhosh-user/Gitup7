import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import User from "../models/user.model.js";
import genResponses from "../utils/responseCode.js";
dotenv.config();

// eslint-disable-next-line consistent-return
const authenticate = async (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring
  try {
    const { ENCRYPTION_KEY } = process.env;
    // const IV_LENGTH = 16;
    const tokenheaders = req.headers.authorization;
    if (!tokenheaders) return genResponses(res, 200, "Missing Auth Key");
    const token = tokenheaders.split(" ");
    if (token[0] !== "Bearer") genResponses(res, 402, "Missing Auth Key");
    const decoded = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
    const emailDec = decoded.finalPart.split(":");
    const iv = Buffer.from(emailDec.shift(), "hex");
    const encryptedText = Buffer.from(emailDec.join(":"), "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]).toString();

    let detectRole;

    try {
      detectRole = await User.findOne({
        where: { useremail: decrypted },
      });
    } catch (err) {
      console.log(err.message);
      return genResponses(res, 406, "Schema Validation Failed");
    }

    if (detectRole === null) {
      return genResponses(res, 403, "Invalid Auth Key / Auth Key Expired");
    }

    req.authuser = { decrypted, role: detectRole.dataValues.role_no };
    return next();
  } catch (err) {
    console.log(err.message);
    return genResponses(res, 403, "Invalid Auth Key / Auth Key Expired");
  }
};

export default authenticate;
