import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Employee from "./Employee";
import { EducationLevel } from "../enums/education.enum";

class Education extends Model {
  public id!: number;
  public employee_id!: number;
  public name?: string;
  public level!: Education;
  public description?: string;
}

export const EducationSchema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Employee, key: "id" },
    onDelete: "CASCADE",
  },
  name: { type: DataTypes.STRING },
  level: {
    type: DataTypes.ENUM(...Object.values(EducationLevel)),
    allowNull: false,
  },
  description: { type: DataTypes.STRING },
  created_by: { type: DataTypes.STRING },
  updated_by: { type: DataTypes.STRING },
};

Education.init(EducationSchema, {
  sequelize,
  tableName: "education",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export const tableName = Education.tableName;

export default Education;
