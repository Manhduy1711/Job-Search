const Job = require("../models/jobModel");
const User = require("../models/userModel");

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().populate("favoriteJobs");
    res.json({
      status: "success",
      users,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const id = req.params.id || req.user.id;
    const user = await User.findById(id).populate("createdJobs");
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.UpdateOne = async (req, res, next) => {
  try {
    const id = req.params.id || req.user._id;
    if (
      req.body.password ||
      req.body.passwordConfirm ||
      req.body.name ||
      req.body.email
    ) {
      res.status(400).json({
        status: "fail",
        message: "Not allowed fields",
      });
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      user: updateUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.disableOne = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { active: false });
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.addFavoriteJob = async (req, res, next) => {
  try {
    const id = req.user.id;
    const job = await Job.findOne({ _id: req.params.id });
    if ((await User.find({ favoriteJobs: job._id })).length !== 0) {
      throw Error("error");
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $push: { favoriteJobs: job._id },
        // $set: { favoriteJobs: [] },
      }
    );
    res.status(200).json({
      status: "success",
      updateUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteFavoriteJob = async (req, res, next) => {
  try {
    const id = req.user.id;
    const job = await Job.findOne({ _id: req.params.id });
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { favoriteJobs: job._id },
        // $set: { favoriteJobs: [] },
      }
    );
    res.status(200).json({
      status: "success",
      updateUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
