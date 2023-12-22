const express = require('express');
const upload = require('../helpers/multer')

const router = express.Router();

const authorize = require('../middleware/authorize');
const validateInputCreate = require('../middleware/input-validator-create');
const validateInputCreateDetail = require('../middleware/input-validator-create-detail');
const validateInputUpdate = require('../middleware/input-validator-update');

const carController = require('../controllers/car');

// route to get a car
router.get('/car/:id', authorize, carController.getOnecar);

// route to get all cars
router.get('/cars/', carController.getAllcars);

// route to get all brands
router.get('/brands/', carController.getAllBrands);

// route to get all models
router.get('/models/', carController.getAllModelbrand);

// route to get all cars of an user
router.get('/cars/:user', carController.getAllcarsFromUser);

// route to add a new car
router.post('/car/create', authorize, validateInputCreate, carController.createcar);

// route to add a new car detail
router.post('/car/detail/create', authorize, validateInputCreateDetail, carController.createcardetail);

// route to add a new car image
router.post('/car/uploadImage/:id', authorize, upload.array('images', 5), carController.uploadCarImages);

// route to update a car
router.put('/car/:id', authorize, validateInputUpdate, carController.modifycar);

// route to delete a car
router.delete('/car/:id', authorize, carController.deletecar);

module.exports = router;
