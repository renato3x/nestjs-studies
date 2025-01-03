import { Module } from '@nestjs/common';
import { ConceptsAutoController } from './concepts-auto.controller';
import { ConceptsAutoService } from './concepts-auto.service';

@Module({
  controllers: [ConceptsAutoController],
  providers: [ConceptsAutoService],
})
export class ConceptsAutoModule {}
