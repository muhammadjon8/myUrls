// src/firebase.config.ts
import * as admin from 'firebase-admin';
import * as path from 'path';

admin.initializeApp({
  credential: admin.credential.cert(path.join('firebase.json')),
  storageBucket: 'myurls-c8174.appspot.com', 
});

export const bucket = admin.storage().bucket();
