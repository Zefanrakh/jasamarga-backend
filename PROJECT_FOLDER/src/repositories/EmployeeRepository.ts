import { CreateEmployeeDto } from "../dtos/CreateEmployeeDto";
import Employee from "../models/Employee";
import { QueryTypes, Transaction } from "sequelize";
import Models from "../models";
import sequelize from "../config/database";
const { EmployeeFamily, Education, EmployeeProfile } = Models;

class EmployeeRepository {
  async createEmployee(data: CreateEmployeeDto, transaction?: Transaction) {
    return await Employee.create({ ...data }, { transaction });
  }

  async getEmployeeById(id: number, transaction?: Transaction) {
    return await Employee.findOne({
      where: { id },
      include: [
        { model: EmployeeFamily, as: "families" },
        { model: EmployeeProfile, as: "profile" },
        { model: Education, as: "educations" },
      ],
      transaction,
    });
  }

  async getAllEmployees() {
    return await Employee.findAll();
  }

  async updateEmployee(id: number, data: any, transaction?: Transaction) {
    const updated = await Employee.update(data, { where: { id }, transaction });
    if (updated) {
      return await Employee.findByPk(id, { transaction });
    }
    throw "Employee not found";
  }

  async deleteEmployee(id: number, transaction?: Transaction) {
    return await Employee.destroy({ where: { id }, transaction });
  }

  async getEmployeesReport() {
    const query = `
      SELECT 
          e.id AS employee_id,
          e.nik,
          e.name,
          e.is_active,
          ep.gender,
          CONCAT(EXTRACT(YEAR FROM AGE(ep.date_of_birth)), ' Years Old') AS age,
          ed.name AS school_name,
          ed.level,
          COALESCE(family_data.family_info, '-') AS family_data
      FROM employee e
      LEFT JOIN employee_profile ep ON e.id = ep.employee_id
      LEFT JOIN education ed ON e.id = ed.employee_id
      LEFT JOIN (
          SELECT employee_id, 
                STRING_AGG(CONCAT(relation_status, ' ', total), ', ') AS family_info
          FROM (
              SELECT employee_id, relation_status, COUNT(*) AS total
              FROM employee_family
              GROUP BY employee_id, relation_status
          ) subquery
          GROUP BY employee_id
      ) family_data ON e.id = family_data.employee_id;

    `;

    return await sequelize.query(query, { type: QueryTypes.SELECT });
  }
}

export default new EmployeeRepository();
