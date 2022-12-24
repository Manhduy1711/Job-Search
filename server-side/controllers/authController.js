const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    res.json({
      status: "success",
      newUser,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json({
        status: "fail",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (
      !user ||
      !(await user.correctPassword(password, user.password)) ||
      user.active != true
    ) {
      res.json({
        status: "fail",
        message: " 2",
      });
    }

    const token = signToken(user.id);
    user.password = undefined;
    res.json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {}
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) res.status(404).json({ status: "fail" });
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      res.status(400).json({
        status: "fail",
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(400).json({
        status: "fail",
        message: "hr",
      });
    }

    next();
  };
};

exports.isLognedIn = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.json({
        isLogedIn: false,
      });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      res.json({
        isLogedIn: false,
      });
    }
    res.json({
      isLogedIn: true,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      isLogedIn: true,
      message: err.message,
    });
  }
};
