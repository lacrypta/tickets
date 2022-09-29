import { IPermit } from "../../types/crypto";
import { initializeApp, cert } from "firebase-admin/app";

const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT ?? "{}");

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

// **** FUNCTIONS **** //

/**
 * Adds new word to dictionary
 * @param {String} word
 * @returns
 */
export const log = async (type: string, data: any) => {
  return await db.collection("log").add({
    time: FieldValue.serverTimestamp(),
    type: type,
    data: data,
  });
};

/**
 * Get user by Address
 * @param {address} address Address
 * @returns
 */
export const getUser = async (address: string) => {
  const userRef = db.collection("users").doc(address);
  const doc = await userRef.get();
  if (!doc.exists) {
    log("not doc.exists", { address });
    return false;
  }
  return doc.data();
};

/**
 * Adds new user to the database
 * @param {String} user
 * @param {String} address
 * @param {IPermit} permit
 * @returns
 */
export const addUser = async (
  username: string,
  address: string,
  permit: IPermit
) => {
  return await db.collection("users").doc(address).set({
    username,
    permit,
  });
};

/**
 * Adds new payment to the database
 * @param {String} orderId
 * @param {ITransferVoucher} permit
 * @returns
 */
export const addPayment = async (
  username: string,
  address: string,
  permit: IPermit
) => {
  return await db.collection("users").doc(address).set({
    username,
    permit,
  });
};

exports.log = log;
