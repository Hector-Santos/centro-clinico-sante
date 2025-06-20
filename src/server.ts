import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { Express } from 'express-serve-static-core';
import { AppModule } from './app/app.module';

export async function createNestServer(
  expressInstance?: Express,
  forceListen = false,
) {
  if (!expressInstance && !forceListen) {
    console.error(
      '[ERRO GRAVE] ExpressInstance ausente e listen não forçado. Evitando execução.',
    );
    process.exit(1);
  }

  const adapter = expressInstance
    ? new ExpressAdapter(expressInstance)
    : undefined;

  console.log('[DEBUG] Usando ExpressAdapter?', !!adapter);

  const app = await NestFactory.create(AppModule, adapter);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || origin === 'http://teste-back-clinica-sante') {
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

  if (forceListen) {
    const port = process.env.PORT || 3333;
    console.log(`[DEBUG] Iniciando app.listen(${port})`);
    await app.listen(port);
  } else {
    console.log('[DEBUG] App inicializado sem listen');
  }

  return app;
}
