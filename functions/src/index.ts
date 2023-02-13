const admin = require("firebase-admin");
admin.initializeApp();

// Gateways
export * from "./gateways/mercadopago";

// Wallet
export * from "./wallet/scan";

// Notion
export * from "./notion/create";
