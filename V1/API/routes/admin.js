const express = require('express');
const router = express.Router();

const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');
const adminController = require('../controllers/admin/admin');

// route to current user info
router.get('/admin/user/:userId', authorize.jwtUserAuth, authorize.adminAuth, checks.userCheck, adminController.getOneUser);

// route to current user info
router.get('/admin/users', authorize.jwtUserAuth, authorize.adminAuth, adminController.getAllUsers);

// route to current user info
router.get('/admin/verify', authorize.jwtUserAuth, authorize.adminAuth, adminController.isAdmin);

// route to current user info
router.put('/admin/user/:userId', authorize.jwtUserAuth, authorize.adminAuth, checks.userCheck, adminController.modifyUser);

// route to current user info
router.delete('/admin/user/:userId', authorize.jwtUserAuth, authorize.adminAuth, checks.userCheck, adminController.deleteUser)

module.exports = router;