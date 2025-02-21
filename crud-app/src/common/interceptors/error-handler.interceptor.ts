import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  /* HttpStatus, */
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlerInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.log('An error was intercepted');
        return throwError(() => {
          if (error instanceof HttpException) {
            return error;
          }

          return new InternalServerErrorException('Some error occurred');
        });
      }),
    );
  }
}
