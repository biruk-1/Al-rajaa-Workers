import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Import Firebase Authentication
import { getAuth, updateProfile } from 'firebase/auth';

// Initialize Firebase Authentication
const auth = getAuth();

// --------------------
// Worker Management
// --------------------

// Fetch Workers
export const fetchWorkers = async () => {
  const querySnapshot = await getDocs(collection(db, 'workers'));
  const workers = [];
  querySnapshot.forEach((doc) => {
    workers.push({ id: doc.id, ...doc.data() });
  });
  return workers;
};

// Add Worker
export const addWorker = async (worker) => {
  try {
    await addDoc(collection(db, 'workers'), worker);
  } catch (error) {
    console.error('Error adding worker: ', error);
  }
};

// Update Worker
export const updateWorker = async (id, updatedWorker) => {
  const workerDoc = doc(db, 'workers', id);
  try {
    await updateDoc(workerDoc, updatedWorker);
  } catch (error) {
    console.error('Error updating worker: ', error);
  }
};

// Delete Worker
export const deleteWorker = async (id) => {
  const workerDoc = doc(db, 'workers', id);
  try {
    await deleteDoc(workerDoc);
  } catch (error) {
    console.error('Error deleting worker: ', error);
  }
};

// --------------------
// Support Requests Management
// --------------------

// Fetch Support Requests
export const fetchSupportRequests = async () => {
  const querySnapshot = await getDocs(collection(db, 'supportRequests'));
  const supportRequests = [];
  querySnapshot.forEach((doc) => {
    supportRequests.push({ id: doc.id, ...doc.data() });
  });
  return supportRequests;
};

// Add Support Request
export const addSupportRequest = async (supportRequest) => {
  try {
    await addDoc(collection(db, 'supportRequests'), supportRequest);
  } catch (error) {
    console.error('Error adding support request: ', error);
  }
};
// Rename this function
export const updateSettings = async (settings) => {
  const docRef = doc(db, 'settings', 'appSettings'); // Adjust the document ID as needed
  try {
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.error('Error updating settings: ', error);
  }
};

// Update Support Request
export const updateSupportRequest = async (id, updatedRequest) => {
  const requestDoc = doc(db, 'supportRequests', id);
  try {
    await updateDoc(requestDoc, updatedRequest);
  } catch (error) {
    console.error('Error updating support request: ', error);
  }
};

// Delete Support Request
export const deleteSupportRequest = async (id) => {
  const requestDoc = doc(db, 'supportRequests', id);
  try {
    await deleteDoc(requestDoc);
  } catch (error) {
    console.error('Error deleting support request: ', error);
  }
};

// --------------------
// Settings Management
// --------------------

// Fetch Settings
export const fetchSettings = async () => {
  const docRef = doc(db, 'settings', 'appSettings'); // Adjust the document ID as needed
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No settings found!');
    return null;
  }
};

// Update App Settings (Basic settings)
export const updateAppSettings = async (settings) => {
  const docRef = doc(db, 'settings', 'appSettings'); // Adjust the document ID as needed
  try {
    await setDoc(docRef, settings, { merge: true }); // Merge updates existing fields
  } catch (error) {
    console.error('Error updating settings: ', error);
  }
};

// Update User Settings (Including profile and password)
export const updateUserSettings = async (settings) => {
  const docRef = doc(db, 'settings', 'appSettings'); // Adjust the document ID as needed

  try {
    await setDoc(docRef, settings, { merge: true });

    const user = auth.currentUser;
    if (user) {
      if (settings.userName) {
        await updateProfile(user, { displayName: settings.userName });
      }
      if (settings.userEmail && user.email !== settings.userEmail) {
        await user.updateEmail(settings.userEmail); // Update email in Firebase Auth
      }
      if (settings.password) {
        await user.updatePassword(settings.password); // Update password in Firebase Auth
      }
    }
  } catch (error) {
    console.error('Error updating settings: ', error);
    throw error; // Re-throw error to handle in the component
  }
};

// --------------------
// Sponsor Management
// --------------------

// Fetch Sponsors (with null checks)
export const fetchSponsors = async () => {
  const querySnapshot = await getDocs(collection(db, 'sponsors'));
  const sponsors = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // Ensure that sponsor has necessary data before adding it
    if (data && data.name && data.country && data.passportNumber) {
      sponsors.push({ id: doc.id, ...data });
    }
  });

  return sponsors;
};

// Fetch Sponsor Details (by sponsorId)
export const fetchSponsorDetails = async (id) => {
  try {
    const sponsorDocRef = doc(db, 'sponsors', id);
    const sponsorDoc = await getDoc(sponsorDocRef);

    if (sponsorDoc.exists()) {
      return { id: sponsorDoc.id, ...sponsorDoc.data() }; // Return the sponsor data
    } else {
      console.error('Sponsor not found!');
      return null; // If no sponsor found, return null
    }
  } catch (error) {
    console.error('Error fetching sponsor details:', error);
    return null; // Return null in case of error
  }
};
