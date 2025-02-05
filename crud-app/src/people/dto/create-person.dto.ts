import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  password: string;
}
