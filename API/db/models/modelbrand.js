'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ModelBrand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ModelBrand.belongsTo(models.Brand, { foreignKey: 'BrandID' });
      ModelBrand.hasMany(models.Car, { foreignKey: 'ModelBrandID' });
    }
  }
  ModelBrand.init({
    ModelName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ModelBrand',
  });
  return ModelBrand;
};