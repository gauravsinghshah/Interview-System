const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const Job = require("./models/Job");
const Application = require("./models/Application");
const Interview = require("./models/Interview");
const { auth, isRecruiter } = require("./middleware/auth");

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

app.use(express.json());
app.use(cors());

const dbUser = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@interview-system-db.wlkjqix.mongodb.net/interview-system-db?appName=Interview-system-db`,
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/jobs", auth, isRecruiter, async (req, res) => {
  try {
    const jobData = { ...req.body, postedBy: req.user.userId };
    const newJob = new Job(jobData);
    await newJob.save();
    return res.status(201).json(newJob);
  } catch (error) {
    console.error("Job post error:", error);
    return res.status(500).json({ error: "Failed to post job" });
  }
});

app.get("/api/jobs", auth, async (req, res) => {
  try {
    const { postedBy, me } = req.query;
    let query = {};
    if (me === "true") {
      query.postedBy = req.user.userId;
    } else if (postedBy) {
      query.postedBy = postedBy;
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Fetch jobs error:", error);
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.post("/api/applications", auth, async (req, res) => {
  try {
    const {
      jobId,
      applicationSkills,
      applicationNotes,
      exp,
      resumeUrl,
      githubUrl,
    } = req.body;
    const existing = await Application.findOne({
      jobId,
      studentId: req.user.userId,
    });
    if (existing) {
      return res.status(400).json({ error: "Already applied" });
    }
    const newApp = new Application({
      jobId,
      studentId: req.user.userId,
      status: "Pending",
      rating: Math.floor(Math.random() * 20) + 75,
      exp: exp || "2 Yrs",
      resumeUrl: resumeUrl || "",
      githubUrl: githubUrl || "",
      applicationSkills: applicationSkills || [],
      applicationNotes: applicationNotes || "",
    });
    await newApp.save();
    return res.status(201).json(newApp);
  } catch (error) {
    console.error("Apply error:", error);
    return res.status(500).json({ error: "Failed to apply" });
  }
});

app.get("/api/applications/student/me", auth, async (req, res) => {
  try {
    const applications = await Application.find({
      studentId: req.user.userId,
    }).populate("jobId", "role companyName location type skills requiredExp");
    return res.status(200).json(applications);
  } catch (error) {
    console.error("Fetch my applications error:", error);
    return res.status(500).json({ error: "Failed to fetch my applications" });
  }
});

app.delete("/api/applications/:id", auth, async (req, res) => {
  try {
    const appInfo = await Application.findById(req.params.id);
    if (!appInfo) return res.status(404).json({ error: "Not found" });
    if (appInfo.studentId.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await Application.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Application revoked" });
  } catch (error) {
    console.error("Delete application error:", error);
    return res.status(500).json({ error: "Failed to delete" });
  }
});

app.get("/api/applications/:jobId", auth, isRecruiter, async (req, res) => {
  try {
    const applications = await Application.find({
      jobId: req.params.jobId,
    }).populate(
      "studentId",
      "name email bio skills resumeUrl githubUrl experience",
    );
    return res.status(200).json(applications);
  } catch (error) {
    console.error("Fetch applications error:", error);
    return res.status(500).json({ error: "Failed to fetch applications" });
  }
});

app.post("/api/interviews", auth, isRecruiter, async (req, res) => {
  try {
    const { jobId, studentId, date, time, link } = req.body;
    const newInterview = new Interview({
      jobId,
      studentId,
      recruiterId: req.user.userId,
      date,
      time,
      link,
    });
    await newInterview.save();

    await Application.findOneAndUpdate(
      { jobId, studentId },
      { status: "Screening" },
    );

    return res.status(201).json(newInterview);
  } catch (error) {
    console.error("Schedule interview error:", error);
    return res.status(500).json({ error: "Failed to schedule interview" });
  }
});

app.get("/api/interviews", auth, async (req, res) => {
  try {
    const query =
      req.user.role === "student"
        ? { studentId: req.user.userId }
        : { recruiterId: req.user.userId };
    const interviews = await Interview.find(query)
      .populate("jobId")
      .populate("studentId", "name")
      .populate("recruiterId", "name");
    return res.status(200).json(interviews);
  } catch (error) {
    console.error("Fetch interviews error:", error);
    return res.status(500).json({ error: "Failed to fetch interviews" });
  }
});

app.get("/api/users/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
});

app.put("/api/users/profile", auth, async (req, res) => {
  try {
    const { bio, skills, resumeUrl, githubUrl, experience } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { bio, skills, resumeUrl, githubUrl, experience },
      { new: true },
    ).select("-password");
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update profile" });
  }
});

app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(201).json({
      message: "User created successfully",
      role: newUser.role,
      name: newUser.name,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ error: "Server error during signup", details: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    if (user.role !== role) {
      return res.status(403).json({
        error: `Account exists but is registered as a ${user.role}, not a ${role}.`,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(200).json({
      message: "Logged in successfully",
      role: user.role,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: "Server error during login", details: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
