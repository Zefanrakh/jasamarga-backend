import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsInt,
  IsBoolean,
  IsDateString,
} from "class-validator";
import { Religion } from "../enums/religion.enum";
import { RelationStatus } from "../enums/relationStatus.enum";

export class CreateEmployeeFamilyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

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
  @IsNotEmpty()
  religion!: Religion;

  @IsBoolean()
  @IsOptional()
  is_life?: boolean = true;

  @IsBoolean()
  @IsOptional()
  is_divorced?: boolean;

  @IsEnum(RelationStatus)
  @IsNotEmpty()
  relation_status!: RelationStatus;
}

export class CreateDirectEmployeeFamilyDto extends CreateEmployeeFamilyDto {
  @IsInt()
  @IsNotEmpty()
  employee_id!: number;

  @IsString()
  @IsOptional()
  created_by?: string;
}
