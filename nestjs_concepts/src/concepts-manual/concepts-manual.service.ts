import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptsManualService {
  getConceptsManual() {
    return 'Concepts Manual';
  }
}
