import { IsNotEmpty, IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly text: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly senderId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly receiverId: number;
}
