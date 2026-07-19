const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register User
const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Check existing user
        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "Email already registered"

            });

        }


        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(
            password,
            salt
        );


        // Create user
        const user = await User.create({

            name,

            email,

            password: hashedPassword

        });


        res.status(201).json({

            success: true,

            message: "User registered successfully",

            data: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });


    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};
// Login User
const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Find user
        const user = await User.findOne({
            email
        });


        if (!user) {

            return res.status(400).json({

                success: false,

                message: "Invalid email or password"

            });

        }


        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordMatch) {

            return res.status(400).json({

                success: false,

                message: "Invalid email or password"

            });

        }


        // Create JWT Token
        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRE
            }

        );


        res.status(200).json({

            success: true,

            message: "Login successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });


    } catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};

module.exports = {
    registerUser,
    loginUser
};