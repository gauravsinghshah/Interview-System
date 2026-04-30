const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Screening", "Interviewed", "Offer Ready", "Rejected"],
      default: "Pending",
    },
    rating: {
      type: Number,
      default: 0,
    },
    exp: {
      type: String,
      default: "0 Yrs",
    },
    resumeUrl: {
      type: String,
      default: "",
    },
    githubUrl: {
      type: String,
      default: "",
    },
    applicationSkills: {
      type: [String],
      default: [],
    },
    applicationNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
