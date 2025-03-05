'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employee', [
      {
        id: 1,
        nik: '11012',
        name: 'Budi',
        is_active: true,
        start_date: '2022-12-12',
        end_date: '2029-12-12',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
      },
      {
        id: 2,
        nik: '11013',
        name: 'Jarot',
        is_active: true,
        start_date: '2021-09-01',
        end_date: '2028-09-01',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: 'system',
        updated_by: 'system',
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee', {});
  }
};
