import { IPermit } from "../../types/crypto";
import { initializeApp, cert } from "firebase-admin/app";
import { IOrderItem } from "../../types/cart";

import {
  getFirestore,
  FieldValue,
  Transaction,
} from "firebase-admin/firestore";

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
  return db.collection("users").doc(address).set({
    username,
    permit,
  });
};

/**
 * Adds new Order
 * @param {String} address User's Address
 * @param {IOrderItem[]} items Orders item list
 * @returns {Number} Order Id
 */
export const addOrder = async (
  address: string,
  items: IOrderItem[]
): Promise<number | undefined> => {
  let orderId;
  await db.runTransaction(async (t) => {
    orderId = await _getNewOrderId(t);
    const orderRef = db.collection("orders").doc(String(orderId));

    await t.create(orderRef, {
      items,
      total: 1000,
    });
  });

  return orderId;
};

// Private Functions
const _getNewOrderId = async (t: Transaction): Promise<number> => {
  const configRef = db.collection("config").doc("main");
  let newOrderId = 1;

  const currentConfig: any = await t.get(configRef);

  if (!currentConfig) {
    console.info("No Config Found", "Creating one...");
    t.create(configRef, { lastOrderId: 0 });
  } else {
    newOrderId = currentConfig.data().lastOrderId + 1;
    // update lastOrderId
    t.update(configRef, { lastOrderId: newOrderId });
  }

  return newOrderId;
};
exports.log = log;
