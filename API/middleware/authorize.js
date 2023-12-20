const jwt = require('jsonwebtoken');
const db = require('../db/models');
const User = db.User;

async function isUserAdmin(userId) {
    const user = await User.findOne({ where: { id: userId } });
    console.log(`Role : ${user.Role}`);
    return user && user.Role;
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
        console.log(error);
        res.status(401).json({ error });
    }
};
