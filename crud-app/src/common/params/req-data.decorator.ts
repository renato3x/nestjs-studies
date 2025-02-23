import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

type Info = 'body' | 'query' | 'params' | 'headers';

export const ReqInfo = createParamDecorator(
  (data: Info, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request[data];
  },
);
