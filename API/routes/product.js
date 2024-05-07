const express = require('express');
const router = express.Router();
const upload = require('../helpers/multer')
const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');

const validateInputCreate = require('../middleware/validation/input-validator-create-car');
const passwordValidation = require('../middleware/validation/password-validator');
const validateInputCreateDetail = require('../middleware/validation/input-validator-create-detail');

const carController = require('../controllers/cars/car');
const imagesController = require('../controllers/cars/car-images');
const detailController = require('../controllers/cars/car-details');
const brandController = require('../controllers/cars/car-brands');


// ----------------------------- Cars -----------------------------
// route to get a car
router.get('/car/:carId', authorize.jwtUserAuth, checks.carCheck, carController.getOneCar);

// route to add a new car
router.post('/car', authorize.jwtUserAuth, authorize.sellerAuth ,validateInputCreate, carController.createCar);

// route to update a car
router.put('/car/:carId', authorize.jwtUserAuth, authorize.sellerAuth , checks.carCheck, passwordValidation, carController.modifyCar);

// route to delete a car
router.delete('/car/:carId', authorize.jwtUserAuth, authorize.sellerAuth , checks.carCheck, carController.deleteCar);

// route to get all cars
router.get('/cars/', authorize.jwtUserAuth, carController.getAllCars);

// route to get all cars of an user
router.get('/cars/all/:userId', authorize.jwtUserAuth, authorize.adminOrSelfAuth, authorize.belongsToCompanyUser, checks.userCheck,  carController.getAllCarsFromUser);

// route to get all cars of an user
router.get('/cars/self/all', authorize.jwtUserAuth, authorize.adminOrSelfAuth, carController.getAllCarsFromSelf);

// route to get all cars of a company
router.get('/company/cars/:companyId', authorize.jwtUserAuth, authorize.adminAuth, carController.getAllCarsFromCompany);

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
router.get('/brands', authorize.jwtUserAuth, brandController.getAllBrands);

// route to get all models
router.get('/models/:brandId', authorize.jwtUserAuth, brandController.getAllModelBrand);

module.exports = router;
