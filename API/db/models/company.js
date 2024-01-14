'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Company.hasMany(models.User, { foreignKey: 'CompanyID' });
            Company.hasMany(models.Car, { foreignKey: 'CompanyID' });
            Company.hasMany(models.CompanyLogo, { foreignKey: 'CompanyID' });
        }
    }
    Company.init({
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        City: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PostalCode:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        Country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        Phone: {
            type: DataTypes.STRING,
            allowNull: true, 
            validate: {
                is: /^[0-9]+$/i
            }
        },
        Website: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true 
            }
        },
        Industry: {
            type: DataTypes.STRING,
            allowNull: true 
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        FoundedYear: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
                min: 1900,
                max: new Date().getFullYear() 
            }
        },

    }, {
        sequelize,
        modelName: 'Company',
    });
    return Company;
};