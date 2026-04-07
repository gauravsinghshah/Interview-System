const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    companyName: { type: String, required: true },
    detail: { type: String, required: true },
    salaryMin: { type: Number, required: true },
    salaryMax: { type: Number, required: true },
    status: { type: String, default: "New" },
    postedBy: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
