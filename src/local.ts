// src/local.ts
import { createNestServer } from './server';
import { config } from 'dotenv';

config(); // Optional, if you're loading .env.local or similar

async function bootstrap() {
  const app = await createNestServer(); // no expressInstance
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Local server running on http://localhost:${port}`);
}

bootstrap();
