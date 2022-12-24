const mongoose = require("mongoose");
const applySchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    candidate: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    recuiter: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Đang xét duyệt",
    },
    appliedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Apply = new mongoose.model("Apply", applySchema);
module.exports = Apply;
