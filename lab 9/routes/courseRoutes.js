// routes/courseRoutes.js
const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// @route   POST /api/courses
// @desc    Create a new course
router.post("/", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   GET /api/courses
// @desc    Get all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// @route   GET /api/courses/:id
// @desc    Get a single course by id
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch {
    res.status(400).json({ error: "Invalid course ID" });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update a course
router.put("/:id", async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Course not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch {
    res.status(400).json({ error: "Invalid course ID" });
  }
});

module.exports = router;
