import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param' && metadata.data === 'id') {
      const parsedValue = parseInt(value);

      if (isNaN(parsedValue)) {
        throw new BadRequestException("'id' must be a numeric string");
      }

      if (parsedValue < 1) {
        throw new BadRequestException("'id' must be greater than 0");
      }

      return parsedValue;
    }

    return value;
  }
}
