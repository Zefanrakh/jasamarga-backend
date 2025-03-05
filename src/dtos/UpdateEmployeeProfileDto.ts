import {
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
} from "class-validator";
import { Gender } from "../enums/gender.enum";

export class UpdateEmployeeProfileDto {
  @IsString()
  @IsOptional()
  place_of_birth?: string;

  @IsDateString()
  @IsOptional()
  date_of_birth?: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @IsBoolean()
  @IsOptional()
  is_married?: boolean;

  @IsString()
  @IsOptional()
  prof_pict?: string;
}

export class UpdateEmployeeProfileByBodyIdDto extends UpdateEmployeeProfileDto {
  @IsNumber()
  @IsOptional()
  id?: number;
}

export class UpdateDirectEmployeeProfileDto extends UpdateEmployeeProfileDto {
  @IsString()
  @IsOptional()
  updated_by?: string;
}
