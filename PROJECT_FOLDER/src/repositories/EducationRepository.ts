import { CreateDirectEducationDto } from "../dtos/CreateEducationDto";
import Education from "../models/Education";
import { FindOptions, Transaction } from "sequelize";

export class EducationRepository {
  async createEducation(
    data: CreateDirectEducationDto,
    transaction?: Transaction
  ) {
    return await Education.create({ ...data }, { transaction });
  }

  async getEducationById(id: number) {
    return await Education.findByPk(id);
  }

  async getAllEducations(options: FindOptions<Education>) {
    return await Education.findAll(options);
  }

  async updateEducation(id: number, data: any, transaction?: Transaction) {
    const updated = await Education.update(data, {
      where: { id },
      transaction,
    });
    if (updated) {
      return await Education.findByPk(id, { transaction });
    }
    throw "Education not found";
  }

  async deleteEducation(id: number, transaction?: Transaction) {
    return await Education.destroy({ where: { id }, transaction });
  }

  async deleteEducationByEmployeeId(
    employee_id: number,
    transaction?: Transaction
  ) {
    return await Education.destroy({ where: { employee_id }, transaction });
  }
}

export default new EducationRepository();
