const express = require('express');
const router = express.Router();
const upload = require('../services/multerService')
const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');

const validateInputCreate = require('../middleware/validation/input-validator-create-car');
const passwordValidation = require('../middleware/validation/password-validator');
const validateInputCreateDetail = require('../middleware/validation/input-validator-create-detail');

const productController = require('../controllers/product');


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
router.get('/car/images/:carId', authorize.jwtUserAuth, productController.productImage.getImageURLs);

// route to add a new car image
router.post('/car/image/:carId', authorize.jwtUserAuth, checks.carCheck, authorize.sellerAuth, upload.uploadCar.array('images', 10), productController.productImage.uploadCarImages);

// route to get an Image
router.get('/car/image/:imageId', productController.productImage.getImage);

// route to delete an Image
router.delete('/car/image/:imageId', authorize.jwtUserAuth, checks.imageCheck, authorize.sellerAuth, productController.productImage.deleteImage);

// ----------------------------- Details -----------------------------
// route to add a new car detail
router.post('/car/detail/:carId', authorize.jwtUserAuth, checks.carCheck, validateInputCreateDetail, productController.productDetail.createCarDetail);

// // route to add a new car detail
router.delete('/car/detail/:detailId', authorize.jwtUserAuth, checks.detailCheck, productController.productDetail.deleteCarDetail);

// ----------------------------- Brands -----------------------------
// route to get all brands
router.get('/car/brands/all', authorize.jwtUserAuth, productController.productBrand.getAllBrands);

// route to get all models
router.get('/car/models/:brandId', authorize.jwtUserAuth, productController.productBrand.getAllModelBrand);

module.exports = router;
