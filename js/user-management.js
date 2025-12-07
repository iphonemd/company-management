// user-management.js
// This module handles creating and managing user accounts for employees
// Add this to your js/ folder

import { 
  auth, db, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  collection, doc, setDoc, getDoc, updateDoc, getDocs, query, where,
  Timestamp
} from './firebase-config.js';

/**
 * Create a new user account for an employee
 * This function handles the admin session properly by:
 * 1. Storing admin credentials temporarily
 * 2. Creating the new user
 * 3. Writing to Firestore while signed in as new user
 * 4. Signing out new user
 * 5. Re-authenticating admin
 * 
 * @param {string} email - Employee's email address
 * @param {string} password - Temporary password
 * @param {object} employeeData - Employee information
 * @param {string} adminEmail - Current admin's email (for re-auth)
 * @param {string} adminPassword - Current admin's password (for re-auth)
 * @returns {Promise<{success: boolean, uid?: string, error?: string}>}
 */
export async function createEmployeeAccount(email, password, employeeData, adminEmail, adminPassword) {
  try {
    // Validate inputs
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }
    
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    if (!adminEmail || !adminPassword) {
      return { success: false, error: 'Admin credentials required for re-authentication' };
    }
    
    // Store admin info before creating new user
    const adminUid = auth.currentUser?.uid;
    
    // Create the user account in Firebase Auth
    // This WILL sign out the admin and sign in as the new user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    const newUserUid = newUser.uid;
    
    // Now we're signed in as the NEW user
    // Create the user document in Firestore
    // The new user should have permission to write their own document
    try {
      await setDoc(doc(db, 'users', newUserUid), {
        email: email,
        role: employeeData.role || 'employee',
        employeeId: employeeData.employeeId,
        teamId: employeeData.teamId || null,
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        createdAt: Timestamp.now(),
        createdBy: adminUid || 'system',
        isActive: true,
        lastLogin: null
      });
    } catch (firestoreError) {
      console.error('Error creating user document:', firestoreError);
      // Continue anyway - we'll try to fix this after re-auth
    }
    
    // Sign out the new user
    await auth.signOut();
    
    // Re-authenticate as admin
    try {
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      
      // Now we're back as admin - verify/create the user document
      const userDocRef = doc(db, 'users', newUserUid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        // Create it now as admin
        await setDoc(userDocRef, {
          email: email,
          role: employeeData.role || 'employee',
          employeeId: employeeData.employeeId,
          teamId: employeeData.teamId || null,
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          createdAt: Timestamp.now(),
          createdBy: adminUid || 'system',
          isActive: true,
          lastLogin: null
        });
      }
      
      // Update the employee record
      if (employeeData.employeeId) {
        await updateDoc(doc(db, 'employees', employeeData.employeeId), {
          hasAccount: true,
          userId: newUserUid,
          updatedAt: Timestamp.now()
        });
      }
      
      return { 
        success: true, 
        uid: newUserUid,
        message: 'Account created successfully!'
      };
      
    } catch (reAuthError) {
      console.error('Error re-authenticating admin:', reAuthError);
      return { 
        success: true, 
        uid: newUserUid,
        message: 'Account created but you were signed out. Please log in again.',
        requiresReauth: true
      };
    }
    
  } catch (error) {
    console.error('Error creating employee account:', error);
    
    let errorMessage = 'Failed to create account';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'An account with this email already exists';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Use at least 6 characters.';
    }
    
    // Try to re-auth admin even on error
    if (adminEmail && adminPassword) {
      try {
        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      } catch (e) {
        console.error('Could not re-authenticate admin:', e);
      }
    }
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Simpler version that doesn't require admin password
 * Creates user and stores data in localStorage, then admin manually triggers sync
 */
export async function createEmployeeAccountSimple(email, password, employeeData) {
  try {
    // Validate inputs
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }
    
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }
    
    const adminUid = auth.currentUser?.uid;
    
    // Store pending user data BEFORE creating the account
    const pendingUserData = {
      email: email,
      role: employeeData.role || 'employee',
      employeeId: employeeData.employeeId,
      teamId: employeeData.teamId || null,
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      createdBy: adminUid || 'system',
      createdAt: new Date().toISOString()
    };
    
    // Store in localStorage
    const pendingUsers = JSON.parse(localStorage.getItem('pendingUserAccounts') || '[]');
    pendingUsers.push(pendingUserData);
    localStorage.setItem('pendingUserAccounts', JSON.stringify(pendingUsers));
    
    // Create the user account - this will sign us out
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUserUid = userCredential.user.uid;
    
    // Update localStorage with the UID
    const updatedPending = JSON.parse(localStorage.getItem('pendingUserAccounts') || '[]');
    const lastPending = updatedPending[updatedPending.length - 1];
    if (lastPending && lastPending.email === email) {
      lastPending.uid = newUserUid;
      localStorage.setItem('pendingUserAccounts', JSON.stringify(updatedPending));
    }
    
    // Sign out the new user
    await auth.signOut();
    
    return { 
      success: true, 
      uid: newUserUid,
      message: 'Account created! Please log in again to complete setup.',
      requiresReauth: true,
      pendingSync: true
    };
    
  } catch (error) {
    console.error('Error creating employee account:', error);
    
    let errorMessage = 'Failed to create account';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'An account with this email already exists';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Use at least 6 characters.';
    }
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Call this after admin logs back in to sync pending user accounts
 */
export async function syncPendingUserAccounts() {
  const pendingUsers = JSON.parse(localStorage.getItem('pendingUserAccounts') || '[]');
  
  if (pendingUsers.length === 0) {
    return { synced: 0 };
  }
  
  let syncedCount = 0;
  const remainingUsers = [];
  
  for (const userData of pendingUsers) {
    if (!userData.uid) {
      remainingUsers.push(userData);
      continue;
    }
    
    try {
      // Check if user document already exists
      const userDocRef = doc(db, 'users', userData.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (!userDocSnap.exists()) {
        // Create the user document
        await setDoc(userDocRef, {
          email: userData.email,
          role: userData.role || 'employee',
          employeeId: userData.employeeId,
          teamId: userData.teamId || null,
          firstName: userData.firstName,
          lastName: userData.lastName,
          createdAt: Timestamp.now(),
          createdBy: userData.createdBy || 'system',
          isActive: true,
          lastLogin: null
        });
      }
      
      // Update the employee record
      if (userData.employeeId) {
        await updateDoc(doc(db, 'employees', userData.employeeId), {
          hasAccount: true,
          userId: userData.uid,
          updatedAt: Timestamp.now()
        });
      }
      
      syncedCount++;
    } catch (error) {
      console.error('Error syncing user:', userData.email, error);
      remainingUsers.push(userData);
    }
  }
  
  // Update localStorage
  localStorage.setItem('pendingUserAccounts', JSON.stringify(remainingUsers));
  
  return { synced: syncedCount, remaining: remainingUsers.length };
}

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