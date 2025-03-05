import express from "express";
import cors from "cors";
import { startTransaction } from "./middlewares/transaction";
import { errorHandler } from "./middlewares/errorHandler";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import EmployeeProfileRoutes from "./routes/EmployeeProfileRoutes";
import EmployeeFamilyRoutes from "./routes/EmployeeFamilyRoutes";
import EducationRoutes from "./routes/EducationRoutes";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(startTransaction);

  app.use("/employee", EmployeeRoutes);
  app.use("/employee-profile", EmployeeProfileRoutes);
  app.use("/employee-family", EmployeeFamilyRoutes);
  app.use("/education", EducationRoutes);

  app.use(errorHandler);
  return app;
}
