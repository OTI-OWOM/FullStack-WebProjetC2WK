const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

const validateInputCreateDetail = require('../middleware/input-validator-create-detail');

const detailController = require('../controllers/car-details');


// route to add a new car detail
router.post('/car/detail/:carId', authorize.JWTAthorization, authorize.carCheck, authorize.adminOrUserCheck, validateInputCreateDetail, detailController.createCarDetail);

// // route to add a new car detail
router.delete('/car/detail/:detailId', authorize.JWTAthorization, authorize.detailCheck, authorize.carCheck, authorize.adminOrUserCheck, detailController.deleteCarDetail);

module.exports = router;