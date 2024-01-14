const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize');

const brandController = require('../controllers/cars/car-brands');


// route to get all brands
router.get('/brands', authorize.jwtUserAuth, authorize.superAdminAuth, brandController.getAllBrands);

// route to get all models
router.get('/models/:brandId', authorize.jwtUserAuth, authorize.superAdminAuth, brandController.getAllModelbrand);

module.exports = router;