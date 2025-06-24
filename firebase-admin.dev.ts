import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.MY_FIREBASE_PROJECT_ID,
    clientEmail: process.env.MY_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.MY_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

export const auth = admin.auth();
export const db = admin.firestore();
export const storage = admin.storage();
