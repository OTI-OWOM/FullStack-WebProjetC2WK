const db = require('../db/models');
const Brand = db.Brand;
const ModelBrand = db.ModelBrand;
const CarDetail = db.CarDetail;
const User = db.User;

class FormatService {
    /**
     * Format car details.
     * @param {object} car - Car object to format.
     */
    async carFormat(car) {
        const user = await User.findByPk(car.SellerID);
        const modelBrandObj = await ModelBrand.findByPk(car.ModelBrandID);
        const brandObj = await Brand.findByPk(modelBrandObj ? modelBrandObj.BrandID : null);
        const carDetails = await CarDetail.findAll({ where: { CarID: car.id } });

        return {
            id: car.id,
            Year: car.Year,
            Price: car.Price,
            Description: car.Description,
            Available: car.Available,
            SellerID: car.SellerID,
            ModelBrandName: modelBrandObj ? modelBrandObj.ModelName : "Model not found",
            BrandName: brandObj ? brandObj.BrandName : "Brand not found",
            CarDetails: carDetails,
            SellerName: user ? user.Name : "User not found",
            SellerLastName: user ? user.LastName : "",
            SellerEmail: user ? user.Email : ""
        };
    }

    /**
     * Format user details.
     * @param {object} user - User object to format.
     */
    async userFormat(user) {

        return {
            id: user.id,
            Name: user.Name,
            LastName: user.LastName,
            Email: user.Email,
            IsSeller: user.IsSeller,
            Role: user.Role,
            Address: user.Address,
            City: user.City,
            PostalCode: user.PostalCode
        };
    }
}

// Export an instance of the class
module.exports = new FormatService();
