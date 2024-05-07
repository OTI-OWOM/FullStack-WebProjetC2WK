const express = require('express');
const router = express.Router();
const upload = require('../services/multerService')
const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');

const validateInputCreate = require('../middleware/validation/input-validator-create-car');
const passwordValidation = require('../middleware/validation/password-validator');
const validateInputCreateDetail = require('../middleware/validation/input-validator-create-detail');

const productController = require('../controllers/product');
const imagesController = require('../controllers/product/product-image');
const detailController = require('../controllers/product/product-detail');
const brandController = require('../controllers/product/product-brand');


// ----------------------------- Cars -----------------------------
// route to get a car
router.get('/car/:carId', authorize.jwtUserAuth, checks.carCheck, productController.getOneCar);

// route to add a new car
router.post('/car', authorize.jwtUserAuth, authorize.sellerAuth ,validateInputCreate, productController.createCar);

// route to update a car
router.put('/car/:carId', authorize.jwtUserAuth, authorize.sellerAuth , checks.carCheck, passwordValidation, productController.modifyCar);

// route to delete a car
router.delete('/car/:carId', authorize.jwtUserAuth, authorize.sellerAuth , checks.carCheck, productController.deleteCar);

// route to get all cars
router.get('/cars/', authorize.jwtUserAuth, productController.getAllCars);

// route to get all cars of an user
router.get('/cars/all/:userId', authorize.jwtUserAuth, authorize.adminOrSelfAuth, checks.userCheck,  productController.getAllCarsFromUser);

// route to get all cars of an user
router.get('/cars/self/all', authorize.jwtUserAuth, authorize.adminOrSelfAuth, productController.getAllCarsFromSelf);

// ----------------------------- Images -----------------------------
// route to get all car images
router.get('/car/images/:carId', authorize.jwtUserAuth, imagesController.getImageURLs);

// route to add a new car image
router.post('/car/image/:carId', authorize.jwtUserAuth, checks.carCheck, authorize.sellerAuth, upload.uploadCar.array('images', 10), imagesController.uploadCarImages);

// route to get an Image
router.get('/car/image/:imageId', imagesController.getImage);

// route to delete an Image
router.delete('/car/image/:imageId', authorize.jwtUserAuth, checks.imageCheck, authorize.sellerAuth, imagesController.deleteImage);

// ----------------------------- Details -----------------------------
// route to add a new car detail
router.post('/car/detail/:carId', authorize.jwtUserAuth, checks.carCheck, validateInputCreateDetail, detailController.createCarDetail);

// // route to add a new car detail
router.delete('/car/detail/:detailId', authorize.jwtUserAuth, checks.detailCheck, detailController.deleteCarDetail);

// ----------------------------- Brands -----------------------------
// route to get all brands
router.get('/car/brands/all', authorize.jwtUserAuth, brandController.getAllBrands);

// route to get all models
router.get('/car/models/:brandId', authorize.jwtUserAuth, brandController.getAllModelBrand);

module.exports = router;
