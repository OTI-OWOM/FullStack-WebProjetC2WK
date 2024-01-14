const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db/models');
const User = db.User;

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
 * register - Create a new user in the database.
 *
 * @param {Object} req  The request object containing information about the HTTP request.
 * @param {Object} res  The response object used to send back the response to the client.
 */
const register = (role) => (req, res) => {
    // we salt the password 10 times
    return bcrypt.hash(req.body.Password, 10)
        .then((hash) => {
            User.create({
                Name: req.body.Name,
                LastName: req.body.LastName,
                Password: hash,
                Email: req.body.Email,
                IsSeller: req.body.IsSeller,
                Role: role,
                Address: req.body.Address,
                City: req.body.City,
                PostalCode: req.body.PostalCode,
                CompanyID: req.params.companyId,
                IsSeller: req.params.companyId ? 1 : 0
            })
                // 201 : successfully created a user (Created)
                .then((response) => res.status(201).json({
                    message: 'User created !',
                    userId: response.dataValues.id,
                    token: jwt.sign(
                        { userId: response.dataValues.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '24h' },
                    ),
                })
                )
                // 400 : bad request
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({ message: error.errors[0].message });
                });
        })
        // 500 : internal server error
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error })
        });
};

exports.registerUser = register(0); // Role for regular user
exports.registerAdmin = register(1); // Role for admin
exports.registerSuperAdmin = register(2); // Role for super admin