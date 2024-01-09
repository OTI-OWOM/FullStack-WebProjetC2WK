const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/models');
const User = db.User;

/**
 * register - Create a new user in the database.
 *
 * @param {Object} req  The request object containing information about the HTTP request.
 * @param {Object} res  The response object used to send back the response to the client.
 */
exports.register = (req, res) => {
    if (!req.body.Password || !req.body.Email) return res.status(400).json({ message: 'Invalid request' });
    // we salt the password 10 times
    return bcrypt.hash(req.body.Password, 10)
        .then((hash) => {
            User.create({
                Name: req.body.Name,
                LastName: req.body.LastName,
                Password: hash,
                Email: req.body.Email,
                IsSeller: req.body.IsSeller,
                Role: req.body.Role,
                Address: req.body.Address,
                City: req.body.City,
                PostalCode: req.body.PostalCode,
            })
                // 201 : successfully created a user (Created)
                .then(() => res.status(201).json({ message: 'User created !' }))
                // 400 : bad request
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({ message : error.errors[0].message });
                });
        })
        // 500 : internal server error
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error })
        });
};

/**
* Log into the app
* @param {object} req - request
* @param {object} res - response
*/
exports.login = (req, res) => {
    return User.findOne({ where: { Email: req.body.Email } })
        .then(user => {
            if (!user) {
                // 401 : unauthorized
                return res.status(401).json({ message: 'Login or password incorrect.' });
            }
            // compare password with hash
            return bcrypt.compare(req.body.Password, user.Password)
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
                    // const token = jwt.sign({ userId: user.id },
                    //     process.env.TOKEN_SECRET,
                    //     { expiresIn: '24h' },);
                    // res.cookie('token', token, {
                    //     httpOnly: false, // makes the cookie inaccessible to JavaScript
                    //     secure: false, // ensures cookie is only sent over HTTPS
                    //     sameSite: 'None', // prevents CSRF attacks
                    // });
                    // return res.status(200).json({
                    //         userId: user.id
                    //     });
                })
                // 500 : internal server error
                .catch((error) => {
                    res.status(502).json({ error });
                });
        })
        // 500 : internal server error
        .catch(error => {
            res.status(500).json({ error });
        });
};


/**
* Get data for the current user
* @param {object} req - request
* @param {object} res - response
*/
exports.getCurrentUser = (req, res) => {
    return User.findByPk(req.auth.userId, {
        attributes: { exclude: ['Password'] }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json({ error }));
};


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
    try {
        let updatedFields = req.body;
        const user = await User.findByPk(req.params.userId);
        // If password is present, hash it.
        if (updatedFields.Password) {
            updatedFields.Password = await bcrypt.hash(updatedFields.Password, 10);
        }

        // Filter out keys with empty values.
        updatedFields = Object.entries(updatedFields)
            .filter(([key, value]) => value !== null && value !== undefined && value !== '' && value !== user[key])
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
        console.log(updatedFields);
        // Update the user if there are fields to update.
        if (Object.keys(updatedFields).length > 0) {
            await User.update(updatedFields, { where: { id: req.params.userId } });
            res.status(200).json({ message: 'User modified!' });
        } else {
            res.status(200).json({ message: 'No valid fields provided for update!' });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
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
    return User.findByPk(req.params.userId)
        .then(user => {
            return user.destroy()
                .then(() => res.status(200).json({ message: 'User successfully deleted.' }))
                .catch(error => {
                    // Handle error during deletion
                    res.status(500).json({ error });
                });
        })
        .catch(error => res.status(500).json({ error }));
};
