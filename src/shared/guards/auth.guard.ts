import env from '@config/env';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const [, token] = authorization.split(' ');

      jwt.verify(token, env().jwt.secret);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }
}
