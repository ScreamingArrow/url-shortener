import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@config/env'
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from '@config/typeorm';
import { HealthModule } from '@modules/health/health.module';
import { ShortenerModule } from '@modules/shortener/shortener.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
    }),
    TypeOrmModule.forRoot({
      ...options
    }),
    HealthModule,
    ShortenerModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
