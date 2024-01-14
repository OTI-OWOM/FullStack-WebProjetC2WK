const express = require('express');

const router = express.Router();

const emailValidation = require('../middleware/email-validator');
const passwordValidation = require('../middleware/password-validator');
const authorize = require('../middleware/authorize');

const authController = require('../controllers/auth');

// route to sign up
router.post('/register', emailValidation, passwordValidation, authController.registerUser);

// route to sign up
router.post('/admin/register', emailValidation, passwordValidation, authController.registerAdmin);

// route to login
router.post('/login', authController.login);

module.exports = router;
