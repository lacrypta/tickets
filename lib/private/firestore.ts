import { ITransferVoucherSigned } from "./../../types/crypto";
import { IPermit } from "../../types/crypto";
import { initializeApp, cert } from "firebase-admin/app";
import { IOrder } from "../../types/order";

import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";

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
 * Adds new payment to the database
 * @param {String} orderId
 * @param {ITransferVoucher} permit
 * @returns
 */
export const addPayment = async (
  orderId: string,
  voucher: ITransferVoucherSigned
): Promise<String> => {
  const paymentRef = db.collection("payments").doc();

  await db.runTransaction(async (t) => {
    const orderRef = db.collection("orders").doc(String(orderId));
    const order = (await t.get(orderRef)).data();

    // Validate status
    switch (order?.status) {
      case "processing":
        throw new Error("Order is already being processed");
      case "completed":
        throw new Error("Order already payed");
      case "cancelled":
        throw new Error("The order has been cancelled");
    }

    // Validate amount
    if (
      !parseUnits(String(order?.total), 6).eq(
        BigNumber.from(voucher.voucher.payload.amount)
      )
    ) {
      throw new Error("The order and voucher amount don't match");
    }

    // Update Order
    t.update(orderRef, {
      status: "processing",
      paymentId: paymentRef.id,
    });

    // Create Payment
    t.create(paymentRef, {
      orderId,
      address: voucher.voucher.payload.from,
      voucher,
      status: "unpublished",
    });
  });

  return paymentRef.id;
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
    fullname: order.fullname,
    email: order.email,
    address: order.address || "",
    payment_id: order.payment_id || "",
    payment_method: order.payment_method,
    preference_id: order.payment_id || "",
    status: order.status || "pending",
  });

  return orderRef.id;
};

exports.log = log;
