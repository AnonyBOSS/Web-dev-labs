// server.js
const express = require("express");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB   
mongoose.connect("mongodb://127.0.0.1:27017/courseAPI")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
  });

// Mount the routes
app.use("/api/courses", courseRoutes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
