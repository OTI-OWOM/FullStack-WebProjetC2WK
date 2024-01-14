const db = require('../../db/models');
const Company = db.Company;
const modelHelper = require('../../helpers/modelHelper');
const formatHelper = require('../../helpers/formatHelper');

/**
 * register - Create a new user in the database.
 *
 * @param {Object} req  The request object containing information about the HTTP request.
 * @param {Object} res  The response object used to send back the response to the client.
 */
exports.createCompany = (req, res) => {
    if (!req.body.Email || !req.body.Name || !req.body.Address || !req.body.City || !req.body.PostalCode || !req.body.Country) return res.status(400).json({ message: 'Invalid request' });
    Company.create({
        Name: req.body.Name,
        Address: req.body.Address,
        City: req.body.City,
        PostalCode: req.body.PostalCode,
        Email: req.body.Email,
        Country: req.body.Country,
        Phone: req.body.Phone,
        Website: req.body.Website,
        Description: req.body.Description,
        FoundedYear: req.body.FoundedYear,
        Industry: req.body.Industry
    })
        .then((response) => res.status(201).json({
            message: 'Company created !',
            companyId: response.dataValues.id,
        })
        )
        // 400 : bad request
        .catch((error) => {
            console.log(error);
            res.status(400).json({ message: error.errors[0].message });
        });
};

/**
* Get data for the current user
* @param {object} req - request
* @param {object} res - response
*/
exports.getCompany = (req, res) => {
    return Company.findByPk(req.auth.companyId)
        .then(company => res.status(200).json(company))
        .catch(error => res.status(500).json({ error }));
};

/**
* Get all the users data
* @param {object} res - response
*/
exports.getAllCompanies = (req, res) => {
    return Company.findAll()
        .then(companies => res.status(200).json(companies))
        .catch(error => res.status(500).json({ error }));
};


/**
 * modifyUser - Let an admin or the user modify its data.
 *
 * @param {Object} req  The request object containing information about the HTTP request.
 * @param {Object} res  The response object used to send back the response to the client.
 *
 * @returns {Object}  The user object, or an error object if the user was not found
 * or the request was not authorized.
 */
exports.modifyCompany = async (req, res) => {
    await modelHelper.modifyModel(Company, req.auth.companyId, req.body, res);
    // }
};


/**
 * getOneUser - Retrieve a single user from the database.
 *
 * @param {Object} req  The request object containing information about the HTTP request.
 * @param {Object} res  The response object used to send back the response to the client.
 *
 * @returns {Object}  The user object, or an error object if the user was not found
 *                    or the request was not authorized.
 */
exports.getOneCompany = (req, res) => {
    return Company.findByPk(req.params.companyId)
        .then(user => res.status(200).json(formatHelper.userFormat(user)))
        .catch(error => res.status(500).json({ error }));
};


/**
* Get data from the user
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteCompany = (req, res) => {
    modelHelper.deleteModel(Company, req.params.companyId, res);
};
