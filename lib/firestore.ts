import { initializeApp, cert } from "firebase-admin/app";

const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT ?? "{}");

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();

// **** FUNCTIONS **** //

/**
 * Adds new word to dictionary
 * @param {String} word
 * @returns
 */
const log = async (type: string, data: any) => {
  return await db.collection("log").add({
    time: FieldValue.serverTimestamp(),
    type: type,
    data: data,
  });
};

/**
 * Checks if word already claimed
 * @param {String} word Word
 * @returns
 */
exports.isClaimable = async (word: string) => {
  const wordRef = db.collection("words").doc(word);
  const doc = await wordRef.get();
  if (!doc.exists) {
    log("not doc.exists", { word });
    return false;
  }
  return await !doc.data().claimed;
};

/**
 * Set word as claimed
 * @param {String} word
 * @param {String} address
 * @param {String} tx
 * @returns
 */
exports.setWordClaimed = async (word: string, address: string, tx: any) => {
  const doc = await db.collection("words").doc(word);
  return doc.update({
    claimed: true,
    address,
    tx,
  });
};

/**
 * Adds new word to dictionary
 * @param {String} word
 * @returns
 */
exports.addWord = async (word: string) => {
  return await db.collection("words").doc(word).set({
    claimed: false,
  });
};

exports.log = log;
