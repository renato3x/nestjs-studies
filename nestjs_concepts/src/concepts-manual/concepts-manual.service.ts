import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceptsManualService {
  hello() {
    return { hello: 'world' };
  }
}
