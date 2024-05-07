const db = require('../../db/models');
const Brand = db.Brand;
const ModelBrand = db.ModelBrand;

class ProductBrandController {
    /**
     * Get all existing brands from the API.
     */
    getAllBrands(req, res) {
        console.log("Went here \n");
        Brand.findAll()
            .then(brands => res.status(200).json(brands.map(carBrand => {
                return { id: carBrand.id, BrandName: carBrand.BrandName }; 
            })))
            .catch(error => res.status(400).json({ error }));
    }

    /**
     * Get all existing brand models from the API.
     */
    async getAllModelBrand(req, res) {
        try {
            const modelbrands = await ModelBrand.findAll({ where: { BrandID: req.params.brandId } });

            const modelDetails = await Promise.all(modelbrands.map(async (model) => {
                const brand = await Brand.findByPk(model.BrandID);
                return { 
                    id: model.id, 
                    ModelName: model.ModelName, 
                    BrandID: model.BrandID, 
                    BrandName: brand ? brand.BrandName : "Brand not found"
                };
            }));

            res.status(200).json(modelDetails);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error });
        }
    }
}

// Export an instance of the class
module.exports = new ProductBrandController();
