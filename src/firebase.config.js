// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRyASzPIHR714m0I8qmBFd1v60xbxqVzQ",
  authDomain: "abcd-780e4.firebaseapp.com",
  projectId: "abcd-780e4",
  storageBucket: "abcd-780e4.appspot.com",
  messagingSenderId: "400654519282",
  appId: "1:400654519282:web:e62523c8783dd5d7a5b96b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();