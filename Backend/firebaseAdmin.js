// firebaseAdmin.js
const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);    

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "shopping-3c3a6.appspot.com",
});

const bucket = admin.storage().bucket();

module.exports = { bucket };
