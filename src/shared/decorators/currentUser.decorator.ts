import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@shared/entities';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const user: User = request['user'];

    return user;
  },
);
