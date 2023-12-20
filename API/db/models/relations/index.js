module.exports = function setupAssociations(sequelize) {
    const { User, Brand, Model, Car, CarImage, CarDetail, Review } = sequelize.models;

    // User and Car association
    User.hasMany(Car, { foreignKey: 'SellerID' });
    Car.belongsTo(User, { foreignKey: 'SellerID' });

    // Brand and Model association
    Brand.hasMany(Model, { foreignKey: 'BrandID' });
    Model.belongsTo(Brand, { foreignKey: 'BrandID' });

    // Model and Car association
    Model.hasMany(Car, { foreignKey: 'ModelID' });
    Car.belongsTo(Model, { foreignKey: 'ModelID' });

    // Car and CarImage association
    Car.hasMany(CarImage, { foreignKey: 'CarID' });
    CarImage.belongsTo(Car, { foreignKey: 'CarID' });

    // Car and CarDetail association
    Car.hasMany(CarDetail, { foreignKey: 'CarID' });
    CarDetail.belongsTo(Car, { foreignKey: 'CarID' });

    // Car and Review association
    Car.hasMany(Review, { foreignKey: 'CarID' });
    Review.belongsTo(Car, { foreignKey: 'CarID' });

    // User and Review association
    User.hasMany(Review, { foreignKey: 'UserID' });
    Review.belongsTo(User, { foreignKey: 'UserID' });
}