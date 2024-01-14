const db = require('../db/models');
const Brand = db.Brand;
const ModelBrand = db.ModelBrand;
const CarDetail = db.CarDetail;

exports.carFormat = async (car) => {
    const ModelBrandObj = await ModelBrand.findByPk(car.ModelBrandID);
    const BrandObj = await Brand.findByPk(ModelBrandObj.BrandID);
    const CarDetails = await CarDetail.findAll({ where: { CarID: car.id } })

    const BrandName = BrandObj.BrandName;
    const ModelBrandName = ModelBrandObj.ModelName;

    return {
        id: car.id,
        Year: car.Year,
        Price: car.Price,
        Description: car.Description,
        Available: car.Available,
        SellerID: car.SellerID,
        ModelBrandName,
        BrandName,
        CarDetails
    }
}
