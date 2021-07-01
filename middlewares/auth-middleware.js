const tokenService = require("../services/token-service");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("Not authorized");
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      throw new Error("Not authorized");
    }

    const userData = tokenService.validateToken(token);
    if (!userData) {
      throw new Error("Not authorized");
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(new Error("Not authorized"));
  }
};
