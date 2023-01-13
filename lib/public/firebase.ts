// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "@firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC62592R46yS8ubM6eCiY0QZN6n7hBjGSk",
  authDomain: "la-crypta---eventos-c5209.firebaseapp.com",
  projectId: "la-crypta---eventos-c5209",
  storageBucket: "la-crypta---eventos-c5209.appspot.com",
  messagingSenderId: "212815203220",
  appId: "1:212815203220:web:edec87d0149bda478add81",
  measurementId: "G-FFJM60THJD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
};
