const express = require("express");
const connectDB = require("./db");

const app = express();


// Connect MongoDB
connectDB();


// Middleware
// This allows Express to read JSON data from Postman
app.use(express.json());


// Import Student Routes
const studentRoutes = require("./routes/studentRoutes");


// Student API Route
app.use("/students", studentRoutes);


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


// Start Server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});