import EmployeeRepository from "../repositories/EmployeeRepository";
import Employee from "../models/Employee";
import { Request } from "express-serve-static-core";
import { CreateEmployeeDto } from "../dtos/CreateEmployeeDto";
import { plainToInstance } from "class-transformer";
import { UpdateEmployeeDto } from "../dtos/UpdateEmployeeDto";
import { UpdateEmployeeParamDto } from "../dtos/UpdateEmployeeParamDto";
import EmployeeProfileRepository, {
  EmployeeProfileRepository as EmployeeProfileRepositoryClass,
} from "../repositories/EmployeeProfileRepository";
import EmployeeFamilyRepository, {
  EmployeeFamilyRepository as EmployeeFamilyRepositoryClass,
} from "../repositories/EmployeeFamilyRepository";
import EducationRepository, {
  EducationRepository as EducationRepositoryClass,
} from "../repositories/EducationRepository";
import { DeleteEmployeeParamDto } from "../dtos/DeleteEmployeeParamDto";
import { CreateEmployeeFamilyDto } from "../dtos/CreateEmployeeFamilyDto";
import { validate } from "class-validator";
import { throwIfAnyDtoValidationErrors } from "../utils/throwIfAnyValidationErrors";
import { CreateEducationDto } from "../dtos/CreateEducationDto";
import { CreateEmployeeProfileDto } from "../dtos/CreateEmployeeProfileDto";

class EmployeeService {
  /**
   * Retrieves all employees from the database.
   * @returns {Promise<Employee[]>} A list of all employees.
   */
  async getAllEmployees(): Promise<Employee[]> {
    const employees = await EmployeeRepository.getAllEmployees();
    return employees;
  }

  /**
   * Retrieves an employee by their ID.
   * @param {Request} req - The request object containing `params.id` as the employee ID.
   * @returns {Promise<Employee>} The employee data.
   * @throws {string} If the employee is not found.
   */
  async getEmployeeById(req: Request): Promise<Employee> {
    const employee = await EmployeeRepository.getEmployeeById(
      parseInt(req.params.id)
    );
    if (!employee) {
      throw "Employee not found";
    }
    return employee;
  }

  /**
   * Creates a new employee along with optional profile, families, and education records.
   * @param {Request<{}, {}, CreateEmployeeDto>} req - The request object containing the new employee data.
   * @returns {Promise<Employee>} The created employee data.
   * @throws {string} If the employee creation fails.
   */
  async createEmployee(
    req: Request<{}, {}, CreateEmployeeDto>
  ): Promise<Employee> {
    const transaction = req.transaction;
    const newEmployee = await EmployeeRepository.createEmployee(
      req.body,
      transaction
    );
    if (!newEmployee) {
      throw "Fail to create employee";
    }

    const additionalData = {
      employee_id: newEmployee.id,
      created_by: newEmployee.created_by,
    };

    if (req.body.profile) {
      await EmployeeProfileRepository.createEmployeeProfile(
        {
          ...req.body.profile,
          ...additionalData,
        },
        transaction
      );
    }

    if (req.body.families && req.body.families.length > 0) {
      await Promise.all(
        req.body.families.map((family) =>
          EmployeeFamilyRepository.createEmployeeFamily(
            {
              ...family,
              ...additionalData,
            },
            transaction
          )
        )
      );
    }

    if (req.body.educations && req.body.educations.length > 0) {
      await Promise.all(
        req.body.educations.map((education) =>
          EducationRepository.createEducation(
            {
              ...education,
              ...additionalData,
            },
            transaction
          )
        )
      );
    }

    return (await EmployeeRepository.getEmployeeById(
      newEmployee.id,
      transaction
    )) as Employee;
  }

  /**
   * Updates an employee's details, including their profile, families, and education.
   * @param {Request<UpdateEmployeeParamDto, {}, UpdateEmployeeDto>} req - The request object containing updated employee data.
   * @returns {Promise<Employee>} The updated employee data.
   * @throws {string} If the employee update fails.
   */
  async updateEmployee(
    req: Request<UpdateEmployeeParamDto, {}, UpdateEmployeeDto>
  ) {
    const transaction = req.transaction;
    const updatedEmployee = await EmployeeRepository.updateEmployee(
      req.params.id,
      req.body,
      req.transaction
    );
    if (!updatedEmployee) {
      throw "Employee fail to updated";
    }

    const additionalUpdateData = {
      employee_id: updatedEmployee.id,
      created_by: updatedEmployee.updated_by,
    };
    const additionalCreateData = {
      employee_id: updatedEmployee.id,
      created_by: updatedEmployee.created_by,
    };
    if (req.body.profile) {
      await EmployeeProfileRepository.deleteEmployeeProfileByEmployeeId(
        updatedEmployee.id,
        transaction
      );
      const profile = req.body.profile;
      if (false) {
        // If profile id exist, it means do update process
        // await EmployeeProfileRepository.updateEmployeeProfile(
        //   profile.id,
        //   { ...profile, ...additionalUpdateData },
        //   transaction
        // );
        // Currently not used
      } else {
        // If profile id not exist, it means do create process
        const profileCreateDto = plainToInstance(
          CreateEmployeeProfileDto,
          profile
        );
        const validationErrors = await validate(profileCreateDto);
        throwIfAnyDtoValidationErrors(validationErrors);
        await EmployeeProfileRepository.createEmployeeProfile(
          {
            ...profileCreateDto,
            ...additionalCreateData,
          },
          transaction
        );
      }
    }

    if (req.body.families && req.body.families.length > 0) {
      await EmployeeFamilyRepository.deleteEmployeeFamilyByEmployeeId(
        updatedEmployee.id,
        transaction
      );
      await Promise.all(
        req.body.families.map(async (family) => {
          // If family id exist, it means do update process
          if (family.id) {
            // return EmployeeFamilyRepository.updateEmployeeFamily(
            //   family.id,
            //   { ...family, ...additionalUpdateData },
            //   transaction
            // );
            // Currently not used
          }
          // If family id not exist, it means do create process
          const familyCreateDto = plainToInstance(
            CreateEmployeeFamilyDto,
            family
          );
          const validationErrors = await validate(familyCreateDto);
          throwIfAnyDtoValidationErrors(validationErrors);
          return EmployeeFamilyRepository.createEmployeeFamily(
            {
              ...familyCreateDto,
              ...additionalCreateData,
            },
            transaction
          );
        })
      );
    }

    if (req.body.educations && req.body.educations.length > 0) {
      await EducationRepository.deleteEducationByEmployeeId(
        updatedEmployee.id,
        transaction
      );
      await Promise.all(
        req.body.educations.map(async (education) => {
          // If education id exist, it means do update process
          if (education.id) {
            // return EmployeeFamilyRepository.updateEmployeeFamily(
            //   education.id,
            //   { ...education, ...additionalUpdateData },
            //   transaction
            // );
            // Currently not used
          }
          // If education id not exist, it means do create process
          const educationCreateDto = plainToInstance(
            CreateEducationDto,
            education
          );
          const validationErrors = await validate(educationCreateDto);
          throwIfAnyDtoValidationErrors(validationErrors);
          return EducationRepository.createEducation(
            {
              ...educationCreateDto,
              ...additionalCreateData,
            },
            transaction
          );
        })
      );
    }

    return (await EmployeeRepository.getEmployeeById(
      updatedEmployee.id,
      transaction
    )) as Employee;
  }

  /**
   * Deletes an employee by their ID.
   * @param {Request<DeleteEmployeeParamDto>} req - The request object containing the employee ID in `params.id`.
   * @returns {Promise<boolean>} `true` if successfully deleted, `false` otherwise.
   */
  async deleteEmployee(req: Request<DeleteEmployeeParamDto>) {
    return await EmployeeRepository.deleteEmployee(
      req.params.id,
      req.transaction
    );
  }

  /**
   * Retrieves the employee reports.
   * @returns {Promise<any[]>} The formatted employee report data.
   */
  async employeeReports() {
    return await EmployeeRepository.getEmployeesReport();
  }
}

export default new EmployeeService();
