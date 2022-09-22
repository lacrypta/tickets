// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore, collection, onSnapshot } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTqFKYkyb_ibs1kSxfceXEJm3n9Eel6vo",
  authDomain: "la-crypta.firebaseapp.com",
  projectId: "la-crypta",
  storageBucket: "la-crypta.appspot.com",
  messagingSenderId: "805478779233",
  appId: "1:805478779233:web:aa56fc51515a429f54dd20",
  measurementId: "G-R3D4MH10VL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, onSnapshot };
