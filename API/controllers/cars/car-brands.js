const db = require('../../db/models');
const Brand = db.Brand;
const ModelBrand = db.ModelBrand;

/**
* Get all existing Brands from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getAllBrands = (req, res) => {
    Brand.findAll()
        .then(brands => res.status(200).json(brands.map(function(carBrand) {
            return { id: carBrand.id, BrandName: carBrand.BrandName }; 
        })))
        .catch(error => res.status(400).json({ error }));
};

/**
* Get all existing Brand Models from the api
* @param {object} req - request
* @param {object} res - response
*/
exports.getAllModelbrand = async (req, res) => {
    try {
        const modelbrands = await ModelBrand.findAll({ where: { BrandID: req.params.brandId } })

        const modelDetails = await Promise.all(modelbrands.map(async (model) => {
            const brand = await Brand.findByPk(model.BrandID);
            return { 
                id: model.id, 
                ModelName: model.ModelName, 
                BrandID: model.BrandID, 
                BrandName: brand.BrandName
            };
        }));

        res.status(200).json(modelDetails);
    } catch (error) {
        res.status(400).json({ error });
    }
};