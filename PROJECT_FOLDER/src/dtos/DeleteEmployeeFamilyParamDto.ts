import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteEmployeeFamilyParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
