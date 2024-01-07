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
    LastName: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      unique: true,
    },
    Password: DataTypes.STRING,
    IsSeller: DataTypes.BOOLEAN,
    Role: DataTypes.BOOLEAN,
    Address: DataTypes.STRING,
    City: DataTypes.STRING,
    PostalCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};