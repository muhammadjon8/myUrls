import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as serviceAccount from '../../firebase-service-account.json';

dotenv.config(); // Load environment variables from .env

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`, // Bucket name from env
});

// Export the storage bucket for uploading files
export const bucket = admin.storage().bucket();
