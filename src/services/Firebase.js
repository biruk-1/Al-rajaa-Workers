// services/Firebase.js
import { app } from '../firebaseConfig';  // Named import
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Firebase Authentication Functions
 */

// Login function (with Firebase Authentication)
export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Register function (with Firebase Authentication)
export const registerUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Logout function (with Firebase Authentication)
export const logoutUser = async () => {
  return signOut(auth);
};

/**
 * Firestore Functions for Sponsors
 */

// Fetch all sponsors
export const fetchSponsors = async () => {
  const sponsorsSnapshot = await getDocs(collection(db, "sponsors")); // Fetch sponsors
  return sponsorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Return data with document ID
};

// Add new sponsor
export const addSponsor = async (sponsorData) => {
  const sponsorRef = doc(collection(db, "sponsors")); // Create a new document reference
  await setDoc(sponsorRef, sponsorData); // Save the sponsor document
};

// Edit existing sponsor
export const editSponsor = async (id, sponsorData) => {
  const sponsorRef = doc(db, "sponsors", id); // Reference to the sponsor document
  await updateDoc(sponsorRef, sponsorData); // Update the sponsor document
};

/**
 * Firestore Functions for Workers
 */

// Fetch all workers
export const fetchWorkers = async () => {
  const workersSnapshot = await getDocs(collection(db, "workers")); // Fetch workers
  return workersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Return data with document ID
};

// Add new worker
export const addWorker = async (workerData) => {
  const workerRef = doc(collection(db, "workers")); // Create a new document reference
  await setDoc(workerRef, workerData); // Save the worker document
};

// Edit existing worker
export const editWorker = async (id, workerData) => {
  const workerRef = doc(db, "workers", id); // Reference to the worker document
  await updateDoc(workerRef, workerData); // Update the worker document
};

// Fetch total worker count
export const fetchTotalWorkers = async () => {
  const workersSnapshot = await getDocs(collection(db, "workers")); // Fetch workers
  return workersSnapshot.size; // Return the number of documents in the collection
};

/**
 * Firestore Functions for Payments
 */

// Fetch all payments
export const fetchPayments = async () => {
  const paymentsSnapshot = await getDocs(collection(db, "payments")); // Fetch payments
  return paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Return data with document ID
};

// Add new payment
export const addPayment = async (paymentData) => {
  const paymentRef = doc(collection(db, "payments")); // Create a new document reference
  await setDoc(paymentRef, paymentData); // Save the payment document
};

// Export the auth and db instances for use elsewhere
export { auth, db };
