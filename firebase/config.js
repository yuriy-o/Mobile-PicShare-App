//? firebaseConfig-v0;
// import * as firebase from "firebase";
// import "firebase/auth";
// import "firebase/storage";
// import "firebase/firestore";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB2aYvslUEqeNOwvQPj3u20NQdGjQ1hxZo",
//   authDomain: "react-nativ-hw-01.firebaseapp.com",
//   projectId: "react-nativ-hw-01",
//   storageBucket: "react-nativ-hw-01.appspot.com",
//   messagingSenderId: "816373487861",
//   appId: "1:816373487861:web:8176601f3e40c387500dbc",
//   measurementId: "G-4LM9WXTJSG",
// };
// // Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);

// //? firebaseConfig-v1-old;

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2aYvslUEqeNOwvQPj3u20NQdGjQ1hxZo",
  authDomain: "react-nativ-hw-01.firebaseapp.com",
  projectId: "react-nativ-hw-01",
  storageBucket: "react-nativ-hw-01.appspot.com",
  messagingSenderId: "816373487861",
  appId: "1:816373487861:web:8176601f3e40c387500dbc",
  measurementId: "G-4LM9WXTJSG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

//? firebaseConfig-v1-new;
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/storage";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyB2aYvslUEqeNOwvQPj3u20NQdGjQ1hxZo",
//   authDomain: "react-nativ-hw-01.firebaseapp.com",
//   projectId: "react-nativ-hw-01",
//   storageBucket: "react-nativ-hw-01.appspot.com",
//   messagingSenderId: "816373487861",
//   appId: "1:816373487861:web:8176601f3e40c387500dbc",
//   measurementId: "G-4LM9WXTJSG",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export default firebase;

//! Other imports and exports
//? firebaseConfig-v2;
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBmBolutUIxg3MhafWuZhB9PqwrqTod3lI",
//   authDomain: "react-nativ-2.firebaseapp.com",
//   projectId: "react-nativ-2",
//   storageBucket: "react-nativ-2.appspot.com",
//   messagingSenderId: "22473578666",
//   appId: "1:22473578666:web:95e283a330df00071f58d3",
// };

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
