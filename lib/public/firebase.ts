// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore, collection, onSnapshot, doc } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0rA8BNwjTrnl9w6jg3SHiOYzNOrpAdRc",
  authDomain: "la-crypta---eventos.firebaseapp.com",
  projectId: "la-crypta---eventos",
  storageBucket: "la-crypta---eventos.appspot.com",
  messagingSenderId: "554731055448",
  appId: "1:554731055448:web:7d790caab5bb772a841d2d",
  measurementId: "G-CRM9KKMZ3C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, onSnapshot, doc };
