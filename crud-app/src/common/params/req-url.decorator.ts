import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const ReqUrl = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.url;
  },
);
