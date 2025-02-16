import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { PeopleModule } from '@people/people.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), PeopleModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
