const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/cars');
    },
    filename: function (req, file, cb) {
        // Generating a new filename with the appropriate file extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/companies');
    },
    filename: function (req, file, cb) {
        // Generating a new filename with the appropriate file extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


exports.uploadCar = multer({ storage: storage });
exports.uploadCompany = multer({ storage: storage2 });
