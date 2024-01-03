const express = require('express');
const upload = require('../helpers/multer')
const router = express.Router();
const authorize = require('../middleware/authorize');

const validateInputCreate = require('../middleware/input-validator-create');
const validateInputCreateDetail = require('../middleware/input-validator-create-detail');
const passwordValidation = require('../middleware/password-validator');

const imagesController = require('../controllers/car-images');


// route to get all car images
router.get('/car/images/:carId', authorize.JWTAthorization, imagesController.getImageURLs);

// route to add a new car image
router.post('/car/image/:carId', authorize.JWTAthorization, authorize.carCheck, authorize.adminOrUserCheck, upload.array('images', 10), imagesController.uploadCarImages);

// route to get an Image
router.get('/car/image/:imageId', imagesController.getImage);

// route to delete an Image
router.delete('/car/image/:imageId', authorize.JWTAthorization, authorize.imageCheck, authorize.carCheck, authorize.adminOrUserCheck, imagesController.deleteImage);

module.exports = router;
