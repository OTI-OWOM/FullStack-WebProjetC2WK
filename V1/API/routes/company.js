const express = require('express');
const router = express.Router();
const upload = require('../helpers/multer')

const emailValidation = require('../middleware/validation/email-validator');
const authorize = require('../middleware/authorize');
const checks = require('../middleware/checks');

const companyController = require('../controllers/companies/company');
const companyImageController = require('../controllers/companies/company-image');

// route to get the company the user is in
router.get('/company', authorize.jwtUserAuth, authorize.adminAuth, companyController.getCompany);

// route to create a company
router.post('/company', authorize.jwtUserAuth, authorize.superAdminAuth, companyController.createCompany);

// route to modify a company
router.put('/company/:companyId', authorize.jwtUserAuth, authorize.superAdminAuth, emailValidation, companyController.modifyCompany);

// route to get a specific company
router.get('/company/:companyId', authorize.jwtUserAuth, checks.companyCheck, authorize.superAdminAuth, companyController.getOneCompany);

// route to delete a company
router.delete('/company/:companyId', authorize.jwtUserAuth, checks.companyCheck, authorize.superAdminAuth, companyController.deleteCompany);

// route to get all companies
router.get('/companies', authorize.jwtUserAuth, authorize.superAdminAuth, companyController.getAllCompanies);

// route to add a new company image
router.post('/company/image/:companyId', authorize.jwtUserAuth, checks.companyCheck, authorize.adminAuth, authorize.belongsToCompanySelf, checks.imageExistsCheck, upload.uploadCompany.array('images', 1), companyImageController.uploadCompanyLogo);

// route to get a company image
router.get('/company/image/:companyId', authorize.jwtUserAuth, checks.companyCheck, authorize.adminAuth, authorize.belongsToCompanySelf, checks.companyCheck, companyImageController.getImage);

// route to delete a new company image
router.delete('/company/image/:companyId', authorize.jwtUserAuth, checks.companyCheck, authorize.superAdminAuth, authorize.belongsToCompanySelf, companyImageController.getImage);

module.exports = router;
