const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

const brandController = require('../controllers/car-brands');


// route to get all brands
router.get('/brands', authorize.JWTAthorization, brandController.getAllBrands);

// route to get all models
router.get('/models/:brandId', authorize.JWTAthorization, brandController.getAllModelbrand);

module.exports = router;