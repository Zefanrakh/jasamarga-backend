'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("employee_profile", {
      fields: ["employee_id"],
      type: "unique",
      name: "unique_employee_id_employee_profile"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("employee_profile", "unique_employee_id_employee_profile");
  }
};
