'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.belongsTo(models.User, { foreignKey: 'SellerID' });
      Car.belongsTo(models.ModelBrand, { foreignKey: 'ModelBrandID' });
      Car.hasMany(models.CarImage, { foreignKey: 'CarID' });
      Car.hasMany(models.CarDetail, { foreignKey: 'CarID' });
      Car.hasMany(models.Review, { foreignKey: 'CarID' });
    }
  }
  Car.init({
    Year: DataTypes.INTEGER,
    Price: DataTypes.DECIMAL,
    Description: DataTypes.TEXT,
    Available: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};