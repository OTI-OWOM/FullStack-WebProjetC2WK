const express = require('express');
const upload = require('../helpers/multer')
const router = express.Router();
const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');

const imagesController = require('../controllers/cars/car-images');


// route to get all car images
router.get('/car/images/:carId', authorize.jwtUserAuth, imagesController.getImageURLs);

// route to add a new car image
router.post('/car/image/:carId', authorize.jwtUserAuth, checks.carCheck, authorize.sellerAuth, upload.uploadCar.array('images', 10), imagesController.uploadCarImages);

// route to get an Image
router.get('/car/image/:imageId', imagesController.getImage);

// route to delete an Image
router.delete('/car/image/:imageId', authorize.jwtUserAuth, checks.imageCheck, authorize.sellerAuth, imagesController.deleteImage);

module.exports = router;
