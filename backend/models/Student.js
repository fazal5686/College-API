const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
{
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
        enum: ["Male", "Female"],
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
        unique: true,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 11,
        maxlength: 11,
    },

    address: {
        type: String,
        required: true,
        trim: true,
    },
    photo: {
        type: String,
        default: ""
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Student", studentSchema);