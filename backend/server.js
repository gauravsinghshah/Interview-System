const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Job = require("./models/Job");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/interview-system-db")
  .then(() => console.log("Connected to local MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/jobs", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    return res.status(201).json(newJob);
  } catch (error) {
    console.error("Job post error:", error);
    return res.status(500).json({ error: "Failed to post job" });
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const { postedBy } = req.query;
    const query = postedBy ? { postedBy } : {};
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Fetch jobs error:", error);
    return res.status(500).json({ error: "Failed to fetch jobs" });
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
    return res.status(201).json({
      message: "User created successfully",
      role: newUser.role,
      name: newUser.name,
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

    return res.status(200).json({
      message: "Logged in successfully",
      role: user.role,
      name: user.name,
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
