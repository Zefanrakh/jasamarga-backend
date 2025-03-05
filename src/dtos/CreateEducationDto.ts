import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsInt,
} from "class-validator";
import { EducationLevel } from "../enums/education.enum";

export class CreateEducationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(EducationLevel)
  @IsNotEmpty()
  level!: EducationLevel;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateDirectEducationDto extends CreateEducationDto {
  @IsInt()
  @IsNotEmpty()
  employee_id!: number;

  @IsString()
  @IsOptional()
  created_by?: string;
}
