const jwt = require('jsonwebtoken');
const db = require('../db/models');
const User = db.User;
const Car = db.Car;

async function getUserRoleCompany(userId) {
    const user = await User.findOne({ where: { id: userId } });
    return {role: user.Role, companyId: user.CompanyID};
}

exports.jwtUserAuth = async (req, res, next) => {
    try {
        // const token = req.cookies['token'];
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const { userId } = decodedToken;
        const role = (await getUserRoleCompany(userId)).role;
        const companyId = (await getUserRoleCompany(userId)).companyId;
        req.auth = {
            userId,
            role,
            companyId
        };
        next();
    } catch (error) {
        // 401 : unauthorized
        res.status(401).json({ error });
    }
};

exports.sellerAuth = async (req, res, next) => {
    const user = await User.findByPk(req.auth.userId);
    if(!user && req.auth.role < 0) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    next();
}

exports.adminAuth = (req, res, next) => {
    if (!req.auth.role > 0) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    next();
}

exports.superAdminAuth = (req, res, next) => {
    if (req.auth.role !== 2) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    next();
}

exports.belongsToCompanyUser = async (req, res, next) => {
    const user = await User.findByPk(req.params.userId);
    
    if (req.auth.companyId !== user.CompanyID && req.auth.role !== 2) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    next();
}

exports.belongsToCompanySelf = async (req, res, next) => {
    if (req.auth.companyId !== req.params.companyId && req.auth.role !== 2) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    next();
}