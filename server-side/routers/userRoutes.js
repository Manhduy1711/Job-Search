const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/islogedin").get(authController.isLognedIn);
router
  .route("/me")
  .get(authController.protect, userController.getOneUser)
  .patch(authController.protect, userController.UpdateOne);
router.route("/").get(userController.getAllUser);
router
  .route("/:id")
  .get(userController.getOneUser)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.disableOne
  );
router
  .route("/favorite/:id")
  .patch(
    authController.protect,
    authController.restrictTo("candidate"),
    userController.addFavoriteJob
  )
  .delete(
    authController.protect,
    authController.restrictTo("candidate"),
    userController.deleteFavoriteJob
  );

module.exports = router;
