const db = require('../../db/models');
const User = db.User;
const modelHelper = require('../../helpers/modelHelper');
const formatHelper = require('../../helpers/formatHelper');

/**
* Get data for the current user
* @param {object} req - request
* @param {object} res - response
*/
exports.getCurrentUser = (req, res) => {
    return User.findByPk(req.auth.userId, {
        attributes: { exclude: ['Password'] }
    })
        .then(async user => res.status(200).json(await formatHelper.userFormat(user)))
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
exports.modifyUser = async (req, res) => {
    await modelHelper.modifyModel(User, req.auth.userId, req.body, res);
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
exports.getOneUser = (req, res) => {
    return User.findByPk(req.params.userId, {
        attributes: { exclude: ['Password'] }
    })
        .then(async user => res.status(200).json(await formatHelper.userFormat(user)))
        .catch(error => res.status(500).json({ error }));
};


/**
* Get data from the user
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteUser =  (req, res) => {
    modelHelper.deleteModel(User, req.auth.userId, res);
};
