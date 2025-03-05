'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("employee_profile", "gender", {
      type: Sequelize.ENUM("Laki-Laki", "Perempuan"),
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("employee_profile", "gender", {
      type: Sequelize.ENUM("Laki-Lali", "Perempuan"),
      allowNull: false,
    });
  }
};
