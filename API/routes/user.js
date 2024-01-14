const express = require('express');

const router = express.Router();

const emailValidation = require('../middleware/email-validator');
const passwordValidation = require('../middleware/password-validator');
const authorize = require('../middleware/authorize');

const userController = require('../controllers/user');

// route to current user info
router.get('/me', authorize.JWTAthorization, userController.getCurrentUser);

// route to current user info
router.put('/me', authorize.JWTAthorization, emailValidation, passwordValidation, userController.modifyUser);

// route to current user info
router.delete('/me', authorize.JWTAthorization, userController.deleteUser);



// route to all users
// router.get('/users', authorize.JWTAthorization, authorize.adminAuth, userController.getAllUsers);

// route to get data from a specific user
// router.get('/user/:userId', authorize.JWTAthorization, authorize.adminOrUserCheck, userController.getOneUser);

// route to modify a user
// router.put('/user/:userId', authorize.JWTAthorization, authorize.adminOrUserCheck, emailValidation, passwordValidation, userController.modifyUser);

// route to delete data from a specific user
// router.delete('/user/:userId', authorize.JWTAthorization, authorize.adminOrUserCheck, userController.deleteUser);

module.exports = router;
