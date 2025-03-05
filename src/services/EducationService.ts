import EducationRepository from "../repositories/EducationRepository";
import Education from "../models/Education";
import { Request } from "express-serve-static-core";
import { CreateDirectEducationDto } from "../dtos/CreateEducationDto";
import { UpdateDirectEducationDto } from "../dtos/UpdateEducationDto";
import { UpdateEducationParamDto } from "../dtos/UpdateEducationParamDto";
import { DeleteEducationParamDto } from "../dtos/DeleteEducationParamDto";

class EducationService {
  /**
   * Retrieves all education records from the database.
   * @returns {Promise<Education[]>} A list of all education records.
   */
  async getAllEducations(): Promise<Education[]> {
    const employees = await EducationRepository.getAllEducations({});
    return employees;
  }

  /**
   * Retrieves an education record by its ID.
   * @param {Request} req - The request object containing `params.id` as the education ID.
   * @returns {Promise<Education>} The education record.
   * @throws {string} If the education record is not found.
   */
  async getEducationById(req: Request): Promise<Education> {
    const employee = await EducationRepository.getEducationById(
      parseInt(req.params.id)
    );
    if (!employee) {
      throw "Education not found";
    }
    return employee;
  }

  /**
   * Creates a new education record.
   * @param {Request<{}, {}, CreateDirectEducationDto>} req - The request object containing the new education data.
   * @returns {Promise<Education>} The created education record.
   * @throws {string} If the education record creation fails.
   */
  async createEducation(
    req: Request<{}, {}, CreateDirectEducationDto>
  ): Promise<Education> {
    const newEducation = await EducationRepository.createEducation(
      req.body,
      req.transaction
    );
    if (!newEducation) {
      throw "Fail to create employee";
    }
    return newEducation;
  }

  /**
   * Updates an existing education record.
   * @param {Request<UpdateEducationParamDto, {}, UpdateDirectEducationDto>} req - The request object containing updated education data.
   * @returns {Promise<Education>} The updated education record.
   * @throws {string} If the education record update fails.
   */
  async updateEducation(
    req: Request<UpdateEducationParamDto, {}, UpdateDirectEducationDto>
  ) {
    const updatedEducation = await EducationRepository.updateEducation(
      req.params.id,
      req.body,
      req.transaction
    );
    if (!updatedEducation) {
      throw "Education fail to updated";
    }
    return updatedEducation;
  }

  /**
   * Deletes an education record by its ID.
   * @param {Request<DeleteEducationParamDto>} req - The request object containing `params.id` as the education ID.
   * @returns {Promise<boolean>} `true` if the education record was successfully deleted, `false` otherwise.
   */
  async deleteEducation(req: Request<DeleteEducationParamDto>) {
    return await EducationRepository.deleteEducation(
      req.params.id,
      req.transaction
    );
  }
}

export default new EducationService();
