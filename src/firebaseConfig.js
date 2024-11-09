// src/firebaseConfig.js
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjnvZWvMTKXwqjHVNvSjbAQU2t6H1A3aI",
  authDomain: "worekers-managment.firebaseapp.com",
  projectId: "worekers-managment",
  storageBucket: "worekers-managment.appspot.com",
  messagingSenderId: "334805552475",
  appId: "1:334805552475:web:20ad8f63f1a3cafd62de7e",
  measurementId: "G-GGMS40P3JS"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(); // Use the existing app
}

// Initialize Firestore and Firebase Storage
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize Storage

// Export the Firebase app, Firestore db, and Storage
export { app, db, storage };