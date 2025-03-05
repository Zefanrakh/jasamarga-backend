import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateEmployeeParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
