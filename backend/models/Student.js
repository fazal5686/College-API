const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    name: {
        type: String,
        required: true,
        trim: true,
    },

    gender: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        required: true,
    },

    class: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
    },

    address: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = mongoose.model("Student", studentSchema);