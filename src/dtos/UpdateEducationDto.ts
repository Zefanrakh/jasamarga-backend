import {
  IsString,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  IsNumber,
} from "class-validator";
import { EducationLevel } from "../enums/education.enum";

export class UpdateEducationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(EducationLevel)
  @IsOptional()
  level?: EducationLevel;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateEducationByBodyIdDto extends UpdateEducationDto {
  @IsNumber()
  @IsOptional()
  id?: number;
}

export class UpdateDirectEducationDto extends UpdateEducationDto {
  @IsString()
  @IsNotEmpty()
  updated_by!: string;
}
