const db = require('../db/models');
const Brand = db.Brand;
const ModelBrand = db.ModelBrand;
const CarDetail = db.CarDetail;
const CompanyLogo = db.CompanyLogo;
const Company = db.Company;

exports.carFormat = async (car) => {
    const company = await Company.findByPk(user.CompanyID);
    const imageUrl = await CompanyLogo.findOne({where: {CompanyID: company.id}})
    const modelBrandObj = await ModelBrand.findByPk(car.ModelBrandID);
    const brandObj = await Brand.findByPk(ModelBrandObj.BrandID);
    const carDetails = await CarDetail.findAll({ where: { CarID: car.id } })

    const BrandName = brandObj.BrandName;
    const ModelBrandName = modelBrandObj.ModelName;

    return {
        id: car.id,
        Year: car.Year,
        Price: car.Price,
        Description: car.Description,
        Available: car.Available,
        SellerID: car.SellerID,
        ModelBrandName,
        BrandName,
        carDetails,
        CompanyName: company ? company.Name : null,
        CompanyAdress: company ? company.Address : null,
        CompanyCity: company ? company.City : null,
        CompanyPostalCode: company ? company.PostalCode : null,
        CompanyLogo: imageUrl ? imageUrl.ImageURL : null,
        CompanyPhone: company ? company.Phone : null,
    }
}

exports.userFormat = async (user) => {
    const company = await Company.findByPk(user.CompanyID);

    return {
        id: user.id,
        Name: user.Name,
        LastName: user.LastName,
        Email: user.Email,
        Password: user.Password,
        IsSeller: user.IsSeller,
        Role: user.Role,
        Address: user.Address,
        City: user.City,
        PostalCode: user.PostalCode,
        CompanyID: user.CompanyID,
        CompanyName: company ? company.Name : null
    };
};