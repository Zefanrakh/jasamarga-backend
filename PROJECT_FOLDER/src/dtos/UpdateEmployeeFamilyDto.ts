import {
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
} from "class-validator";
import { Religion } from "../enums/religion.enum";
import { RelationStatus } from "../enums/relationStatus.enum";

export class UpdateEmployeeFamilyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  identifier?: string;

  @IsString()
  @IsOptional()
  job?: string;

  @IsString()
  @IsOptional()
  place_of_birth?: string;

  @IsDateString()
  @IsOptional()
  date_of_birth?: string;

  @IsEnum(Religion)
  @IsOptional()
  religion?: Religion;

  @IsBoolean()
  @IsOptional()
  is_life?: boolean;

  @IsBoolean()
  @IsOptional()
  is_divorced?: boolean;

  @IsEnum(RelationStatus)
  @IsOptional()
  relation_status?: RelationStatus;
}

export class UpdateEmployeeFamilyByBodyIdDto extends UpdateEmployeeFamilyDto {
  @IsNumber()
  @IsOptional()
  id?: number;
}

export class UpdateDirectEmployeeFamilyDto extends UpdateEmployeeFamilyDto {
  @IsString()
  @IsOptional()
  updated_by?: string;
}
