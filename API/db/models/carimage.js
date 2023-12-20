'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CarImage.belongsTo(models.Car, { foreignKey: 'CarID' });
    }
  }
  CarImage.init({
    ImageURL: DataTypes.STRING,
    UploadDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'CarImage',
  });
  return CarImage;
};