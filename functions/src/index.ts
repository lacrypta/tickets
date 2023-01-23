import * as functions from "firebase-functions";
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

export const newPost2 = functions.firestore
  .document("/orders/{orderId}")
  .onCreate((snapshot, context) => {
    functions.logger.info("Nueva orden id created:", context.params.orderId);
    return snapshot.ref.set({ test: "test" }, { merge: true });
  });
