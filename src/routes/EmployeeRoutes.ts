import express from "express";
import {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeesReport,
} from "../controllers/EmployeeController";
import { cleanRequestBody } from "../middlewares/cleanRequest";
import { validateDto } from "../middlewares/validateDto";
import { CreateEmployeeDto } from "../dtos/CreateEmployeeDto";
import { UpdateEmployeeDto } from "../dtos/UpdateEmployeeDto";

const router = express.Router();

router.get("/", getAllEmployees);
router.get("/report", getEmployeesReport);
router.get("/:id", getEmployeeById);
router.post("/", validateDto(CreateEmployeeDto), createEmployee);
router.put(
  "/:id",
  cleanRequestBody,
  validateDto(UpdateEmployeeDto),
  updateEmployee
);
router.delete("/:id", deleteEmployee);

export default router;
