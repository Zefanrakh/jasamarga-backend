import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteEmployeeParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
