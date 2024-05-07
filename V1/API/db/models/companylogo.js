'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyLogo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompanyLogo.belongsTo(models.Company, { foreignKey: 'CompanyID' });
    }
  }
  CompanyLogo.init({
    ImageURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyLogo',
  });
  return CompanyLogo;
};