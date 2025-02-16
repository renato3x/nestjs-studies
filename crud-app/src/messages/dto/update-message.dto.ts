import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * PartialType is a utility function in NestJS that creates a new type
 * based on an existing DTO (Data Transfer Object) by making all its
 * properties optional. It is commonly used in update operations where
 * not all fields are required.
 */

export class UpdateMessageDto {
  @IsBoolean()
  @IsOptional()
  readonly read?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly text: string;
}
