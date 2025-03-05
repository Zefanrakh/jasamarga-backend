import { Request, Response, NextFunction } from "express-serve-static-core";
import EmployeeRepository from "../repositories/EmployeeRepository";
import EmployeeService from "../services/EmployeeService";
import { UpdateEmployeeParamDto } from "../dtos/UpdateEmployeeParamDto";
import { UpdateEmployeeDto } from "../dtos/UpdateEmployeeDto";
import { CreateEmployeeDto } from "../dtos/CreateEmployeeDto";

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employee = await EmployeeService.getEmployeeById(req);
    res.json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

export const getAllEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await EmployeeRepository.getAllEmployees();
    res.json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (
  req: Request<{}, {}, CreateEmployeeDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newEmployee = await EmployeeService.createEmployee(req);
    await req.transaction?.commit();
    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (
  req: Request<UpdateEmployeeParamDto, {}, UpdateEmployeeDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    await EmployeeService.updateEmployee(req);
    await req.transaction?.commit();
    res.json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await EmployeeRepository.deleteEmployee(
      parseInt(req.params.id),
      req.transaction
    );
    if (!deleted) {
      throw "Employee not found";
    }
    await req.transaction?.commit();
    res.json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getEmployeesReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employees = await EmployeeRepository.getEmployeesReport();
    res.json({ success: true, data: employees });
  } catch (error) {
    next(error);
  }
};
