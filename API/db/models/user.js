'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Car, { foreignKey: 'SellerID' });
      User.hasMany(models.Review, { foreignKey: 'UserID' });
    }
  }
  User.init({
    Name: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true, // Enforce uniqueness on the email field
    },
    Password: DataTypes.STRING,
    IsSeller: DataTypes.BOOLEAN,
    Role: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};