import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  /**
   * the @HttpCode() decorator is used to specify the HTTP status code
   * that should be returned by a controller method, overriding the default
   * status code for the method's HTTP verb.
   */

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query: any) {
    console.log(query);
    return this.messagesService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findById(id);
  }

  @Post()
  create(@Body() message: CreateMessageDto) {
    return this.messagesService.create(message);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMessageDto) {
    return this.messagesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.delete(id);
  }
}
