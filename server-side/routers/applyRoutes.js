const express = require("express");
const authController = require("./../controllers/authController");
const applyController = require("./../controllers/applyController");
const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("hr"),
    applyController.getApplyHr
  );
router
  .route("/applied")
  .get(
    authController.protect,
    authController.restrictTo("candidate"),
    applyController.getApplyCandidate
  );
router
  .route("/appliedUsers")
  .get(authController.protect, applyController.getAppliedUsers);
router
  .route("/:id")
  .post(
    authController.protect,
    authController.restrictTo("candidate"),
    applyController.applyJob
  )
  .patch(
    authController.protect,
    authController.restrictTo("hr"),
    applyController.processApply
  );
// .delete(
//   authController.protect,
//   authController.restrictTo("candidate"),
//   applyController.cancelApply
// );

module.exports = router;
