const express = require('express');

const router = express.Router();

const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');

const adminController = require('../controllers/users/admin');
const companyController = require('../controllers/companies/company');

// route to all users
router.get('/super/admin/users', authorize.jwtUserAuth, authorize.superAdminAuth, adminController.getAllUsers);

// route to current user info
router.get('/super/admin/verify', authorize.jwtUserAuth, authorize.superAdminAuth, adminController.isSuperAdmin);

// route to user info
router.get('/super/admin/user/:userId', authorize.jwtUserAuth, checks.userCheck, authorize.superAdminAuth, adminController.getOneUser);

// route to modify user
router.put('/super/admin/user/:userId', authorize.jwtUserAuth, checks.userCheck, authorize.superAdminAuth, adminController.modifyUser);

// route to delete user
router.delete('/super/admin/user/:userId', authorize.jwtUserAuth, checks.userCheck, authorize.superAdminAuth, adminController.deleteUser);

// route to user info
router.get('/super/admin/company/:companyId', authorize.jwtUserAuth, checks.companyCheck, authorize.superAdminAuth, companyController.getOneCompany);

// route to user info
router.get('/super/admin/companies', authorize.jwtUserAuth, authorize.superAdminAuth, companyController.getAllCompanies);

// route to user info
router.post('/super/admin/company', authorize.jwtUserAuth, authorize.superAdminAuth, companyController.createCompany);

// route to delete company
router.delete('/super/admin/company/:companyId', authorize.jwtUserAuth, authorize.superAdminAuth, companyController.deleteCompany);

module.exports = router;