import express from "express";
import {
  createEducation,
  getEducationById,
  getAllEducations,
  updateEducation,
  deleteEducation,
} from "../controllers/EducationController";
import { cleanRequestBody } from "../middlewares/cleanRequest";
import { validateDto } from "../middlewares/validateDto";
import { CreateEducationDto } from "../dtos/CreateEducationDto";
import { UpdateDirectEducationDto } from "../dtos/UpdateEducationDto";

const router = express.Router();

router.get("/", getAllEducations);
router.get("/:id", getEducationById);
router.post("/", validateDto(CreateEducationDto), createEducation);
router.put(
  "/:id",
  cleanRequestBody,
  validateDto(UpdateDirectEducationDto),
  updateEducation
);
router.delete("/:id", deleteEducation);

export default router;
