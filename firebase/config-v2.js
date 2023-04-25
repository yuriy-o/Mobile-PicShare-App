require("dotenv").config();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_2_API_KEY,
  authDomain: process.env.FIREBASE_2_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_2_PROJECT_ID,
  storageBucket: process.env.FIREBASE_2_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_2_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_2_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
