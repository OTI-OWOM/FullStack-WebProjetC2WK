const express = require('express');

const router = express.Router();

const emailValidation = require('../middleware/validation/email-validator');
const passwordValidation = require('../middleware/validation/password-validator');
const authorize = require('../middleware/authorize');

const userController = require('../controllers/user/user');

// route to current user info
router.get('/me', authorize.jwtUserAuth, userController.getCurrentUser);

// route to current user info
router.get('/seller/verify', authorize.jwtUserAuth, userController.isSeller);

// route to current user info
router.put('/me', authorize.jwtUserAuth, emailValidation, passwordValidation, userController.modifyUser);

// route to current user info
router.delete('/me', authorize.jwtUserAuth, userController.deleteUser);

module.exports = router;
