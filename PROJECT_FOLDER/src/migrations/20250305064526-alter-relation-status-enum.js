'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_employee_family_relation_status" RENAME TO "enum_employee_family_relation_status_old";
      CREATE TYPE "enum_employee_family_relation_status" AS ENUM ('Suami', 'Istri', 'Anak', 'Anak Sambung', 'Ibu', 'Ayah');
      ALTER TABLE employee_family ALTER COLUMN relation_status TYPE "enum_employee_family_relation_status" USING relation_status::text::"enum_employee_family_relation_status";
      DROP TYPE "enum_employee_family_relation_status_old";`)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_employee_family_relation_status" RENAME TO "enum_employee_family_relation_status_old";
      CREATE TYPE "enum_employee_family_relation_status" AS ENUM ('Suami', 'Istri', 'Anak', 'Anak Sambung');
      ALTER TABLE employee_family ALTER COLUMN relation_status TYPE "enum_employee_family_relation_status" USING relation_status::text::"enum_employee_family_relation_status";
      DROP TYPE "enum_employee_family_relation_status_old";
    `);
  }
};
