const { Router } = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 24 }),
  userController.registration
);
router.post("/login", userController.login);
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
