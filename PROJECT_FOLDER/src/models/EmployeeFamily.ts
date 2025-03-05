import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import Employee from "./Employee";
import { Religion } from "../enums/religion.enum";
import { RelationStatus } from "../enums/relationStatus.enum";

class EmployeeFamily extends Model {
  public id!: number;
  public employee_id!: number;
  public name?: string;
  public identifier?: string;
  public job?: string;
  public place_of_birth?: string;
  public date_of_birth?: Date;
  public religion!: Religion;
  public is_life?: boolean;
  public is_divorced?: boolean;
  public relation_status!: RelationStatus;
  public created_by?: string;
  public updated_by?: string;
}

export const EmployeeFamilySchema = {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Employee, key: "id" },
    onDelete: "CASCADE",
  },
  name: { type: DataTypes.STRING },
  identifier: { type: DataTypes.STRING },
  job: { type: DataTypes.STRING },
  place_of_birth: { type: DataTypes.STRING },
  date_of_birth: { type: DataTypes.DATE },
  religion: {
    type: DataTypes.ENUM(...Object.values(Religion)),
    allowNull: false,
  },
  is_life: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_divorced: { type: DataTypes.BOOLEAN },
  relation_status: {
    type: DataTypes.ENUM(...Object.values(RelationStatus)),
    allowNull: false,
  },
  created_by: { type: DataTypes.STRING },
  updated_by: { type: DataTypes.STRING },
};

EmployeeFamily.init(EmployeeFamilySchema, {
  sequelize,
  tableName: "employee_family",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export const tableName = EmployeeFamily.tableName;

export default EmployeeFamily;
