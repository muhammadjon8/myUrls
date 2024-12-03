import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as serviceAccount from '../../firebase-service-account.json';

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`, 
});

export const bucket = admin.storage().bucket();
