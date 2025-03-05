import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteEmployeeProfileParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
