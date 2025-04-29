import { Module } from '@nestjs/common';
import { CreateUserController } from './context/create/create.controller';
import { CreateUserService } from './context/create/create.service';
import { UserRepository } from '@shared/repositories';

@Module({
  controllers: [CreateUserController],
  providers: [CreateUserService, UserRepository],
})
export class UserModule {}
