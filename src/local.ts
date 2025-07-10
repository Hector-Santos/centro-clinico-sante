import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { LoggerMiddleware } from './common/middlewares/logger-middleware';
import { CustomValidationPipe } from './common/pipes/validation-error.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(['log', 'warn', 'error']);

  app.useGlobalPipes(new CustomValidationPipe());
  app.use(LoggerMiddleware);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Server running at http://localhost:${port}`, 'Bootstrap');
}

export * from './firebase/cache_triggers';

bootstrap();
