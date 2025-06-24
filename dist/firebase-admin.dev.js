"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.db = exports.auth = void 0;
const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.MY_FIREBASE_PROJECT_ID,
        clientEmail: process.env.MY_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.MY_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
});
exports.auth = admin.auth();
exports.db = admin.firestore();
exports.storage = admin.storage();
//# sourceMappingURL=firebase-admin.dev.js.map