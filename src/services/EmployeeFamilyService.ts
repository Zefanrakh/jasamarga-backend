import EmployeeFamilyRepository from "../repositories/EmployeeFamilyRepository";
import EmployeeFamily from "../models/EmployeeFamily";
import { Request } from "express-serve-static-core";
import { CreateDirectEmployeeFamilyDto } from "../dtos/CreateEmployeeFamilyDto";
import { UpdateDirectEmployeeFamilyDto } from "../dtos/UpdateEmployeeFamilyDto";
import { UpdateEmployeeFamilyParamDto } from "../dtos/UpdateEmployeeFamilyParamDto";
import { DeleteEmployeeFamilyParamDto } from "../dtos/DeleteEmployeeFamilyParamDto";

class EmployeeFamilyService {
  /**
   * Retrieves all employee family records from the database.
   * @returns {Promise<EmployeeFamily[]>} A list of all employee family records.
   */
  async getAllEmployeeFamilies(): Promise<EmployeeFamily[]> {
    const employeeFamilies =
      await EmployeeFamilyRepository.getAllEmployeeFamilies();
    return employeeFamilies;
  }

  /**
   * Retrieves an employee family record by its ID.
   * @param {Request} req - The request object containing `params.id` as the employee family ID.
   * @returns {Promise<EmployeeFamily>} The employee family data.
   * @throws {string} If the employee family record is not found.
   */
  async getEmployeeFamilyById(req: Request): Promise<EmployeeFamily> {
    const employeeFamily = await EmployeeFamilyRepository.getEmployeeFamilyById(
      parseInt(req.params.id)
    );
    if (!employeeFamily) {
      throw "Employee family not found";
    }
    return employeeFamily;
  }

  /**
   * Creates a new employee family record.
   * @param {Request<{}, {}, CreateDirectEmployeeFamilyDto>} req - The request object containing the new employee family data.
   * @returns {Promise<EmployeeFamily>} The created employee family record.
   * @throws {string} If the employee family creation fails.
   */
  async createEmployeeFamily(
    req: Request<{}, {}, CreateDirectEmployeeFamilyDto>
  ): Promise<EmployeeFamily> {
    const newEmployeeFamily =
      await EmployeeFamilyRepository.createEmployeeFamily(
        req.body,
        req.transaction
      );
    if (!newEmployeeFamily) {
      throw "Fail to create employee family";
    }
    return newEmployeeFamily;
  }

  /**
   * Updates an existing employee family record.
   * @param {Request<UpdateEmployeeFamilyParamDto, {}, UpdateDirectEmployeeFamilyDto>} req - The request object containing updated employee family data.
   * @returns {Promise<EmployeeFamily>} The updated employee family record.
   * @throws {string} If the employee family update fails.
   */
  async updateEmployeeFamily(
    req: Request<
      UpdateEmployeeFamilyParamDto,
      {},
      UpdateDirectEmployeeFamilyDto
    >
  ) {
    const updatedEmployeeFamily =
      await EmployeeFamilyRepository.updateEmployeeFamily(
        req.params.id,
        req.body,
        req.transaction
      );
    if (!updatedEmployeeFamily) {
      throw "Employee family fail to updated";
    }
    return updatedEmployeeFamily;
  }

  /**
   * Deletes an employee family record by its ID.
   * @param {Request<DeleteEmployeeFamilyParamDto>} req - The request object containing `params.id` as the employee family ID.
   * @returns {Promise<boolean>} `true` if the employee family record was successfully deleted, `false` otherwise.
   */
  async deleteEmployeeProfile(req: Request<DeleteEmployeeFamilyParamDto>) {
    return await EmployeeFamilyRepository.deleteEmployeeFamily(
      req.params.id,
      req.transaction
    );
  }
}

export default new EmployeeFamilyService();
