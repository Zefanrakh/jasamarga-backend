import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class Employee extends Model {
  public id!: number;
  public nik?: string;
  public name?: string;
  public is_active?: boolean;
  public start_date!: Date;
  public end_date!: Date;
  public created_by?: string;
  public updated_by?: string;
}

export const EmployeeSchema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nik: { type: DataTypes.STRING, unique: true },
  name: { type: DataTypes.STRING },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  start_date: { type: DataTypes.DATE, allowNull: false },
  end_date: { type: DataTypes.DATE, allowNull: false },
  created_by: { type: DataTypes.STRING },
  updated_by: { type: DataTypes.STRING },
};

Employee.init(EmployeeSchema, {
  sequelize,
  tableName: "employee",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export const tableName = Employee.tableName;

export default Employee;
