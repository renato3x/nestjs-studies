import { Controller, Get } from '@nestjs/common';
import { ConceptsManualService } from './concepts-manual.service';

@Controller('concepts-manual')
export class ConceptsManualController {
  constructor(private readonly conceptsManualService: ConceptsManualService) {}

  @Get()
  helloConceptsManual() {
    return this.conceptsManualService.hello();
  }
}
