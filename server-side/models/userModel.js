const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  age: { type: Number, default: 20 },
  gender: {
    type: String,
    enum: ["nam", "nữ"],
  },
  photoCover: {
    type: String,
    default:
      "https://cdn.searchenginejournal.com/wp-content/uploads/2017/06/shutterstock_268688447.jpg",
  },
  photo: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/012/717/409/small_2x/camera-pink-icon-flat-sign-vector.jpg",
  },
  numberPhone: { type: String, default: "Đang cập nhập" },
  address: { type: String, default: "Đang cập nhập" },
  education: {
    type: String,
    default: "Đang cập nhập",
  },
  skills: { type: String, default: "Đang cập nhập" },
  description: { type: String, default: "Đang cập nhập" },
  role: {
    type: String,
    default: "candidate",
    enum: ["admin", "hr", "candidate"],
  },
  experience: Number,
  passwordConfirm: {
    type: String,
    validator: function (el) {
      return this.password === el;
    },
  },
  createdJobs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
  ],
  favoriteJobs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } });
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
