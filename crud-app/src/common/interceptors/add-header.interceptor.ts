import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Interceptors in NestJS
 * ----------------------
 * Interceptors are middleware-like functions that allow modifying 
 * the request, response, or handling additional logic before and after 
 * method execution in controllers or services.
 * 
 * They are commonly used for:
 * - Logging request/response data
 * - Transforming or formatting responses
 * - Handling caching
 * - Adding additional metadata to responses
 * 
 * How to create and use an interceptor:
 * -------------------------------------
 * 1. Create a class implementing `NestInterceptor`:
 * 
 * ```ts
 * import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
 * import { Observable } from 'rxjs';
 * import { map } from 'rxjs/operators';
 * 
 * @Injectable()
 * export class TransformInterceptor implements NestInterceptor {
 *   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
 *     return next.handle().pipe(map(data => ({ success: true, data })));
 *   }
 * }
 * ```
 * 
 * 2. Apply the interceptor:
 * 
 * - Globally:
 *   ```ts
 *   import { Module } from '@nestjs/common';
 *   import { APP_INTERCEPTOR } from '@nestjs/core';
 * 
 *   @Module({
 *     providers: [
 *       {
 *         provide: APP_INTERCEPTOR,
 *         useClass: TransformInterceptor,
 *       },
 *     ],
 *   })
 *   export class AppModule {}
 *   ```
 * 
 * - On a controller or method:
 *   ```ts
 *   import { UseInterceptors } from '@nestjs/common';
 * 
 *   @Controller('example')
 *   @UseInterceptors(TransformInterceptor)
 *   export class ExampleController {
 *     @Get()
 *     findAll() {
 *       return { message: 'Hello, World!' };
 *     }
 *   }
 *   ```
 * 
 * Interceptors are powerful tools for improving code reusability and 
 * maintainability in NestJS applications.
 */
@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    response.setHeader('X-Custom-Header', 'This is my custom header');
    return next.handle();
  }
}
