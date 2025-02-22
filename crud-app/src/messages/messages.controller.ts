import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  /* ParseIntPipe, */
  Post,
  Put,
  Query,
  UseGuards,
  /* UseInterceptors, */
  /*UseInterceptors,*/
  UsePipes,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { PaginationDto } from '@common/dto/pagination.dto';
import { ParseIntIdPipe } from '@common/pipes/parse-int-id.pipe';
import { IsAdminGuard } from '@common/guards/is-admin.guard';
// import { AuthTokenInterceptor } from '@common/interceptors/auth-token.interceptor';
/* import { AddHeaderInterceptor } from '@common/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from '@common/interceptors/timing-connection.interceptor';
import { ErrorHandlerInterceptor } from '@common/interceptors/error-handler.interceptor';
import { SimpleCacheInterceptor } from '@common/interceptors/simple-cache.interceptor'; */

@Controller('messages')
/**
 * The `@UsePipes` decorator in NestJS is used to apply pipes for data transformation and validation.
 *
 * Pipes process the incoming request data before it reaches the route handler.
 * They can be used to validate, transform, or sanitize input.
 *
 * - **Global usage in a controller:** Applies the pipe to all endpoints within the controller.
 * - **Per-route usage:** Applies the pipe only to a specific endpoint.
 *
 * Example:
 *
 * @UsePipes(new ValidationPipe()) // Applied to all endpoints
 * @Controller('users')
 * export class UsersController {
 *
 *   @UsePipes(new ValidationPipe()) // Applied only to this method
 *   @Post()
 *   create(@Body() createUserDto: CreateUserDto) {
 *     return this.userService.create(createUserDto);
 *   }
 * }
 *
 *
 * This ensures that incoming data follows the expected format before being processed.
 */
@UsePipes(ParseIntIdPipe)
// @UseInterceptors(AuthTokenInterceptor)
@UseGuards(IsAdminGuard)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  /**
   * the @HttpCode() decorator is used to specify the HTTP status code
   * that should be returned by a controller method, overriding the default
   * status code for the method's HTTP verb.
   */
  @HttpCode(HttpStatus.OK)
  // @UseInterceptors(AddHeaderInterceptor, TimingConnectionInterceptor, SimpleCacheInterceptor)
  @Get()
  async findAll(@Query() query: PaginationDto): Promise<Message[]> {
    return await this.messagesService.findAll(query.limit, query.offset);
  }

  @Get(':id')
  // @UseInterceptors(ErrorHandlerInterceptor, TimingConnectionInterceptor, SimpleCacheInterceptor)
  async findById(@Param('id') id: number): Promise<Message> {
    return await this.messagesService.findById(id);
  }

  @Post()
  create(@Body() message: CreateMessageDto) {
    return this.messagesService.create(message);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateMessageDto) {
    return this.messagesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.messagesService.delete(id);
  }
}
