const express = require('express');

const router = express.Router();

const emailValidation = require('../middleware/validation/email-validator');
const passwordValidation = require('../middleware/validation/password-validator');
const userValidation = require('../middleware/validation/input-validator-create-user');
const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');
const authController = require('../controllers/users/auth');

// route to sign up
router.post('/register', userValidation, emailValidation, passwordValidation, authController.registerUser);

// route to sign up
router.post('/register/seller/:companyId',authorize.jwtUserAuth, authorize.adminAuth, userValidation, emailValidation, passwordValidation, authController.registerUser);

// route to sign up
router.post('/register/admin/:companyId', authorize.jwtUserAuth, authorize.adminAuth, emailValidation, passwordValidation, authController.registerAdmin);

// route to sign up
router.post('/register/super/admin/', authorize.jwtUserAuth, authorize.superAdminAuth, emailValidation, passwordValidation, authController.registerSuperAdmin);

// route to login
router.post('/login', userValidation, emailValidation, passwordValidation, authController.login);

module.exports = router;
