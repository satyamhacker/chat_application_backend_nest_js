import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './main-api.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Get Config Service
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // 2. Security Hardening
  app.use(helmet());
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // 3. Global Validation & Serialization
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // 4. API Versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 5. Swagger API Documentation Setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ChatSphere API')
    .setDescription('The enterprise modular monolith chat application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);
  Logger.log(`🚀 Secure Server running on: http://localhost:${port}/api/v1`);
  Logger.log(`📚 Swagger Docs available at: http://localhost:${port}/api/docs`);
}

bootstrap();
