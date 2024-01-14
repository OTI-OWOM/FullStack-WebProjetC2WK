const db = require('../db/models');
const Car = db.Car;
const CarImage = db.CarImage;
const CarDetail = db.CarDetail;
const Company = db.Company;
const CompanyLogo = db.CompanyLogo;
const User = db.User;

exports.carCheck = async (req, res, next) => {
    const car = await Car.findByPk(req.params.carId);
    if (!car) {
        return res.status(404).json({message: 'Car not found !'});
    }
    next();
}

exports.imageCheck = async (req, res, next) => {
    const image = await CarImage.findByPk(req.params.imageId);
    if (!image) {
        return res.status(404).json({message: 'Image not found'});
    }
    
    next();
}

exports.detailCheck = async (req, res, next) => {
    const detail = await CarDetail.findByPk(req.params.detailId);
    if (!detail) {
        return res.status(404).json({message: 'Detail not found'});
    }

    next();
}

exports.companyCheck = async (req, res, next) => {
    const company = await Company.findByPk(req.params.companyId);
    if (!company) {
        return res.status(404).json({message: 'Company not found'});
    }
    next();
}

exports.imageExistsCheck = async (req, res, next) => {
    const companyLogo = await CompanyLogo.findOne({where : {CompanyID: req.params.companyId}});
    if (companyLogo) {
        return res.status(500).json({ message: 'Only 1 image allowed!' });
    }
    next();
}

exports.userCheck = async (req, res, next) => {
    const user = await User.findOne({where : {id: req.params.userId}});
    if (!user) {
        return res.status(404).json({ message: 'User not found!' });
    }
    next();
}