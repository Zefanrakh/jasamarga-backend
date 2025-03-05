import EmployeeProfileRepository from "../repositories/EmployeeProfileRepository";
import EmployeeProfile from "../models/EmployeeProfile";
import { Request } from "express-serve-static-core";
import { CreateDirectEmployeeProfileDto } from "../dtos/CreateEmployeeProfileDto";
import { UpdateDirectEmployeeProfileDto } from "../dtos/UpdateEmployeeProfileDto";
import { UpdateEmployeeProfileParamDto } from "../dtos/UpdateEmployeeProfileParamDto";
import { DeleteEmployeeProfileParamDto } from "../dtos/DeleteEmployeeProfileParamDto";

class EmployeeProfileService {
  /**
   * Retrieves all employee profiles from the database.
   * @returns {Promise<EmployeeProfile[]>} A list of all employee profiles.
   */
  async getAllEmployeeProfiles(): Promise<EmployeeProfile[]> {
    const employeeProfiles =
      await EmployeeProfileRepository.getAllEmployeeProfiles();
    return employeeProfiles;
  }

  /**
   * Retrieves an employee profile by its ID.
   * @param {Request} req - The request object containing `params.id` as the employee profile ID.
   * @returns {Promise<EmployeeProfile>} The employee profile data.
   * @throws {string} If the employee profile is not found.
   */
  async getEmployeeProfileById(req: Request): Promise<EmployeeProfile> {
    const employeeProfile =
      await EmployeeProfileRepository.getEmployeeProfileById(
        parseInt(req.params.id)
      );
    if (!employeeProfile) {
      throw "Employee profile not found";
    }
    return employeeProfile;
  }

  /**
   * Creates a new employee profile.
   * @param {Request<{}, {}, CreateDirectEmployeeProfileDto>} req - The request object containing the new employee profile data.
   * @returns {Promise<EmployeeProfile>} The created employee profile.
   * @throws {string} If the employee profile creation fails.
   */
  async createEmployeeProfile(
    req: Request<{}, {}, CreateDirectEmployeeProfileDto>
  ): Promise<EmployeeProfile> {
    const newEmployeeProfile =
      await EmployeeProfileRepository.createEmployeeProfile(
        req.body,
        req.transaction
      );
    if (!newEmployeeProfile) {
      throw "Fail to create employee profile";
    }
    return newEmployeeProfile;
  }

  /**
   * Updates an existing employee profile.
   * @param {Request<UpdateEmployeeProfileParamDto, {}, UpdateDirectEmployeeProfileDto>} req - The request object containing updated employee profile data.
   * @returns {Promise<EmployeeProfile>} The updated employee profile.
   * @throws {string} If the employee profile update fails.
   */
  async updateEmployeeProfile(
    req: Request<
      UpdateEmployeeProfileParamDto,
      {},
      UpdateDirectEmployeeProfileDto
    >
  ) {
    const updatedEmployeeProfile =
      await EmployeeProfileRepository.updateEmployeeProfile(
        req.params.id,
        req.body,
        req.transaction
      );
    if (!updatedEmployeeProfile) {
      throw "Employee profile fail to updated";
    }
    return updatedEmployeeProfile;
  }

  /**
   * Deletes an employee profile by its ID.
   * @param {Request<DeleteEmployeeProfileParamDto>} req - The request object containing `params.id` as the employee profile ID.
   * @returns {Promise<boolean>} `true` if the employee profile was successfully deleted, `false` otherwise.
   */
  async deleteEmployeeProfile(req: Request<DeleteEmployeeProfileParamDto>) {
    return await EmployeeProfileRepository.deleteEmployeeProfile(
      req.params.id,
      req.transaction
    );
  }
}

export default new EmployeeProfileService();
