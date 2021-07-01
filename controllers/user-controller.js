const { validationResult } = require("express-validator");
const userService = require("../services/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        next(
          new Error(
            `Bad request: ${errors
              .array()
              .map((err) => `${err.param} - ${err.msg}`)}`
          )
        );
        return;
      }

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();

      res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
