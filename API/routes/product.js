const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

const validateInputCreate = require('../middleware/input-validator-create-car');
const passwordValidation = require('../middleware/password-validator');

const carController = require('../controllers/car');

// route to get a car
router.get('/car/:carId', authorize.JWTAthorization, authorize.carCheck, authorize.adminOrUserCheck, carController.getOnecar);

// route to get all cars
router.get('/cars/', authorize.JWTAthorization, carController.getAllcars);

// route to get all cars of an user
router.get('/cars/:userId', authorize.JWTAthorization, authorize.adminOrUserCheck, carController.getAllcarsFromUser);

// route to add a new car
router.post('/car/create', authorize.JWTAthorization, validateInputCreate, carController.createCar);

// route to update a car
router.put('/car/:carId', authorize.JWTAthorization, authorize.carCheck, authorize.adminOrUserCheck, passwordValidation, carController.modifyCar);

// route to delete a car
router.delete('/car/:carId', authorize.JWTAthorization, authorize.carCheck, authorize.adminOrUserCheck, carController.deleteCar);

module.exports = router;
