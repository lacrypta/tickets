import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Import service accounts from environment
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT ?? "{}");

// Set emulator variables if present
process.env.FIREBASE_AUTH_EMULATOR_HOST =
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;
process.env.FIRESTORE_EMULATOR_HOST =
  process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_HOST;

// Initialize Firebase
try {
  initializeApp({
    credential: cert(serviceAccount),
  });
} catch (err: any) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err);
  }
}

const db = getFirestore();
const auth = getAuth();

export { auth, db };
