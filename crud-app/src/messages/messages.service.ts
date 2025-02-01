import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  private lastId: number = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'Hello, how are you?',
      from: 'John',
      to: 'Doe',
      read: false,
      date: new Date(),
    },
  ];

  findAll(): Message[] {
    return this.messages;
  }

  findById(id: number): Message {
    const message = this.messages.find((message) => message.id === id);

    if (!message) {
      /*
       * HttpException is a class from Nest that allows send an error response,
       * like a Bad Request, Not Found or something like that
       */
      // throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
  
      /*
       * NotFoundException has the same idea from HttpException, but it is exclusive to the
       * status code 404 (NOT FOUND). Nest has specific classes for the most common errors
       */
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  create(message: CreateMessageDto): Message {
    this.lastId++;

    const newMessage: Message = {
      id: this.lastId,
      ...message,
      read: false,
      date: new Date(),
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: number, message: any) {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === id,
    );

    if (messageIndex === -1) {
      throw new NotFoundException('Message not found');
    }

    const databaseMessage = this.messages[messageIndex];

    this.messages[messageIndex] = {
      ...databaseMessage,
      ...message,
    };
  }

  delete(id: number) {
    this.messages = this.messages.filter((message) => message.id !== id);
  }
}
