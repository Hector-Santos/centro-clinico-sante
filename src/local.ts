import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CustomValidationPipe } from './common/pipes/validation-error.pipe';
import { devLoggerMiddleware } from './common/middlewares/logger-middleware';
import { json } from 'express';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(['log', 'warn', 'error']);

  app.useGlobalPipes(new CustomValidationPipe());
  const instance = app.getHttpAdapter().getInstance();

  instance.use(json());

  // Dev-only expressive logger (toxic hacker style)
  instance.use(devLoggerMiddleware);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Server running at http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
