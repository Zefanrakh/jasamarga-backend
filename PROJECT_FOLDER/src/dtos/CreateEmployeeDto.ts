import "reflect-metadata";
import { Type } from "class-transformer";
import {
  IsString,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsArray,
} from "class-validator";
import { CreateEmployeeProfileDto } from "./CreateEmployeeProfileDto";
import { CreateEmployeeFamilyDto } from "./CreateEmployeeFamilyDto";
import { CreateEducationDto } from "./CreateEducationDto";

export class CreateEmployeeDto {
  @IsString()
  @IsOptional()
  nik?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsDateString()
  @IsNotEmpty()
  start_date!: string;

  @IsDateString()
  @IsOptional()
  end_date?: string = "9999-12-31";

  @IsString()
  @IsOptional()
  created_by?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateEmployeeProfileDto)
  profile?: CreateEmployeeProfileDto;

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => CreateEmployeeFamilyDto)
  families?: CreateEmployeeFamilyDto[];

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => CreateEducationDto)
  educations?: CreateEducationDto[];
}
