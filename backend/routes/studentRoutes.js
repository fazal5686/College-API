const express = require("express");
const {
    studentValidationRules,
    validateStudent
} = require("../validators/studentValidator");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");
// protect all students routes.
router.use(protect);
router.get("/", getStudents);

router.get("/:id", getStudentById);

router.post(
    "/",
    authorize("admin"),
    upload.single("photo"),
    studentValidationRules,
    validateStudent,
    createStudent
);

router.put(
    "/:id",
    authorize("admin"),
    studentValidationRules,
    validateStudent,
    updateStudent
);
router.delete(
    "/:id",
    authorize("admin"),
    deleteStudent
);


module.exports = router;