import { Request, Response, NextFunction } from "express-serve-static-core";
import EmployeeFamilyRepository from "../repositories/EmployeeFamilyRepository";
import EmployeeFamilyService from "../services/EmployeeFamilyService";
import { UpdateEmployeeFamilyParamDto } from "../dtos/UpdateEmployeeFamilyParamDto";
import { UpdateDirectEmployeeFamilyDto } from "../dtos/UpdateEmployeeFamilyDto";
import { CreateDirectEmployeeFamilyDto } from "../dtos/CreateEmployeeFamilyDto";

export const getEmployeeFamilyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employeeFamily = await EmployeeFamilyService.getEmployeeFamilyById(
      req
    );
    res.json({ success: true, data: employeeFamily });
  } catch (error) {
    next(error);
  }
};

export const getAllEmployeeFamilies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employeeFamilies =
      await EmployeeFamilyRepository.getAllEmployeeFamilies();
    res.json({ success: true, data: employeeFamilies });
  } catch (error) {
    next(error);
  }
};

export const createEmployeeFamily = async (
  req: Request<{}, {}, CreateDirectEmployeeFamilyDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newEmployeeFamily = await EmployeeFamilyService.createEmployeeFamily(
      req
    );
    await req.transaction?.commit();
    res.status(201).json({ success: true, data: newEmployeeFamily });
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeFamily = async (
  req: Request<UpdateEmployeeFamilyParamDto, {}, UpdateDirectEmployeeFamilyDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    await EmployeeFamilyService.updateEmployeeFamily(req);
    await req.transaction?.commit();
    res.json({ success: true, message: "EmployeeFamily updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployeeFamily = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await EmployeeFamilyRepository.deleteEmployeeFamily(
      parseInt(req.params.id),
      req.transaction
    );
    if (!deleted) {
      throw "Employee family not found";
    }
    await req.transaction?.commit();
    res.json({
      success: true,
      message: "Employee family deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
