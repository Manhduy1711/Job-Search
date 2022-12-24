const User = require("../models/userModel");
const Job = require("../models/jobModel");

exports.getAllJob = async (req, res, next) => {
  try {
    const queryObject = { ...req.query };
    const excludeFields = ["page", "sort", "limt"];
    excludeFields.forEach((el) => delete queryObject[el]);

    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Job.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    query = query.select("-v");

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const jobs = await query;
    res.json({
      status: "success",
      jobs,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getAcceptedJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({
      data: "Đã duyệt",
    }).sort("-createdAt");
    res.status(200).json({
      status: "success",
      jobs,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getResultSearch = async (req, res, next) => {
  try {
    const searchTerms = req.body.searchTerms;
    const jobs = await Job.find({
      title: { $regex: ".*" + searchTerms + ".*" },
    });
    res.status(200).json({
      status: "success",
      jobs,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getOneJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate("createdBy");

    res.json({
      status: "success",
      job,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.json({
      status: "success",
      user,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const newJob = new Job(req.body);
    await newJob.save();
    await User.findByIdAndUpdate(
      { _id: currentUser._id },
      { $push: { createdJobs: newJob._id } }
    );
    await Job.findByIdAndUpdate(
      { _id: newJob._id },
      { createdBy: currentUser._id }
    );
    res.json({
      status: "success",
      data: {
        newJob,
        currentUser,
      },
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const id = req.params.id;

    const jobUpdate = await Job.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      status: "success",
      jobUpdate,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
