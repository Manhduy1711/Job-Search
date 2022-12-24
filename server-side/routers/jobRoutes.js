const express = require("express");
const authController = require("../controllers/authController");
const jobController = require("../controllers/jobController");
const router = express.Router();

router
  .route("/")
  .get(jobController.getAllJob)
  .post(
    authController.protect,
    authController.restrictTo("hr", "admin"),
    jobController.createJob
  );
router.route("/acceptedJobs").get(jobController.getAcceptedJobs);
router.route("/result").get(jobController.getResultSearch);
router
  .route("/:id")
  .get(jobController.getOneJob)
  .patch(authController.protect, jobController.updateJob);
module.exports = router;
