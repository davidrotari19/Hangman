// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRSilPwNkCelP81joZPnf1raM5UWZv8oE",
  authDomain: "poleciudes-80224.firebaseapp.com",
  projectId: "poleciudes-80224",
  storageBucket: "poleciudes-80224.appspot.com",
  messagingSenderId: "233893189305",
  appId: "1:233893189305:web:c4c010ad63d1af7772ad68",
  measurementId: "G-0BSLP2JXC1"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);