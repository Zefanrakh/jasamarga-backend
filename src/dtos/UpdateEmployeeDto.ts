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
import {
  UpdateEmployeeProfileByBodyIdDto,
  UpdateEmployeeProfileDto,
} from "./UpdateEmployeeProfileDto";
import {
  UpdateEmployeeFamilyByBodyIdDto,
  UpdateEmployeeFamilyDto,
} from "./UpdateEmployeeFamilyDto";
import {
  UpdateEducationByBodyIdDto,
  UpdateEducationDto,
} from "./UpdateEducationDto";

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  nik?: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsDateString()
  @IsNotEmpty()
  start_date?: string;

  @IsDateString()
  @IsOptional()
  end_date?: string;

  @IsString()
  @IsOptional()
  created_by?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateEmployeeProfileByBodyIdDto)
  profile?: UpdateEmployeeProfileByBodyIdDto;

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => UpdateEmployeeFamilyByBodyIdDto)
  families?: UpdateEmployeeFamilyByBodyIdDto[];

  @ValidateNested({ each: true })
  @IsOptional()
  @IsArray()
  @Type(() => UpdateEducationByBodyIdDto)
  educations?: UpdateEducationByBodyIdDto[];
}
