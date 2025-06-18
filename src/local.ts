import { createNestServer } from './server';

(async () => {
  const app = await createNestServer();
  const port = process.env.PORT || 3333;

  await app.listen(port);
  console.log(`🚀 Server running locally on http://localhost:${port}`);
})();
