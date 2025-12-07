// ============================================
// FIREBASE CONFIGURATION
// ============================================
// IMPORTANT: Replace this config with your own from Firebase Console
// Go to: Project Settings > Your Apps > Web App > Config

const firebaseConfig = {
  apiKey: "AIzaSyBvO8SvHyhcQuwuWZR2QvYcxpvhJs9mnSY",
  authDomain: "cleanpro-74d87.firebaseapp.com",
  projectId: "cleanpro-74d87",
  storageBucket: "cleanpro-74d87.firebasestorage.app",
  messagingSenderId: "505465546490",
  appId: "1:505465546490:web:d3ba022c8ff9f0f2748b43",
  measurementId: "G-JF9782TQ3S"
};

// ============================================
// INITIALIZE FIREBASE
// ============================================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, Timestamp, writeBatch, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

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
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  // Firestore functions
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
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
    console.error("⚠️ Firebase not configured! Please update js/firebase-config.js with your Firebase config.");
    return false;
  }
  return true;
}