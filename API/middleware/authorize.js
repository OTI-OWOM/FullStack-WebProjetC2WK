const jwt = require('jsonwebtoken');
const db = require('../db/models');
const User = db.User;
const Car = db.Car;
const CarImage = db.CarImage;
const CarDetail = db.CarDetail;

async function isUserAdmin(userId) {
    const user = await User.findOne({ where: { id: userId } });
    return user.Role;
}

exports.JWTAthorization = async (req, res, next) => {
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

exports.adminOrUserCheck = async (req, res, next) => {
    const user = await User.findByPk(req.params.userId);
    if (!user) {
        return res.status(404).send('User not found');
    }

    if (req.auth.userId !== user.id && !req.auth.isAdmin) {
        return res.status(401).send('Unauthorized');
    } else {
        next();
    }
}

exports.carCheck = async (req, res, next) => {
    const car = await Car.findByPk(req.params.carId);
    if (!car) {
        return res.status(404).send('Car not found');
    }
    
    req.params.userId = car.SellerID;
    next();
}

exports.imageCheck = async (req, res, next) => {
    const image = await CarImage.findByPk(req.params.imageId);
    if (!image) {
        return res.status(404).send('Image not found');
    }
    
    req.params.carId = image.CarID;
    next();
}

exports.detailCheck = async (req, res, next) => {
    const detail = await CarDetail.findByPk(req.params.detailId);
    if (!detail) {
        return res.status(404).send('Detail not found');
    }

    req.params.carId = detail.CarID;
    next();
}

exports.adminAuth = (req, res, next) => {
    if (!req.auth.isAdmin) {
        return res.status(401).send('Unauthorized');
    }
    next();
}
