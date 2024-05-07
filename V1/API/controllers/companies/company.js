const db = require('../../db/models');
const Company = db.Company;
const modelHelper = require('../../helpers/modelHelper');
const formatHelper = require('../../helpers/formatHelper');

class CompanyController {
    /**
     * Create a new company in the database.
     */
    createCompany(req, res) {
        if (!req.body.email || !req.body.Name || !req.body.Address || !req.body.City || !req.body.PostalCode || !req.body.Country) {
            return res.status(400).json({ message: 'Invalid request' });
        }
        Company.create({
            Name: req.body.Name,
            Address: req.body.Address,
            City: req.body.City,
            PostalCode: req.body.PostalCode,
            Email: req.body.email,
            Country: req.body.Country,
            Phone: req.body.Phone,
            Website: req.body.Website,
            Description: req.body.Description,
            FoundedYear: req.body.FoundedYear,
            Industry: req.body.Industry
        })
        .then(response => res.status(201).json({
            message: 'Company created !',
            companyId: response.dataValues.id,
        }))
        .catch(error => {
            console.log(error);
            res.status(400).json({ message: error.errors[0].message });
        });
    }

    /**
     * Get data for the current company.
     */
    getCompany(req, res) {
        return Company.findByPk(req.auth.companyId)
            .then(company => res.status(200).json(company))
            .catch(error => res.status(500).json({ error }));
    }

    /**
     * Get all companies data.
     */
    getAllCompanies(req, res) {
        return Company.findAll()
            .then(companies => res.status(200).json(companies))
            .catch(error => res.status(500).json({ error }));
    }

    /**
     * Modify company data.
     */
    modifyCompany(req, res) {
        return modelHelper.modifyModel(Company, req.auth.companyId, req.body, res);
    }

    /**
     * Retrieve a single company from the database.
     */
    getOneCompany(req, res) {
        return Company.findByPk(req.params.companyId)
            .then(company => res.status(200).json(company))
            .catch(error => res.status(500).json({ error }));
    }

    /**
     * Delete a company.
     */
    deleteCompany(req, res) {
        modelHelper.deleteModel(Company, req.params.companyId, res);
    }
}

// Export an instance of the class
module.exports = new CompanyController();