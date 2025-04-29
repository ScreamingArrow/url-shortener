import env from '@config/env';
import { Module } from '@nestjs/common';
import { LoginService } from './context/login/login.service';
import { UserRepository } from '@shared/repositories';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './context/login/login.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: env().jwt.secret,
      signOptions: { expiresIn: env().jwt.expiresIn },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, UserRepository],
})
export class AuthModule {}
