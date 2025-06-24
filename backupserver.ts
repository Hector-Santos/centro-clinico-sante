// import { NestFactory } from '@nestjs/core';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import { ValidationPipe } from '@nestjs/common';
// import { useContainer } from 'class-validator';
// import { Express } from 'express-serve-static-core';
// import { AppModule } from './app/app.module';

// export async function createNestServer(
//   expressInstance?: Express,
//   forceListen = false,
// ) {
//   if (!expressInstance && !forceListen) {
//     console.error(
//       '[ERRO GRAVE] ExpressInstance ausente e listen não forçado. Evitando execução.',
//     );
//     process.exit(1);
//   }

//   const adapter = expressInstance
//     ? new ExpressAdapter(expressInstance)
//     : undefined;

//   console.log('[DEBUG] Usando ExpressAdapter?', !!adapter);

//   const app = await NestFactory.create(AppModule, adapter);

//   app.enableCors({
//     origin: (origin, callback) => {
//       if (!origin || origin === 'https://teste-back-clinica-sante') {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       transform: true,
//       forbidNonWhitelisted: true,
//     }),
//   );

//   useContainer(app.select(AppModule), { fallbackOnErrors: true });

//   await app.init();

//   if (forceListen) {
//     const port = process.env.PORT || 3333;
//     console.log(`[DEBUG] Iniciando app.listen(${port})`);
//     await app.listen(port);
//   } else {
//     console.log('[DEBUG] App inicializado sem listen');
//   }

//   return app;
// }

//scripts old

// "build": "nest build",
// "clear": "rm -rf node_modules package-lock.json dist",
// "emulator-build": "rm -rf dist && npm run build && firebase emulators:start --only functions",
// "emulator": "nodemon --exec \"npm run emulator-build\"",
// "format": "prettier --write \"src/**/*.{ts,js,json,md}\" \"test/**/*.{ts,js,json,md}\" \"*.{ts,js,json,md}\"",
// "start": "nodemon --exec ts-node src/local.ts",
// "start:dev": "nest start --watch",
// "start:debug": "nest start --debug --watch",
// "start:prod": "node dist/local.js",
// "deploy": "rm -rf dist && npm run build && firebase deploy --only functions",
// "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix --max-warnings=0 --quiet --cache",
// "test:unit": "jest --testPathPattern=__tests__/unit --coverage",
// "test:integration": "jest --testPathPattern=__tests__/integration --coverage",
// "test:watch": "jest --watch",
// "test:cov": "jest --coverage",
// "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
// "test:e2e": "jest --config ./test/jest-e2e.json"

//scriptsnew

// "build": "nest build",
// "watch:dist": "tsc -w",
// "start:emulator": "firebase emulators:start --only functions",
// "emulator-init": "npm run rm -rf dist && npm run build",
// "emulator": "NODE_PATH=./ concurrently -k \"npm:watch:dist\" \"npm:emulator-init && npm:start:emulator\"",
// "hard-clear": "rm -rf node_modules package-lock.json dist",
// "emulator-build": "rm -rf dist && npm run build && firebase emulators:start --only functions",
// "format": "prettier --write \"src/**/*.{ts,js,json,md}\" \"test/**/*.{ts,js,json,md}\" \"*.{ts,js,json,md}\"",
// "dev:tsx": "NODE_PATH=./ tsc --noEmit && tsx watch src/local.ts",
// "dev:tsnode": "NODE_PATH=./ ts-node-dev --respawn src/local.ts",
// "start":"NODE_PATH=./ nodemon --watch src --ext ts --exec \"ts-node src/local.ts\"",
// "start:dev": "nest start --watch",
// "start:debug": "nest start --debug --watch",
// "start:prod": "node dist/local.js",
// "deploy": "rm -rf dist && npm run build && firebase deploy --only functions",
// "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix --max-warnings=0 --quiet --cache",
// "test:unit": "jest --testPathPattern=__tests__/unit --coverage",
// "test:integration": "jest --testPathPattern=__tests__/integration --coverage",
// "test:watch": "jest --watch",
// "test:cov": "jest --coverage",
// "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
// "test:e2e": "jest --config ./test/jest-e2e.json"
