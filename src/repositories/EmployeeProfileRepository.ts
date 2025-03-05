import { CreateDirectEmployeeProfileDto } from "../dtos/CreateEmployeeProfileDto";
import EmployeeProfile from "../models/EmployeeProfile";
import { Transaction } from "sequelize";

export class EmployeeProfileRepository {
  async createEmployeeProfile(
    data: CreateDirectEmployeeProfileDto,
    transaction?: Transaction
  ) {
    return await EmployeeProfile.create({ ...data }, { transaction });
  }

  async getEmployeeProfileById(id: number) {
    return await EmployeeProfile.findByPk(id);
  }

  async getAllEmployeeProfiles() {
    return await EmployeeProfile.findAll();
  }

  async updateEmployeeProfile(
    id: number,
    data: any,
    transaction?: Transaction
  ) {
    const updated = await EmployeeProfile.update(data, {
      where: { id },
      transaction,
    });
    if (updated) {
      return await EmployeeProfile.findByPk(id, { transaction });
    }
    throw "Employee profile not found";
  }

  async deleteEmployeeProfile(id: number, transaction?: Transaction) {
    return await EmployeeProfile.destroy({ where: { id }, transaction });
  }

  async deleteEmployeeProfileByEmployeeId(
    employee_id: number,
    transaction?: Transaction
  ) {
    return await EmployeeProfile.destroy({
      where: { employee_id },
      transaction,
    });
  }
}

export default new EmployeeProfileRepository();
