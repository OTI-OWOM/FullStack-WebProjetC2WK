const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db/models');
const User = db.User;

class AuthController {
    constructor() {
        this.registerUser = this.register(0);
        this.registerAdmin = this.register(1);
        this.registerSuperAdmin = this.register(2);
    }

    /**
     * Log into the app
     */
    login(req, res) {
        return User.findOne({ where: { Email: req.body.Email } })
            .then(user => {
                if (!user) {
                    // 401 : unauthorized
                    return res.status(401).json({ error: 'Login or password incorrect.' });
                }
                // compare password with hash
                return bcrypt.compare(req.body.Password, user.Password)
                    .then((valid) => {
                        if (!valid) {
                            // 401 : unauthorized
                            return res.status(401).json({ error: 'Login or password incorrect.' });
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
                    .catch((error) => {
                        res.status(502).json({ error });
                    });
            })
            // 500 : internal server error
            .catch(error => {
                res.status(500).json({ error });
            });
    }

    /**
     * register - Create a new user in the database.
     * 
     * @param {number} role The role of the user (0 for regular user, 1 for admin, 2 for super admin).
     */
    register(role) {
        return (req, res) => {
        // we salt the password 10 times
            return bcrypt.hash(req.body.Password, 10)
                .then((hash) => {
                    User.create({
                        Name: req.body.Name,
                        LastName: req.body.LastName,
                        Password: hash,
                        Email: req.body.Email,
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
    }
}

// Export an instance of the class
module.exports = new AuthController();