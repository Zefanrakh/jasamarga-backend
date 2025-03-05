import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsInt,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { Gender } from "../enums/gender.enum";

export class CreateEmployeeProfileDto {
  @IsString()
  @IsOptional()
  place_of_birth?: string;

  @IsDateString()
  @IsOptional()
  date_of_birth?: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender!: Gender;

  @IsBoolean()
  @IsOptional()
  is_married?: boolean = false;

  @IsString()
  @IsOptional()
  prof_pict?: string;
}

export class CreateDirectEmployeeProfileDto extends CreateEmployeeProfileDto {
  @IsInt()
  @IsNotEmpty()
  employee_id!: number;

  @IsString()
  @IsOptional()
  created_by?: string;
}
