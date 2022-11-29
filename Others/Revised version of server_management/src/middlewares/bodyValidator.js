import genResponses from "../utils/responseCode.js";

const bodyValidator = async (req, res, next) => {
  try {
    const contentType = req.headers["content-type"];

    if (!contentType) {
      return genResponses(res, 300, "Header is incorrect");
    }

    if (contentType !== "application/json") {
      return genResponses(res, 300, "Header is incorrect");
    }

    const userData = req.body;

    const bodyKeys = Object.keys(userData);
    // const bodyValues=Object.values(userData);

    if (bodyKeys.length <= 0) {
      return genResponses(res, 404, "Empty Request");
    }

    return next();
  } catch (err) {
    return genResponses(res, 500, "Internal error");
  }
};

export default bodyValidator;
