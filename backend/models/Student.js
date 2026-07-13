const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: [true, "Student ID is required"],
        unique: true,
        min: [1, "Student ID must be greater than 0"]
    },

    name: {
        type: String,
        required: [true, "Student Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },

    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: {
            values: ["Male", "Female"],
            message: "Gender must be Male or Female"
        }
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);