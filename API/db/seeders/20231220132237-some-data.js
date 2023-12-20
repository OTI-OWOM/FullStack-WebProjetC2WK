'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands', [
      { name: 'Toyota' },
      { name: 'Ford' },
      { name: 'Honda' },
      { name: 'Chevrolet' },
      { name: 'Renault' },
      { name: 'Peugeot' },
    ], {});
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
