import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { functions } from '../functionsConfig';
import { Express } from 'express-serve-static-core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SanitizationPipe } from './common/pipes/sanitization.pipe';
import { PayloadMiddleware } from 'src/pagSeguro/payload.middleware';

const server = express();

export const createNestServer = async (expressInstance: Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  const allowedOrigins = [
    'https://modamvfitness.firebaseapp.com',
    'https://modamvfitness.web.app',
    'https://modamvfitness.com',
    'https:/api.pagseguro.uol.com.br',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  });

  app.use(new PayloadMiddleware().use);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: false,
    }),
    new SanitizationPipe(),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return app.init();
};

createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);
