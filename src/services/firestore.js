// src/services/firestore.js

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

// Update Settings
export const updateSettings = async (settings) => {
  const docRef = doc(db, 'settings', 'appSettings'); // Adjust the document ID as needed
  try {
    await setDoc(docRef, settings, { merge: true }); // Merge updates existing fields
  } catch (error) {
    console.error('Error updating settings: ', error);
  }
};
