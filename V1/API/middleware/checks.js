const db = require('../db/models');
const Car = db.Car;
const CarImage = db.CarImage;
const CarDetail = db.CarDetail;
const Company = db.Company;
const CompanyLogo = db.CompanyLogo;
const User = db.User;

exports.carCheck = async (req, res, next) => {
    const car = await Car.findAll({where : {id: req.params.carId}});
    if (car.length === 0) {
        return res.status(404).json({message: 'Car not found !'});
    }
    next();
}

exports.imageCheck = async (req, res, next) => {
    const image = await CarImage.findAll({where : {id: req.params.imageId}});
    if (image.length === 0) {
        return res.status(404).json({message: 'Image not found'});
    }
    
    next();
}

exports.detailCheck = async (req, res, next) => {
    const detail = await CarDetail.findAll({where : {id: req.params.detailId}});
    if (detail.length === 0) {
        return res.status(404).json({message: 'Detail not found'});
    }

    next();
}

exports.companyCheck = async (req, res, next) => {
    const company = await Company.findAll({where : {id: req.params.companyId}});
    if (company.length === 0) {
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
    if (user.length === 0) {
        return res.status(404).json({ message: 'User not found!' });
    }
    next();
}