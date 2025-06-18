"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = require("firebase-functions");
const express = require("express");
const server_1 = require("./server");
const server = express();
(0, server_1.createNestServer)(server)
    .then(() => {
    console.log('[Firebase] NestJS inicializado com Express.');
})
    .catch((err) => {
    console.error('[Firebase] Falha ao inicializar NestJS', err);
});
exports.api = functions
    .region('southamerica-east1')
    .https.onRequest(server);
//# sourceMappingURL=cloud.js.map