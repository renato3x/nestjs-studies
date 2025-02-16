import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const start = Date.now();

    return next
      .handle().pipe(
        tap(() => {
          const elapsed = Date.now() - start;
          console.log(`${elapsed}ms`);
        })
      )
  }
}
