const express = require('express');
const upload = require('../helpers/multer')

const router = express.Router();

const authorize = require('../middleware/authorize');
const validateInputCreate = require('../middleware/input-validator-create');
const validateInputCreateDetail = require('../middleware/input-validator-create-detail');
const passwordValidation = require('../middleware/password-validator');

const carController = require('../controllers/car');

// route to get a car
router.get('/car/:carId', authorize.JWTAthorization, authorize.adminOrCarUserAuth, carController.getOnecar);

// route to get all cars
router.get('/cars/', carController.getAllcars);

// route to get all brands
router.get('/brands/', carController.getAllBrands);

// route to get all models
router.get('/models/', carController.getAllModelbrand);

// route to get all cars of an user
router.get('/cars/:userId', authorize.JWTAthorization, authorize.adminOrUserAuth, carController.getAllcarsFromUser);

// route to add a new car
router.post('/car/create', authorize.JWTAthorization, validateInputCreate, carController.createcar);

// route to add a new car detail
router.post('/car/detail/:carId', authorize.JWTAthorization, authorize.adminOrCarUserAuth, validateInputCreateDetail, carController.createCarDetail);

// // route to add a new car detail
router.delete('/car/detail/:detailId', authorize.JWTAthorization, authorize.adminOrCarUserDetailAuth, carController.deleteCarDetail);

// route to get all car images
router.get('/car/images/:carId', authorize.JWTAthorization, carController.getImageURLs);

// route to add a new car image
router.post('/car/image/:carId', authorize.JWTAthorization, authorize.adminOrCarUserAuth, upload.array('images', 5), carController.uploadCarImages);

// route to get an Image
router.get('/car/image/:filename', authorize.JWTAthorization, carController.getImage);

// route to delete an Image
router.delete('/car/image/:imageId', authorize.JWTAthorization, authorize.adminOrCarUserImageAuth, carController.deleteImage);

// route to update a car
router.put('/car/:carId', authorize.JWTAthorization, authorize.adminOrCarUserAuth, passwordValidation, carController.modifycar);

// route to delete a car
router.delete('/car/:carId', authorize.JWTAthorization, authorize.adminOrCarUserAuth, carController.deletecar);

module.exports = router;
