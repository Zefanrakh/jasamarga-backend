"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE employee_family DROP CONSTRAINT IF EXISTS employee_family_employee_id_fkey;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE employee_family
      ADD CONSTRAINT employee_family_employee_id_fkey
      FOREIGN KEY (employee_id) REFERENCES employee(id)
      ON DELETE CASCADE;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE employee_family DROP CONSTRAINT IF EXISTS employee_family_employee_id_fkey;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE employee_family
      ADD CONSTRAINT employee_family_employee_id_fkey
      FOREIGN KEY (employee_id) REFERENCES employee(id)
      ON DELETE RESTRICT;
    `);
  },
};
