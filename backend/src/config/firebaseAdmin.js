const {
  initializeApp,
  cert,
  getApps,
  getApp,
} = require("firebase-admin/app");

const serviceAccount = require(
  "../firebase/campusbites-firebase-key.json"
);

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApp();

console.log("🔥 Firebase Admin Initialized");

module.exports = app;