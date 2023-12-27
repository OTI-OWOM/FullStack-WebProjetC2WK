const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

const validateInputCreate = require('../middleware/input-validator-create');
const validateInputCreateDetail = require('../middleware/input-validator-create-detail');
const passwordValidation = require('../middleware/password-validator');

const brandController = require('../controllers/car-brands');


// route to get all brands
router.get('/brands/', authorize.JWTAthorization, brandController.getAllBrands);

// route to get all models
router.get('/models/', authorize.JWTAthorization, brandController.getAllModelbrand);

module.exports = router;