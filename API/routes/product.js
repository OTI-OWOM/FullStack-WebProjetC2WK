const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');

const validateInputCreate = require('../middleware/validation/input-validator-create-car');
const passwordValidation = require('../middleware/validation/password-validator');

const carController = require('../controllers/cars/car');

// route to get a car
router.get('/car/:carId', authorize.jwtUserAuth,  checks.carCheck, carController.getOnecar);

// route to add a new car
router.post('/car', authorize.jwtUserAuth, authorize.sellerAuth ,validateInputCreate, carController.createCar);

// route to update a car
router.put('/car/:carId', authorize.jwtUserAuth, authorize.sellerAuth , checks.carCheck, passwordValidation, carController.modifyCar);

// route to delete a car
router.delete('/car/:carId', authorize.jwtUserAuth, authorize.sellerAuth , checks.carCheck, carController.deleteCar);

// route to get all cars
router.get('/cars/', authorize.jwtUserAuth, carController.getAllcars);

// route to get all cars of an user
router.get('/cars/:userId', authorize.jwtUserAuth, authorize.adminAuth, authorize.belongsToCompanyUser, checks.userCheck,  carController.getAllcarsFromUser);

// route to get all cars of a company
router.get('/cars/:companyId', authorize.jwtUserAuth, authorize.adminAuth, carController.getAllcarsFromCompany);

module.exports = router;
