const express = require('express');

const router = express.Router();

const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');
const adminController = require('../controllers/users/admin');

// route to all users
router.get('/admin/users/:companyId', authorize.jwtUserAuth, authorize.adminAuth, checks.companyCheck,  adminController.getAllUsersFromCompany);

// route to current user info
router.get('/admin/user/:userId', authorize.jwtUserAuth, authorize.belongsToCompanyUser, authorize.adminAuth, checks.userCheck, adminController.getOneUser);

// route to current user info
router.put('/admin/user/:userId', authorize.jwtUserAuth, authorize.belongsToCompanyUser, authorize.adminAuth, checks.userCheck, adminController.modifyUser);

// route to current user info
router.delete('/admin/user/:userId', authorize.jwtUserAuth, authorize.belongsToCompanyUser, authorize.adminAuth, checks.userCheck, adminController.deleteUser)

module.exports = router;