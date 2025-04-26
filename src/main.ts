import env from 'config/env'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env().application.port;
  
  await app.listen(port);
}
bootstrap();
