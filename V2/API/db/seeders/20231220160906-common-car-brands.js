'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands', [
      { BrandName: 'Toyota', createdAt: new Date(), updatedAt: new Date() },
      { BrandName: 'Ford', createdAt: new Date(), updatedAt: new Date() },
      { BrandName: 'Honda', createdAt: new Date(), updatedAt: new Date() },
      { BrandName: 'Chevrolet', createdAt: new Date(), updatedAt: new Date() },
      { BrandName: 'Nissan', createdAt: new Date(), updatedAt: new Date() },
      { BrandName: 'Renault', createdAt: new Date(), updatedAt: new Date() },
      { BrandName: 'Peugeot', createdAt: new Date(), updatedAt: new Date() },
      { BrandName: 'Citroen', createdAt: new Date(), updatedAt: new Date() },
      { BrandName: 'Mazda', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};