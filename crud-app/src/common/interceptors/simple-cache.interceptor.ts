import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache: Map<string, any> = new Map<string, any>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (this.cache.has(request.url)) {
      // console.log(`returning data from cache ${request.url}`);
      return of(this.cache.get(request.url));
    }

    return next.handle().pipe(
      tap((data) => {
        // console.log(`setting cache from ${request.url}`);
        this.cache.set(request.url, data);
      }),
    );
  }
}
