const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "recruiter"], required: true },
  bio: { type: String, default: "" },
  skills: { type: [String], default: [] },
  resumeUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  experience: { type: String, default: "0 Yrs" },
});

module.exports = mongoose.model("User", userSchema);
