const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');

const validateInputCreateDetail = require('../middleware/validation/input-validator-create-detail');

const detailController = require('../controllers/cars/car-details');


// route to add a new car detail
router.post('/car/detail/:carId', authorize.jwtUserAuth, checks.carCheck, validateInputCreateDetail, detailController.createCarDetail);

// // route to add a new car detail
router.delete('/car/detail/:detailId', authorize.jwtUserAuth, checks.detailCheck, detailController.deleteCarDetail);

module.exports = router;