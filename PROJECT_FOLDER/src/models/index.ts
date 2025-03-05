import sequelize from "../config/database";
import Employee from "./Employee";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeFamily from "./EmployeeFamily";
import Education from "./Education";

Employee.hasMany(Education, { foreignKey: "employee_id", as: "educations" });
Education.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });

Employee.hasOne(EmployeeProfile, { foreignKey: "employee_id", as: "profile" });
EmployeeProfile.belongsTo(Employee, {
  foreignKey: "employee_id",
  as: "employee",
});

Employee.hasMany(EmployeeFamily, { foreignKey: "employee_id", as: "families" });
EmployeeFamily.belongsTo(Employee, {
  foreignKey: "employee_id",
  as: "employee",
});

const models = { Employee, EmployeeProfile, EmployeeFamily, Education };

const initDB = async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synced!");
};

export { initDB };
export default models;
