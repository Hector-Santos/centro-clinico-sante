// import * as dotenv from 'dotenv';
// import * as admin from 'firebase-admin';
// dotenv.config();

// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.MY_FIREBASE_PROJECT_ID,
//     clientEmail: process.env.MY_FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.MY_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//   }),
// });

// export const auth = admin.auth();
// export const db = admin.firestore();
// export const storage = admin.storage();

import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const app = admin.initializeApp({
  // Can be empty if using emulator locally
});

const db = getFirestore(app);

// This tells your app to use the emulator during development

db.settings({
  host: 'localhost:8080',
  ssl: false,
});

export { db };
