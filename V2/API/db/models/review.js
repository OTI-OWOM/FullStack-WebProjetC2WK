'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Car, { foreignKey: 'CarID' });
      Review.belongsTo(models.User, { foreignKey: 'UserID' });
    }
  }
  Review.init({
    Rating: DataTypes.INTEGER,
    Comment: DataTypes.TEXT,
    ReviewDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};