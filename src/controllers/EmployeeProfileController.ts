import { Request, Response, NextFunction } from "express-serve-static-core";
import EmployeeProfileRepository from "../repositories/EmployeeProfileRepository";
import EmployeeProfileService from "../services/EmployeeProfileService";
import { UpdateEmployeeProfileParamDto } from "../dtos/UpdateEmployeeProfileParamDto";
import { UpdateDirectEmployeeProfileDto } from "../dtos/UpdateEmployeeProfileDto";
import { CreateDirectEmployeeProfileDto } from "../dtos/CreateEmployeeProfileDto";

export const getEmployeeProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employeeProfile = await EmployeeProfileService.getEmployeeProfileById(
      req
    );
    res.json({ success: true, data: employeeProfile });
  } catch (error) {
    next(error);
  }
};

export const getAllEmployeeProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employeeProfiles =
      await EmployeeProfileRepository.getAllEmployeeProfiles();
    res.json({ success: true, data: employeeProfiles });
  } catch (error) {
    next(error);
  }
};

export const createEmployeeProfile = async (
  req: Request<{}, {}, CreateDirectEmployeeProfileDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newEmployeeProfile =
      await EmployeeProfileService.createEmployeeProfile(req);
    await req.transaction?.commit();
    res.status(201).json({ success: true, data: newEmployeeProfile });
  } catch (error) {
    next(error);
  }
};

export const updateEmployeeProfile = async (
  req: Request<UpdateEmployeeProfileParamDto, {}, UpdateDirectEmployeeProfileDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    await EmployeeProfileService.updateEmployeeProfile(req);
    await req.transaction?.commit();
    res.json({
      success: true,
      message: "EmployeeProfile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployeeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await EmployeeProfileRepository.deleteEmployeeProfile(
      parseInt(req.params.id),
      req.transaction
    );
    if (!deleted) {
      throw "EmployeeProfile not found";
    }
    await req.transaction?.commit();
    res.json({
      success: true,
      message: "EmployeeProfile deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
