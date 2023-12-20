'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ModelBrands', [
      // Toyota Models
      { ModelName: 'Camry', BrandID: 1, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Corolla', BrandID: 1, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'RAV4', BrandID: 1, createdAt: new Date(), updatedAt: new Date() },
      
      // Ford Models
      { ModelName: 'F-150', BrandID: 2, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Mustang', BrandID: 2, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Explorer', BrandID: 2, createdAt: new Date(), updatedAt: new Date() },
      
      // Honda Models
      { ModelName: 'Civic', BrandID: 3, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Accord', BrandID: 3, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'CR-V', BrandID: 3, createdAt: new Date(), updatedAt: new Date() },

      // Chevrolet Models
      { ModelName: 'Silverado', BrandID: 4, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Equinox', BrandID: 4, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Malibu', BrandID: 4, createdAt: new Date(), updatedAt: new Date() },
      
      // Nissan Models
      { ModelName: 'Altima', BrandID: 5, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Sentra', BrandID: 5, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Rogue', BrandID: 5, createdAt: new Date(), updatedAt: new Date() },
    
      // Renault Models
      { ModelName: 'Clio', BrandID: 6, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Megane', BrandID: 6, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Kadjar', BrandID: 6, createdAt: new Date(), updatedAt: new Date() },
      
      // Peugeot Models
      { ModelName: '208', BrandID: 7, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: '308', BrandID: 7, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: '3008', BrandID: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Citroen Models
      { ModelName: 'C3', BrandID: 8, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'C4', BrandID: 8, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'C5 Aircross', BrandID: 8, createdAt: new Date(), updatedAt: new Date() },
      
      // Mazda Models
      { ModelName: 'CX-5', BrandID: 9, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Mazda3', BrandID: 9, createdAt: new Date(), updatedAt: new Date() },
      { ModelName: 'Mazda6', BrandID: 9, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ModelBrands', null, {});
  }
};