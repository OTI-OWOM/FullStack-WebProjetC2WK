'use strict';
/** @type {import('sequelize-cli').Migration} */
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      City: {
        type: Sequelize.STRING,
        allowNull: false
      },
      PostalCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      Phone: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: /^[0-9]+$/i
        }
      },
      Website: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isUrl: true
        }
      },
      Industry: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      FoundedYear: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          isInt: true,
          min: 1900,
          max: new Date().getFullYear()
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};
