const admin = require("firebase-admin");
admin.initializeApp();

process.env.FUNCTIONS_URL = `https://${process.env.CLOUD_FUNCTIONS_REGION}-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/`;

// Gateways
export * from "./gateways/mercadopago";
