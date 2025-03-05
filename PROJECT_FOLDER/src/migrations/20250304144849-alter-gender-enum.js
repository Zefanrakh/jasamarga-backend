'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_employee_profile_gender" RENAME TO "enum_employee_profile_gender_old";
      CREATE TYPE "enum_employee_profile_gender" AS ENUM ('Laki-Laki', 'Perempuan');
      ALTER TABLE employee_profile ALTER COLUMN gender TYPE "enum_employee_profile_gender" USING gender::text::"enum_employee_profile_gender";
      DROP TYPE "enum_employee_profile_gender_old";`)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_employee_profile_gender" RENAME TO "enum_employee_profile_gender_old";
      CREATE TYPE "enum_employee_profile_gender" AS ENUM ('Laki-Lali', 'Perempuan');
      ALTER TABLE employee_profile ALTER COLUMN gender TYPE "enum_employee_profile_gender" USING gender::text::"enum_employee_profile_gender";
      DROP TYPE "enum_employee_profile_gender_old";
    `);
  }
};
