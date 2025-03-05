import { IsNotEmpty, IsNumber } from "class-validator";

export class DeleteEducationParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
