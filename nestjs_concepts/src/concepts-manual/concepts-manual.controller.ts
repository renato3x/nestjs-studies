import { Controller, Get } from '@nestjs/common';
import { ConceptsManualService } from './concepts-manual.service';

@Controller()
export class ConceptsManualController {
  constructor(private readonly conceptsManualService: ConceptsManualService) {}

  @Get('/concepts-manual')
  getConceptsManual() {
    return this.conceptsManualService.getConceptsManual();
  }
}
