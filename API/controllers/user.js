const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * register - Create a new user in the database.
 *
 * @param {Object} req  The request object containing information about the HTTP request.
 * @param {Object} res  The response object used to send back the response to the client.
 */
exports.register = (req, res) => {
    if (!req.body.password || !req.body.email) return res.status(400).send('Invalid request');
    // we salt the password 10 times
    return bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                username: req.body.username,
                password: hash,
                role: 'user',
                email: req.body.email,
                adresse: req.body.adresse,
            });
            user.save()
                // 201 : successfully created a user (Created)
                .then(() => res.status(201).json({ message: 'User created !' }))
                // 400 : bad request
                .catch((error) => res.status(400).json({ error }));
        })
        // 500 : internal server error
        .catch((error) => res.status(500).json({ error }));
};

/**
* Log into the app
* @param {object} req - request
* @param {object} res - response
*/
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                // 401 : unauthorized
                return res.status(401).json({ message: 'Login or password incorrect.' });
            }
            // compare password with hash
            return bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        // 401 : unauthorized
                        return res.status(401).json({ message: 'Login or password incorrect.' });
                    }
                    // 200 : successful request (OK)
                    return res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' },
                        ),
                    });
                })
                // 500 : internal server error
                .catch((error) => { res.status(500).json({ error }); });
        })
        // 500 : internal server error
        .catch((error) => res.status(500).json({ error }));
};

/**
* Get data for the current user
* @param {object} req - request
* @param {object} res - response
*/
exports.getCurrentUser = (req, res) => {
    const filter = { _id: req.auth.userId };

    User.findOne(filter)
        .select('-password')
        .then((user) => res.status(200).json(user))
        // 500 : internal Server Error
        .catch((error) => res.status(500).json({ error }));
};

/**
* Get all the users data
* @param {object} res - response
*/
exports.getAllUsers = (req, res) => {
    User.find()
        .select('-password')
        .then((users) => {
            // 200 : successful request (OK)
            res.status(200).json(users);
        })
        // 500 : internal Server Error
        .catch((error) => res.status(500).json({ error }));
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
    // Check if the target user exists
    const targetUser = await User.findOne({ _id: req.params.userId });
    if (!targetUser) {
        // 404 : Not Found
        return res.status(404).send('User not found');
    }

    // Check if the authenticated user is authorized to modify the target user
    if (req.auth.userId !== req.params.userId && !req.auth.isAdmin) {
        // 401 : Unauthorized
        return res.status(401).send('You do not have authorization to modify this user');
    }

    const filter = { _id: req.params.userId };
    const newUserObject = { ...req.body };

    if (req.body.password) newUserObject.password = await bcrypt.hash(req.body.password, 10);

    // Update the user with the new one we created
    return User.updateOne(filter, newUserObject)
        // 200 : successful request (OK)
        .then(() => res.status(200).json({ message: 'User modified !' }))
        // 400 : bad request
        .catch((error) => res.status(400).json({ error }));
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
    const filter = { _id: req.params.userId };
    User.findOne(filter)
        .select('-password')
        .then((user) => {
            if (req.auth.userId === user.id || req.auth.isAdmin) {
                // 200 : successful request (OK)
                res.status(200).json(user);
            } else {
                // 403 : Forbidden
                res.status(403).json({ error: 'access denied' });
            }
        })
        // 404 : page not found
        .catch((error) => res.status(404).json({ error }));
};

/**
* Get data from the user
* @param {object} req - request
* @param {object} res - response
*/
exports.deleteUser = (req, res) => {
    const filter = { _id: req.params.userId };
    User.findOne(filter)
        .then((user) => {
            if (req.auth.userId === user.id || req.auth.isAdmin) {
                user.remove();
                // 200 : successful request (OK)
                res.status(200).json({ message: 'User successfully deleted.' });
            } else {
                // 403 : Forbidden
                res.status(403).json({ error: 'access denied' });
            }
        })
        // 404 : page not found
        .catch((error) => res.status(404).json({ error }));
};
