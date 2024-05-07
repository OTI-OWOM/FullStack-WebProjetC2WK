'use strict';
const bcrypt = require('bcrypt');
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const adress = process.env.ADMIN_ADRESS;
    const email = process.env.ADMIN_EMAIL;
    const city = process.env.ADMIN_CITY;
    const pc = process.env.ADMIN_PC;

    await queryInterface.bulkInsert('Users', [
      { 
        Name: "Admin",
        LastName: "",
        Password: hashedPassword,
        Email: email,
        IsSeller: 1,
        Role: 2,
        Address: adress,
        City: city,
        PostalCode: pc,
        createdAt: new Date(), 
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};