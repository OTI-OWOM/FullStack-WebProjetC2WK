'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CarDetail.belongsTo(models.Car, { foreignKey: 'CarID' });
    }
  }
  CarDetail.init({
    DetailName: DataTypes.STRING,
    DetailValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CarDetail',
  });
  return CarDetail;
};