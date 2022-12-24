const Job = require("../models/jobModel");
const Apply = require("../models/applyModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
exports.applyJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    // checking is id valid
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Not valid Id!", success: false });

    // finding job
    const verifyJob = await Job.findOne({ _id: id });
    // checking is appplication deadline passed
    if (new Date(verifyJob.deadline) < new Date().setHours(0, 0, 0, 0)) {
      return res
        .status(500)
        .json({ message: "Application closed!", success: false });
    }

    // checking is already applied
    const isAlreadyApplied = await Apply.findOne({
      candidate: req.user.id,
      job: id,
    });
    console.log(isAlreadyApplied);
    if (isAlreadyApplied)
      return res
        .status(500)
        .json({ message: "Already applied!", success: false });

    // verify candidate role

    // saving apply
    const apply = new Apply({
      candidate: req.user.id,
      job: id,
      recuiter: verifyJob.createdBy,
    });
    const result = await apply.save();

    // if data not saved then throw error
    if (!result._id)
      return res.status(500).json({ message: "Error", success: false });

    res.json({
      data: result,
      message: "Successfully created job",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Server side error",
      success: false,
    });
  }
};

exports.getAppliedUsers = async (req, res, next) => {
  try {
    const arrayCandidateId = await Apply.distinct("candidate", {
      recuiter: req.user.id,
    });
    console.log(arrayCandidateId);
    const candidates = await User.find({
      _id: { $in: arrayCandidateId },
    });
    console.log(candidates);
    res.status(200).json({
      message: "success",
      candidates,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getApplyHr = async (req, res, next) => {
  try {
    const applies = await Apply.find({ recuiter: req.user.id }).populate(
      "job candidate recuiter"
    );
    res.status(200).json({
      status: "success",
      applies,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getApplyCandidate = async (req, res, next) => {
  try {
    const applies = await Apply.find({ candidate: req.user.id }).populate(
      "job candidate recuiter"
    );
    res.status(200).json({
      status: "success",
      applies,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.processApply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateApply = await Apply.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      status: "success",
      updateApply,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
