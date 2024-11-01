// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firestore and export it
const db = getFirestore(app);

// Export the Firebase app and Firestore db
export { app, db };  // Export 'app' and 'db' as named exports
