import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class ErrorHandlerFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    // http request/response
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    // about error
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string | string[] = '';

    console.log(exceptionResponse);

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else {
      message = (exceptionResponse as any).message;
    }

    response.status(statusCode).json({
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      status: statusCode,
    });
  }
}
