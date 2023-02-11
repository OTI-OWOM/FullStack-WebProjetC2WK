const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function isUserAdmin(userId) {
    const filter = { _id: userId };

    const user = await User.findOne(filter);
    return user && user.role === 'admin';
}

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // check token validity
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const { userId } = decodedToken;
        const isAdmin = await isUserAdmin(userId);
        req.auth = {
            userId,
            isAdmin,
        };
        next();
    } catch (error) {
        // 401 : unauthorized
        res.status(401).json({ error });
    }
};
