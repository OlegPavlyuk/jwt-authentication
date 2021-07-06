const tokenService = require('../services/token-service');
const ApiError = require('../exceptions/api-error');

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(token);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
