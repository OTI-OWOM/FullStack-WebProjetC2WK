const db = require('../db/models');
const Brand = db.Brand;
const ModelBrand = db.ModelBrand;

exports.carFormat = async (car) => {
    const ModelBrandObj = await ModelBrand.findByPk(car.ModelBrandID);
    const BrandObj = await Brand.findByPk(ModelBrandObj.BrandID);

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
        BrandName
    }
}