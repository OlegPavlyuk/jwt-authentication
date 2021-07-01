const { Router } = require("express");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router;
