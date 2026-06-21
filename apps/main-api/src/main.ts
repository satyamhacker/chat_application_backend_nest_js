import { NestFactory } from '@nestjs/core';
import { AppModule } from './main-api.module';
import { VersioningType, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);




  // 1. Get Config Service
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  // 2. Enable API Versioning (e.g., /api/v1/...)
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 3. Swagger API Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('ChatSphere API')
    .setDescription('The enterprise modular monolith chat application')
    .setVersion('1.0')
    .addBearerAuth() // Allows testing secure routes later
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 4. Start the server
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
  Logger.log(`📚 Swagger Docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();