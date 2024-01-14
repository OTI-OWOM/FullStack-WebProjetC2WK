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
router.get('/car/:carId', authorize.jwtUserAuth, checks.carCheck, carController.getOnecar);

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
router.get('/company/cars/:companyId', authorize.jwtUserAuth, authorize.adminAuth, carController.getAllcarsFromCompany);

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
router.get('/models/:brandId', authorize.jwtUserAuth, brandController.getAllModelbrand);

module.exports = router;
