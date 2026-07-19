const { body, validationResult } = require("express-validator");

// Validation rules
const studentValidationRules = [

    body("id")
        .isInt({ min: 1 })
        .withMessage("Student ID must be a positive number"),

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("gender")
        .isIn(["Male", "Female"])
        .withMessage("Gender must be Male or Female"),

    body("age")
        .isInt({ min: 5, max: 100 })
        .withMessage("Age must be between 5 and 100"),

    body("class")
        .trim()
        .notEmpty()
        .withMessage("Class is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid email address"),

    body("phone")
        .isLength({ min: 11, max: 11 })
        .withMessage("Phone number must contain exactly 11 digits"),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required")

];

// Middleware
const validateStudent = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array()
        });

    }

    next();

};

module.exports = {
    studentValidationRules,
    validateStudent
};