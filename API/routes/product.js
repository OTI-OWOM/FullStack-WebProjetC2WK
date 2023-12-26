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
router.post('/car/detail/create', authorize.JWTAthorization, validateInputCreateDetail, carController.createcardetail);

// route to add a new car image
router.post('/car/uploadImage/:carId', authorize.JWTAthorization, authorize.adminOrCarUserAuth, upload.array('images', 5), carController.uploadCarImages);

// route to get all car images
router.get('/car/getCarImages/:carId', authorize.JWTAthorization, carController.getImageURLs);

// route to get an Image
router.get('/car/getImage/:filename', authorize.JWTAthorization, carController.getImage);

// route to update a car
router.put('/car/:carId', authorize.JWTAthorization, authorize.adminOrCarUserAuth, passwordValidation, carController.modifycar);

// route to delete a car
router.delete('/car/:carId', authorize.JWTAthorization, authorize.adminOrCarUserAuth, carController.deletecar);

module.exports = router;
