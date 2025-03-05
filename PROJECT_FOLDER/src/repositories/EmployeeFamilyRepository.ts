import { CreateDirectEmployeeFamilyDto } from "../dtos/CreateEmployeeFamilyDto";
import EmployeeFamily from "../models/EmployeeFamily";
import { Transaction } from "sequelize";

export class EmployeeFamilyRepository {
  async createEmployeeFamily(
    data: CreateDirectEmployeeFamilyDto,
    transaction?: Transaction
  ) {
    return await EmployeeFamily.create({ ...data }, { transaction });
  }

  async getEmployeeFamilyById(id: number) {
    return await EmployeeFamily.findByPk(id);
  }

  async getAllEmployeeFamilies() {
    return await EmployeeFamily.findAll();
  }

  async updateEmployeeFamily(id: number, data: any, transaction?: Transaction) {
    const updated = await EmployeeFamily.update(data, {
      where: { id },
      transaction,
    });
    if (updated) {
      return await EmployeeFamily.findByPk(id, { transaction });
    }
    throw "Employee family not found";
  }

  async deleteEmployeeFamily(id: number, transaction?: Transaction) {
    return await EmployeeFamily.destroy({ where: { id }, transaction });
  }

  async deleteEmployeeFamilyByEmployeeId(
    employee_id: number,
    transaction?: Transaction
  ) {
    return await EmployeeFamily.destroy({
      where: { employee_id },
      transaction,
    });
  }
}

export default new EmployeeFamilyRepository();
