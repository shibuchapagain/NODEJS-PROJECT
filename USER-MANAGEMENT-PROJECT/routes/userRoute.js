const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const verifyRoles = require("./../controllers/verifyRoles");
const verifyToken = require("./../controllers/verifyToken");
const router = express.Router();

router.route("/users").get(
  verifyToken.token,
  // get access
  userController.getAllUser
);
router
  .route("/user/:id")
  .get(verifyToken.token, verifyRoles.rootRole, userController.getSpecificUser);
router.route("/create").post(userController.createUser);
router
  .route("/update/:id")
  .patch(verifyToken.token, verifyRoles.adminRole, userController.updateUser);
router
  .route("/delete/:id")
  .delete(
    verifyToken.token,
    verifyRoles.rootRole,
    userController.deleteSpecificUser
  );

// FOR AUTH:
router.route("/login").post(authController.loginUser);

module.exports = router;
