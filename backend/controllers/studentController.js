
const Student = require("../models/Student");
// GET all students
const getStudents = async (req, res) => {

    try {

        const students = await Student.find().sort({ id: 1 });

        res.status(200).json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// POST create new student
const createStudent = async (req, res) => {

    try {

        // Check data coming from Postman
        console.log("Received Data:", req.body);
        const existingStudent = await Student.findOne({
            id: req.body.id
        });
        
        if (existingStudent) {
            return res.status(400).json({
                message: "Student ID already exists"
            });
        }

        const student = new Student({
            id: req.body.id,
            name: req.body.name,
            gender: req.body.gender
        });

        const savedStudent = await student.save();

        res.status(201).json(savedStudent);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};// UPDATE student
const updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );


        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });

        }


        res.json(student);


    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({
            id: req.params.id
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};