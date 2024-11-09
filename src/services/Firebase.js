import { app } from '../firebaseConfig';  // Named import from firebaseConfig
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';  // Import Firebase Storage

// Initialize Firebase Authentication, Firestore, and Storage
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);  // Initialize Firebase Storage

/**
 * Firebase Authentication Functions
 */

// Login function (with Firebase Authentication)
export const loginUser = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login failed", error);
    throw error; // propagate error
  }
};

export const updateWorker = async (id, updatedData) => {
  const workerDocRef = doc(db, 'workers', id);
  await updateDoc(workerDocRef, updatedData);
};
// Register function (with Firebase Authentication)
export const registerUser = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Registration failed", error);
    throw error;
  }
};

// Logout function (with Firebase Authentication)
export const logoutUser = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};

/**
 * Firestore Functions for Sponsors
 */

// Fetch all sponsors
export const fetchSponsors = async () => {
  try {
    const sponsorsSnapshot = await getDocs(collection(db, "sponsors"));
    return sponsorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch sponsors", error);
    throw error;
  }
};

// Add new sponsor
export const addSponsor = async (sponsorData) => {
  try {
    const sponsorRef = doc(collection(db, "sponsors"));
    await setDoc(sponsorRef, sponsorData);
  } catch (error) {
    console.error("Failed to add sponsor", error);
    throw error;
  }
};

// Edit existing sponsor
export const editSponsor = async (id, sponsorData) => {
  try {
    const sponsorRef = doc(db, "sponsors", id);
    await updateDoc(sponsorRef, sponsorData);
  } catch (error) {
    console.error("Failed to edit sponsor", error);
    throw error;
  }
};

/**
 * Firestore Functions for Workers
 */

// Fetch all workers
export const fetchWorkers = async () => {
  try {
    const workersSnapshot = await getDocs(collection(db, "workers"));
    return workersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch workers", error);
    throw error;
  }
};

// Add new worker
export const addWorker = async (workerData) => {
  try {
    const workerRef = doc(collection(db, "workers"));
    await setDoc(workerRef, workerData);
  } catch (error) {
    console.error("Failed to add worker", error);
    throw error;
  }
};

// Edit existing worker
export const editWorker = async (id, workerData) => {
  try {
    const workerRef = doc(db, "workers", id);
    await updateDoc(workerRef, workerData);
  } catch (error) {
    console.error("Failed to edit worker", error);
    throw error;
  }
};

// Fetch total worker count
export const fetchTotalWorkers = async () => {
  try {
    const workersSnapshot = await getDocs(collection(db, "workers"));
    return workersSnapshot.size;  // Return the number of documents in the collection
  } catch (error) {
    console.error("Failed to fetch total workers", error);
    throw error;
  }
};

// Fetch worker by ID
export const fetchWorkerById = async (id) => {
  try {
    const workerRef = doc(db, 'workers', id);
    const workerSnap = await getDoc(workerRef);
    if (workerSnap.exists()) {
      return workerSnap.data();
    } else {
      console.error("No worker found with ID:", id);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch worker by ID", error);
    throw error;
  }
};

/**
 * Firestore Functions for Payments
 */

// Fetch all payments
export const fetchPayments = async () => {
  try {
    const paymentsSnapshot = await getDocs(collection(db, "payments"));
    return paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Failed to fetch payments", error);
    throw error;
  }
};

// Add new payment
export const addPayment = async (paymentData) => {
  try {
    const paymentRef = doc(collection(db, "payments"));
    await setDoc(paymentRef, paymentData);
  } catch (error) {
    console.error("Failed to add payment", error);
    throw error;
  }
};

/**
 * Firebase Storage Functions
 */

// Upload Image to Firebase Storage
export const uploadImage = async (file, path) => {
  try {
    const storageRef = ref(storage, path);  // Create a reference to the file path in Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);  // Upload the image file
    const downloadURL = await getDownloadURL(snapshot.ref);  // Get the download URL of the uploaded file
    return downloadURL;  // Return the download URL
  } catch (error) {
    console.error("Image upload failed", error);
    throw error;  // Propagate the error if the upload fails
  }
};

// Export the auth, db, and storage instances for use elsewhere
export { auth, db, storage };
