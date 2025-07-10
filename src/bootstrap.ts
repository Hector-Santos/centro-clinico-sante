import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

export async function createNestApp() {
  const app = await NestFactory.createApplicationContext(AppModule);
  return app;
}
