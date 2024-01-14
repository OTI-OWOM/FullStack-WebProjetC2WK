const express = require('express');
const router = express.Router();
const upload = require('../helpers/multer')

const emailValidation = require('../middleware/validation/email-validator');
const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');

const companyController = require('../controllers/companies/company');
const companyImageController = require('../controllers/companies/company-image');

// route to current user info
router.get('/company', authorize.jwtUserAuth, authorize.adminAuth, authorize.belongsToCompanyUser, companyController.getCompany);

// route to current user info
router.put('/company', authorize.jwtUserAuth, authorize.adminAuth, authorize.belongsToCompanyUser, emailValidation, companyController.modifyCompany);

// route to add a new car image
router.post('/company/image/:companyId', authorize.jwtUserAuth, checks.companyCheck, authorize.adminAuth, authorize.belongsToCompanyUser, checks.imageExistsCheck, upload.uploadCompany.array('images', 1), companyImageController.uploadCompanyLogo);

// route to add a new car image
router.get('/company/image/:companyId', authorize.jwtUserAuth, checks.companyCheck, authorize.adminAuth, authorize.belongsToCompanyUser, checks.companyCheck, companyImageController.getImage);

// route to add a new car image
router.delete('/company/image/:companyId', authorize.jwtUserAuth, checks.companyCheck, authorize.superAdminAuth, authorize.belongsToCompanyUser, companyImageController.getImage);

module.exports = router;
