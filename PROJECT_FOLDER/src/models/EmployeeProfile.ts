import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Employee from "./Employee";
import { Gender } from "../enums/gender.enum";

class EmployeeProfile extends Model {
  public id!: number;
  public employee_id!: number;
  public place_of_birth?: string;
  public date_of_birth?: Date;
  public gender!: Gender;
  public is_married?: boolean;
  public prof_pict?: string;
  public created_by?: string;
  public updated_by?: string;
}

export const EmployeeProfileSchema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Employee, key: "id" },
    onDelete: "CASCADE",
    unique: true,
  },
  place_of_birth: { type: DataTypes.STRING },
  date_of_birth: { type: DataTypes.DATE },
  gender: {
    type: DataTypes.ENUM(...Object.values(Gender)),
    allowNull: false,
  },
  is_married: { type: DataTypes.BOOLEAN, defaultValue: false },
  prof_pict: { type: DataTypes.STRING },
  created_by: { type: DataTypes.STRING },
  updated_by: { type: DataTypes.STRING },
};

EmployeeProfile.init(EmployeeProfileSchema, {
  sequelize,
  tableName: "employee_profile",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export const tableName = EmployeeProfile.tableName;

export default EmployeeProfile;
