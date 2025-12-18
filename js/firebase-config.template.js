// ============================================
// FIREBASE CONFIGURATION TEMPLATE
// ============================================
// INSTRUCTIONS:
// 1. Copy this file to firebase-config.js
// 2. Replace the placeholder values with your Firebase config
// 3. Get your config from: Firebase Console > Project Settings > Your Apps > Web App
// 4. firebase-config.js is in .gitignore and will NOT be committed to GitHub
// 5. Keep this template committed as a reference for other developers

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// ============================================
// INITIALIZE FIREBASE
// ============================================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,createUserWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp, writeBatch, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ============================================
// EXPORT FOR OTHER MODULES
// ============================================
export {
  app,
  auth,
  db,
  // Auth functions
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  // Firestore functions
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  writeBatch,
  onSnapshot
};

// ============================================
// CONFIGURATION VALIDATOR
// ============================================
export function validateConfig() {
  if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
    console.error("⚠️ Firebase not configured! Please copy firebase-config.template.js to firebase-config.js and add your Firebase credentials.");
    return false;
  }
  return true;
}
