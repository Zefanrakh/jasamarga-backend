import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateEducationParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
