import { Controller, Get } from '@nestjs/common';

@Controller('concepts-auto')
export class ConceptsAutoController {
  @Get()
  helloConceptsManual() {
    return {
      message: 'Hello',
    };
  }
}
