import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@config/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from '@config/typeorm';
import { HealthModule } from '@modules/health/health.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { UrlModule } from '@modules/url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...options,
    }),
    HealthModule,
    UrlModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
