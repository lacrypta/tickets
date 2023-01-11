import { initializeApp, cert } from "firebase-admin/app";
import { IOrder } from "../../types/order";

import {
  getFirestore,
  FieldValue,
  DocumentReference,
} from "firebase-admin/firestore";
import { ITransaction } from "../../types/crypto";

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
export const log = async (
  type: string,
  data: any
): Promise<DocumentReference> => {
  return await db.collection("log").add({
    time: FieldValue.serverTimestamp(),
    type: type,
    data: data,
  });
};

/**
 * Get config
 * @returns
 */
export const getConfig = async () => {
  const configRef = db.collection("config").doc("main");
  const doc = await configRef.get();
  if (!doc.exists) {
    log("Config", "Does not exist");
    return false;
  }
  return doc.data();
};

/**
 * Get order by ID
 * @param {string} orderId Order ID
 * @returns
 */
export const getOrder = async (orderId: string) => {
  const orderRef = db.collection("orders").doc(orderId);
  const doc = await orderRef.get();
  if (!doc.exists) {
    return undefined;
  }
  return doc.data();
};

/**
 * Adds new Order
 * @param {String} address User's Address
 * @param {IOrderItem[]} items Orders item list
 * @returns {Number} Order Id
 */
export const addOrder = async (order: IOrder): Promise<string | undefined> => {
  let orderRef = db.collection("orders").doc();
  await orderRef.set({
    fullname: order.user.fullname,
    email: order.user.email,
    payment: order.payment,
    status: order.status || "pending",
  });

  return orderRef.id;
};

export const updateOrder = async (orderId: string, data: any) => {
  const orderRef = db.collection("orders").doc(orderId);
  const doc = await orderRef.get();

  if (!doc.exists) {
    return undefined;
  }
  orderRef.update(data);
  return doc.data();
};

/**
 * Adds new code to the database
 * @param code
 * @returns
 */
export const addCode = async (code: string): Promise<string | undefined> => {
  let codeRef = db.collection("codes").doc();
  await codeRef.set({
    code,
    claimed: false,
  });

  return codeRef.id;
};

export const claimCode = async (code: string): Promise<boolean> => {
  const codesRef = db.collection("codes");
  var query = codesRef.where("code", "==", code).where("claimed", "==", false);

  // Gets query
  const docs = await query.get();
  if (docs.size === 0) {
    return false;
  }

  // Gets document
  const codeRef = db.collection("codes").doc(docs.docs[0].id);

  // Updates it
  await codeRef.update({
    claimed: true,
  });

  return true;
};

export const isTxStored = async (txHash: string): Promise<boolean> => {
  const txRef = db.collection("transactions").doc(txHash);
  const doc = await txRef.get();
  return doc.exists;
};

export const addTx = async (tx: ITransaction): Promise<string | undefined> => {
  let txRef = db.collection("transactions").doc(tx.hash);
  await txRef.set(tx);

  return txRef.id;
};
exports.log = log;
