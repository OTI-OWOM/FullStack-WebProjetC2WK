const express = require('express');

const router = express.Router();

const emailValidation = require('../middleware/email-validator');
const passwordValidation = require('../middleware/password-validator');
const authorize = require('../middleware/authorize');

const userController = require('../controllers/user');

// route to sign up
router.post('/register', emailValidation, passwordValidation, userController.register);

// route to login
router.post('/login', userController.login);

// route to current user info
router.get('/me', authorize.JWTAthorization, userController.getCurrentUser);

// route to all users
router.get('/users', authorize.JWTAthorization, authorize.adminAuth, userController.getAllUsers);

// route to get data from a specific user
router.get('/user/:userId', authorize.JWTAthorization, authorize.adminOrUserAuth, userController.getOneUser);

// route to modify a user
router.put('/user/:userId', authorize.JWTAthorization, authorize.adminOrUserAuth, emailValidation, passwordValidation, userController.modifyUser);

// route to delete data from a specific user
router.delete('/user/:userId', authorize.JWTAthorization, authorize.adminOrUserAuth, userController.deleteUser);

module.exports = router;
