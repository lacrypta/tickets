const admin = require("firebase-admin");
admin.initializeApp();

// Gateways
export * from "./gateways/mercadopago";
