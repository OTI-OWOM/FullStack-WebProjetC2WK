const db = require('../db/models');
const User = db.User;
const userHelper = require('../helpers/userHelper');

/**
* Get all the users data
* @param {object} res - response
*/
exports.getAllUsers = (req, res) => {
    return User.findAll({
        attributes: { exclude: ['Password'] }
    })
        .then(users => res.status(200).json(users))
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
    await userHelper.modifyUserData(req.params.userId, req.body, res);
    // try {
    //     let updatedFields = req.body;
    //     const user = await User.findByPk(req.params.userId);
    //     // If password is present, hash it.
    //     if (updatedFields.Password) {
    //         updatedFields.Password = await bcrypt.hash(updatedFields.Password, 10);
    //     }

    //     // Filter out keys with empty values.
    //     updatedFields = Object.entries(updatedFields)
    //         .filter(([key, value]) => value !== null && value !== undefined && value !== '' && value !== user[key])
    //         .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    //     console.log(updatedFields);
    //     // Update the user if there are fields to update.
    //     if (Object.keys(updatedFields).length > 0) {
    //         await User.update(updatedFields, { where: { id: req.params.userId } });
    //         res.status(200).json({ message: 'User modified!' });
    //     } else {
    //         res.status(200).json({ message: 'No valid fields provided for update!' });
    //     }
    // } catch (error) {
    //     res.status(400).json({ error });
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
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json({ error }));
};


/**
* Get data from the user
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteUser = (req, res) => {
    userHelper.deleteUser(req.params.userId, res);
    // return User.findByPk(req.params.userId)
    //     .then(user => {
    //         return user.destroy()
    //             .then(() => res.status(200).json({ message: 'User successfully deleted.' }))
    //             .catch(error => {
    //                 // Handle error during deletion
    //                 res.status(500).json({ error });
    //             });
    //     })
    //     .catch(error => res.status(500).json({ error }));
};
