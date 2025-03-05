import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateEmployeeProfileParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
