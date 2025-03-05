import express from "express";
import {
  createEmployeeFamily,
  getEmployeeFamilyById,
  getAllEmployeeFamilies,
  updateEmployeeFamily,
  deleteEmployeeFamily,
} from "../controllers/EmployeeFamilyController";
import { cleanRequestBody } from "../middlewares/cleanRequest";
import { validateDto } from "../middlewares/validateDto";
import { CreateEmployeeFamilyDto } from "../dtos/CreateEmployeeFamilyDto";
import { UpdateDirectEmployeeFamilyDto } from "../dtos/UpdateEmployeeFamilyDto";

const router = express.Router();

router.get("/", getAllEmployeeFamilies);
router.get("/:id", getEmployeeFamilyById);
router.post("/", validateDto(CreateEmployeeFamilyDto), createEmployeeFamily);
router.put(
  "/:id",
  cleanRequestBody,
  validateDto(UpdateDirectEmployeeFamilyDto),
  updateEmployeeFamily
);
router.delete("/:id", deleteEmployeeFamily);

export default router;
