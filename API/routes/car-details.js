const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

const validateInputCreate = require('../middleware/input-validator-create');
const validateInputCreateDetail = require('../middleware/input-validator-create-detail');
const passwordValidation = require('../middleware/password-validator');

const detailController = require('../controllers/car-details');


// route to add a new car detail
router.post('/car/detail/:carId', authorize.JWTAthorization, authorize.adminOrCarUserAuth, validateInputCreateDetail, detailController.createCarDetail);

// // route to add a new car detail
router.delete('/car/detail/:detailId', authorize.JWTAthorization, authorize.adminOrCarUserDetailAuth, detailController.deleteCarDetail);

module.exports = router;