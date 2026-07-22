const Student = require("../models/Student");
const asyncHandler = require("../utils/asyncHandler");


// GET all students
const getStudents = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const search = req.query.search || "";

    console.log("SEARCH VALUE:", search);

    const skip = (page - 1) * limit;

    const query = {};

    if (search) {

        query.$or = [

            {
                name: {
                    $regex: search,
                    $options: "i"
                }
            },

            {
                gender: {
                    $regex: `^${search}$`,
                    $options: "i"
                }
            }

        ];

        if (!isNaN(search)) {

            query.$or.push({
                id: Number(search)
            });

        }

    }

    const totalStudents = await Student.countDocuments(query);

    const students = await Student.find(query)
        .sort({ id: 1 })
        .skip(skip)
        .limit(limit);

    res.status(200).json({

        success: true,

        message: "Students fetched successfully",

        data: {

            students,

            totalStudents,

            currentPage: page,

            totalPages: Math.ceil(totalStudents / limit)

        }

    });

});


// GET student by ID
const getStudentById = asyncHandler(async (req, res) => {

    const student = await Student.findById(req.params.id);

    if (!student) {

        return res.status(404).json({

            success: false,

            message: "Student not found"

        });

    }

    res.status(200).json({

        success: true,

        message: "Student found",

        data: student

    });

});


// POST create new student
const createStudent = asyncHandler(async (req, res) => {
    console.log("BODY:", req.body);
console.log("FILE:", req.file);

    const existingStudent = await Student.findOne({
        id: req.body.id
    });

    if (existingStudent) {

        return res.status(400).json({

            success: false,

            message: "Student ID already exists"

        });

    }

    const student = new Student({

        id: req.body.id,

        name: req.body.name,

        gender: req.body.gender,

        age: req.body.age,

        class: req.body.class,

        email: req.body.email,

        phone: req.body.phone,

        address: req.body.address,

        photo: req.file ? req.file.path : ""

    });

    const savedStudent = await student.save();

    res.status(201).json({

        success: true,

        message: "Student created successfully",

        data: savedStudent

    });

});


// UPDATE student
const updateStudent = asyncHandler(async (req, res) => {

    if (req.file) {

        req.body.photo = req.file.path;

    }

    const student = await Student.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
            new: true
        }

    );

    if (!student) {

        return res.status(404).json({

            success: false,

            message: "Student not found"

        });

    }

    res.status(200).json({

        success: true,

        message: "Student updated successfully",

        data: student

    });

});


// DELETE student
const deleteStudent = asyncHandler(async (req, res) => {

    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {

        return res.status(404).json({

            success: false,

            message: "Student not found"

        });

    }

    res.status(200).json({

        success: true,

        message: "Student deleted successfully",

        data: student

    });

});


module.exports = {

    getStudents,

    getStudentById,

    createStudent,

    updateStudent,

    deleteStudent

};