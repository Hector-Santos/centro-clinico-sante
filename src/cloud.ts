import * as functions from 'firebase-functions';
import * as express from 'express';
import { createNestServer } from './server';

const server = express();

createNestServer(server)
  .then(() => {
    console.log('[Firebase] NestJS inicializado com Express.');
  })
  .catch((err) => {
    console.error('[Firebase] Falha ao inicializar NestJS', err);
  });

export const api = functions
  .region('southamerica-east1')
  .https.onRequest(server);
