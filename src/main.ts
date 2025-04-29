import env from 'config/env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { LoggerInterceptor } from '@shared/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = env().application.port;
  const logger = new Logger('NestApplication');

  const config = new DocumentBuilder()
    .setTitle('Url Shortener')
    .setDescription('API to implement url shortener service')
    .addBearerAuth(
      {
        type: 'http',
        schema: 'Bearer',
        bearerFormat: 'Token',
      } as SecuritySchemeObject,
      'Bearer',
    )
    .setVersion('1.0.0')
    .setExternalDoc('Postman Collection', `/docs-json`)
    .build();

  const options: SwaggerCustomOptions = {
    jsonDocumentUrl: '/docs-json',
    useGlobalPrefix: false,
  };

  const document = SwaggerModule.createDocument(app, config);

  if (env().application.stage === 'development') {
    SwaggerModule.setup(`/docs`, app, document, options);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen(port, () => logger.log(`API is running on port ${port}`));
}
bootstrap();
