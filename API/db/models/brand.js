'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.hasMany(models.ModelBrand, { foreignKey: 'BrandID' });
    }
  }
  Brand.init({
    BrandName: {
      type: DataTypes.STRING,
      unique: true, // Enforce uniqueness on the email field
    },
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};