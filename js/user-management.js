// user-management.js
// This module handles managing user accounts for employees
// Cloud Functions (functions/index.js) handles account creation

import {
  auth, db,
  sendPasswordResetEmail,
  collection, doc, updateDoc, getDocs, query, where,
  Timestamp
} from './firebase-config.js';

/**
 * Send a password reset email to an employee
 * @param {string} email - Employee's email address
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendEmployeePasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset email sent' };
  } catch (error) {
    console.error('Error sending password reset:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Check if an employee has a user account
 * @param {string} email - Employee's email address
 * @returns {Promise<{hasAccount: boolean, userId?: string}>}
 */
export async function checkEmployeeAccount(email) {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      return { hasAccount: true, userId: userDoc.id, data: userDoc.data() };
    }
    
    return { hasAccount: false };
  } catch (error) {
    console.error('Error checking employee account:', error);
    return { hasAccount: false, error: error.message };
  }
}

/**
 * Update employee's user account status
 * @param {string} userId - Firebase Auth user ID
 * @param {boolean} isActive - Whether the account should be active
 */
export async function updateAccountStatus(userId, isActive) {
  try {
    await updateDoc(doc(db, 'users', userId), {
      isActive: isActive,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating account status:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Generate a random temporary password
 */
export function generateTempPassword(length = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}