import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import "firebase/compat/analytics";

import { initializeApp } from "firebase/app";

// import * as firebase from "firebase";
// import "firebase/auth";

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
// const analytics = fiarebase.analytics();

export default firebase;
