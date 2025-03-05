import { Request, Response, NextFunction } from "express-serve-static-core";
import EducationRepository from "../repositories/EducationRepository";
import EducationService from "../services/EducationService";
import { UpdateEducationParamDto } from "../dtos/UpdateEducationParamDto";
import { UpdateDirectEducationDto } from "../dtos/UpdateEducationDto";
import { CreateDirectEducationDto } from "../dtos/CreateEducationDto";

export const getEducationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const education = await EducationService.getEducationById(req);
    res.json({ success: true, data: education });
  } catch (error) {
    next(error);
  }
};

export const getAllEducations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const educations = await EducationRepository.getAllEducations({});
    res.json({ success: true, data: educations });
  } catch (error) {
    next(error);
  }
};

export const createEducation = async (
  req: Request<{}, {}, CreateDirectEducationDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newEducation = await EducationService.createEducation(req);
    await req.transaction?.commit();
    res.status(201).json({ success: true, data: newEducation });
  } catch (error) {
    next(error);
  }
};

export const updateEducation = async (
  req: Request<UpdateEducationParamDto, {}, UpdateDirectEducationDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    await EducationService.updateEducation(req);
    await req.transaction?.commit();
    res.json({ success: true, message: "Education updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteEducation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleted = await EducationRepository.deleteEducation(
      parseInt(req.params.id),
      req.transaction
    );
    if (!deleted) {
      throw "Education not found";
    }
    await req.transaction?.commit();
    res.json({ success: true, message: "Education deleted successfully" });
  } catch (error) {
    next(error);
  }
};
