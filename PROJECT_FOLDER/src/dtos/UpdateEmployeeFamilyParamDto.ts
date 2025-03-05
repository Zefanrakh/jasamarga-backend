import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateEmployeeFamilyParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
