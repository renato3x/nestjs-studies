import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

/**
 * PartialType is a utility function in NestJS that creates a new type
 * based on an existing DTO (Data Transfer Object) by making all its
 * properties optional. It is commonly used in update operations where
 * not all fields are required.
 */

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsBoolean()
  @IsOptional()
  readonly read?: boolean;
}
