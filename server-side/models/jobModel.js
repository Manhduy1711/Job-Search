const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  salaryRange: {
    type: String,
    required: true,
  },
  quantity: Number,
  company: String,
  description: String,
  require: String,
  benefit: String,
  experience: String,
  level: String,
  status: {
    type: String,
    enum: ["Đang xét duyệt", "Đã duyệt", "Đã từ chối"],
    default: "Đang xét duyệt",
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
