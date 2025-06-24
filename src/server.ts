import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Express } from 'express';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

export async function createNestServer(expressInstance?: Express) {
  const adapter = expressInstance
    ? new ExpressAdapter(expressInstance)
    : undefined;

  console.log('[DEBUG] Usando ExpressAdapter?', !!adapter);

  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || origin === 'https://teste-back-clinica-sante') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.init();

  return app;
}
