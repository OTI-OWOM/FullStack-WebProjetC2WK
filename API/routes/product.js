const express = require('express');

const router = express.Router();

const authorize = require('../middleware/authorize');
const validateInput = require('../middleware/input-validator');

const carController = require('../controllers/car');

// route to get a car
router.get('/car/:id', authorize, carController.getOnecar);

// route to get all cars
router.get('/cars/', carController.getAllcars);

// route to get all cars of an user
router.get('/cars/:user', carController.getAllcarsFromUser);

// route to add a new car
router.post('/car/create', authorize, validateInput, carController.createcar);

// route to update a car
router.put('/car/:id', authorize, validateInput, carController.modifycar);

// route to delete a car
router.delete('/car/:id', authorize, carController.deletecar);

module.exports = router;
