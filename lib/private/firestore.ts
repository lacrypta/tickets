import {
  IPurchaseVoucherPayload,
  IVoucherSignedStringified,
} from "./../../plugins/gateway/types/Voucher";
import { IPermit } from "../../types/crypto";
import { initializeApp, cert } from "firebase-admin/app";
import { IOrderItem } from "../../types/cart";

import {
  getFirestore,
  FieldValue,
  Transaction,
} from "firebase-admin/firestore";
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
 * Adds ERC20 Payment
 * @param orderId Order ID
 * @param voucher Voucher with Signature included
 * @param payload Payload
 * @returns
 */
export const addERC20Payment = async (
  orderId: string,
  voucher: IVoucherSignedStringified,
  payload: IPurchaseVoucherPayload
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
    if (!parseUnits(String(order?.total), 6).eq(payload.amount)) {
      throw new Error("The order and voucher amount don't match");
    }

    // Update Order
    t.update(orderRef, {
      status: "processing",
      paymentId: paymentRef.id,
      address: payload.from,
    });

    // Create Payment
    t.create(paymentRef, {
      orderId,
      // address: voucher.voucher.payload.from,
      voucher,
      payload: {
        from: payload.from,
        to: payload.to,
        amount: payload.amount.toString(),
      },
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
export const addOrder = async (
  items: IOrderItem[],
  paymentMethod: string,
  total: number,
  address?: string
): Promise<number | undefined> => {
  let orderId;
  await db.runTransaction(async (t) => {
    orderId = await _getNewOrderId(t);
    const orderRef = db.collection("orders").doc(String(orderId));

    await t.create(orderRef, {
      items,
      total,
      paymentMethod,
      status: "pending",
      address: address || "",
    });
  });

  return orderId;
};

//------------- PRIVATE FUNCTIONS -------------//

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
