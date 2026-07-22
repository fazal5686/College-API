const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(null, "uploads/students");

    },


    filename: function(req, file, cb) {

        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );

    }

});


const upload = multer({

    storage: storage,

    limits: {
        fileSize: 2 * 1024 * 1024
    },


    fileFilter: function(req, file, cb) {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ];


        if (allowedTypes.includes(file.mimetype)) {

            cb(null, true);

        } else {

            cb(
                new Error("Only JPG, JPEG and PNG images are allowed"),
                false
            );

        }

    }

});


module.exports = upload;