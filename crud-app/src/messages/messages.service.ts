import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PeopleService } from '@people/people.service';
import { Person } from '@people/entities/person.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly peopleService: PeopleService,
  ) {}

  async findAll(limit = 10, offset = 0): Promise<Message[]> {
    return await this.messageRepository.find({
      skip: offset,
      take: limit,
      relations: {
        from: true,
        to: true,
      },
      order: {
        id: 'asc',
      },
    });
  }

  async findById(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
      relations: {
        from: true,
        to: true,
      },
      order: {
        id: 'asc',
      }, 
    });

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

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    let sender: Person;
    let receiver: Person;
    
    try {
      sender = await this.peopleService.findById(createMessageDto.senderId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Sender not found');
      }

      throw error;
    }

    try {
      receiver = await this.peopleService.findById(createMessageDto.receiverId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Receiver not found');
      }

      throw error;
    }

    const data = {
      from: sender,
      to: receiver,
      text: createMessageDto.text,
    }

    const message = this.messageRepository.create(data);

    return await this.messageRepository.save(message);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<void> {
    await this.messageRepository.update({ id }, updateMessageDto);
  }

  async delete(id: number): Promise<void> {
    await this.messageRepository.delete({ id });
  }
}
