require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const app = express();
app.use(cors());

// Connect MongoDB
connectDB();


// Middleware
// This allows Express to read JSON data from Postman
app.use(express.json());
app.use("/uploads", express.static("uploads"));


// Import Student Routes
const studentRoutes = require("./routes/studentRoutes");
// Import Auth Routes
const authRoutes = require("./routes/authRoutes");

// Student API Route
app.use("/api/students", studentRoutes);
// Auth API Route
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to CollegeAPI");
});


// About Route
app.get("/about", (req, res) => {
    res.send("About CollegeAPI");
});


// Contact Route
app.get("/contact", (req, res) => {
    res.send("Contact CollegeAPI");
});


// Error Handling Middleware
const errorHandler = require("./middleware/errorHandler");

app.use(errorHandler);


// Start Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});