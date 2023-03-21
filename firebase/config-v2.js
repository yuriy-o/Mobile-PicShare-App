import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbkNl_L8BjlqhAO8qBytVDtynWJzPulIs",
  authDomain: "react-native-social-31143.firebaseapp.com",
  projectId: "react-native-social",
  storageBucket: "react-native-social.appspot.com",
  messagingSenderId: "782372432345",
  appId: "1:782372432345:web:c24c7e1c0e8916aa0191c8",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
