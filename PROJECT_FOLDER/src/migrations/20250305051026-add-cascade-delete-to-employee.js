'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("employee_profile", "employee_id", {
      type: "INTEGER",
      allowNull: false,
      references: {
        model: "employee",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.changeColumn("employee_family", "employee_id", {
      type: "INTEGER",
      allowNull: false,
      references: {
        model: "employee",
        key: "id",
      },
      onDelete: "CASCADE",
    });

    await queryInterface.changeColumn("education", "employee_id", {
      type: "INTEGER",
      allowNull: false,
      references: {
        model: "employee",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("employee_profile", "employee_id", {
      type: "INTEGER",
      allowNull: false,
      references: {
        model: "employee",
        key: "id",
      },
      onDelete: "RESTRICT",
    });

    await queryInterface.changeColumn("employee_family", "employee_id", {
      type: "INTEGER",
      allowNull: false,
      references: {
        model: "employee",
        key: "id",
      },
      onDelete: "RESTRICT",
    });

    await queryInterface.changeColumn("education", "employee_id", {
      type: "INTEGER",
      allowNull: false,
      references: {
        model: "employee",
        key: "id",
      },
      onDelete: "RESTRICT",
    });
  }
};
