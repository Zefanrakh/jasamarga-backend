import express from "express";
import {
  createEmployeeProfile,
  getEmployeeProfileById,
  getAllEmployeeProfiles,
  updateEmployeeProfile,
  deleteEmployeeProfile,
} from "../controllers/EmployeeProfileController";
import { cleanRequestBody } from "../middlewares/cleanRequest";
import { validateDto } from "../middlewares/validateDto";
import { CreateEmployeeProfileDto } from "../dtos/CreateEmployeeProfileDto";
import { UpdateDirectEmployeeProfileDto } from "../dtos/UpdateEmployeeProfileDto";

const router = express.Router();

router.get("/", getAllEmployeeProfiles);
router.get("/:id", getEmployeeProfileById);
router.post("/", validateDto(CreateEmployeeProfileDto), createEmployeeProfile);
router.put(
  "/:id",
  cleanRequestBody,
  validateDto(UpdateDirectEmployeeProfileDto),
  updateEmployeeProfile
);
router.delete("/:id", deleteEmployeeProfile);

export default router;
