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
  Query,
  getDoc,
  QuerySnapshot,
  connectFirestoreEmulator,
} from "@firebase/firestore";

import {
  getAuth,
  signInWithCustomToken,
  onAuthStateChanged,
  connectAuthEmulator,
} from "@firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC62592R46yS8ubM6eCiY0QZN6n7hBjGSk",
  authDomain: "la-crypta---eventos-c5209.firebaseapp.com",
  projectId: "la-crypta---eventos-c5209",
  storageBucket: "la-crypta---eventos-c5209.appspot.com",
  messagingSenderId: "212815203220",
  appId: "1:212815203220:web:edec87d0149bda478add81",
  measurementId: "G-FFJM60THJD",
};

console.info("firebaseConfig:");
console.dir(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore emulator config
if (process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST) {
  const [host, port] =
    process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST.split(":");
  connectFirestoreEmulator(db, host, parseInt(port));
  console.info("Connected to local firestore");
}

// Firebase Auth emulator config
if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
  const url = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;
  connectAuthEmulator(getAuth(app), url as string);
  console.info("Connected to local Auth");
}

export {
  db,
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
  Query,
  QuerySnapshot,
  getAuth,
  signInWithCustomToken,
  onAuthStateChanged,
};
