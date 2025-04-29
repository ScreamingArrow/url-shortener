import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@shared/interfaces';
import { UserRepository } from '@shared/repositories';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization } = request?.headers;

    if (!authorization) {
      return true;
    }

    const [, token] = authorization?.split(' ');

    const jwtDecoded = jwt.decode(token) as JwtPayload;

    const user = await this.userRepository.getByEmail(jwtDecoded.email);

    if (user) {
      request['user'] = user;
    }

    return true;
  }
}
