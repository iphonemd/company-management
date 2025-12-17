const admin = require('firebase-admin');

admin.initializeApp();

// Simple HTTP endpoint for creating employee accounts
// Called from client after employee account is created in Auth
exports.syncEmployeeAccount = require('firebase-functions').https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { employeeId, email, firstName, lastName, teamId, role, tempPassword } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authHeader.substring('Bearer '.length);

    // Verify the token is valid
    const decodedToken = await admin.auth().verifyIdToken(token);
    const adminUid = decodedToken.uid;

    console.log('Account creation requested by admin:', adminUid);

    // Verify admin exists
    const adminDoc = await admin.firestore().collection('admins').doc(adminUid).get();
    if (!adminDoc.exists) {
      res.status(403).json({ error: 'Only admins can create employee accounts' });
      return;
    }

    // Step 1: Create Firebase Auth user with temporary password
    console.log('Creating Firebase Auth user:', email);
    const userRecord = await admin.auth().createUser({
      email: email,
      password: tempPassword,
      displayName: `${firstName} ${lastName}`
    });
    const uid = userRecord.uid;
    console.log('Auth user created:', uid);

    // Step 2: Create user document in Firestore
    await admin.firestore().collection('users').doc(uid).set({
      email: email,
      role: role || 'employee',
      employeeId: employeeId,
      teamId: teamId || null,
      firstName: firstName,
      lastName: lastName,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: adminUid,
      isActive: true,
      lastLogin: null
    });

    // Step 3: Update employee document
    await admin.firestore().collection('employees').doc(employeeId).update({
      hasAccount: true,
      authUid: uid,
      accountCreatedBy: adminUid,
      accountCreatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Step 4: Log in audit collection
    await admin.firestore().collection('auditLog').add({
      action: 'employee_account_created',
      adminUid: adminUid,
      employeeId: employeeId,
      employeeEmail: email,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      adminName: adminDoc.data()?.name || 'Unknown Admin'
    });

    res.json({
      success: true,
      message: `Account created for ${firstName} ${lastName}`,
      uid: uid,
      email: email,
    });
  } catch (error) {
    console.error('Error in syncEmployeeAccount:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete employee account and all related auth/Firestore records
// Called from client when deleting an employee
exports.deleteEmployeeAccount = require('firebase-functions').https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { employeeId, authUid } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authHeader.substring('Bearer '.length);

    // Verify the token is valid
    const decodedToken = await admin.auth().verifyIdToken(token);
    const adminUid = decodedToken.uid;

    console.log('Employee deletion requested by admin:', adminUid);

    // Verify admin exists
    const adminDoc = await admin.firestore().collection('admins').doc(adminUid).get();
    if (!adminDoc.exists) {
      res.status(403).json({ error: 'Only admins can delete employee accounts' });
      return;
    }

    // Step 1: Delete Firebase Auth user (if authUid provided)
    if (authUid) {
      try {
        await admin.auth().deleteUser(authUid);
        console.log('Auth user deleted:', authUid);
      } catch (error) {
        console.log('Auth user not found or already deleted:', authUid);
      }
    }

    // Step 2: Delete user document from Firestore (if it exists)
    if (authUid) {
      await admin.firestore().collection('users').doc(authUid).delete();
      console.log('User Firestore document deleted:', authUid);
    }

    // Step 3: Log the deletion to audit collection
    await admin.firestore().collection('auditLog').add({
      action: 'employee_account_deleted',
      adminUid: adminUid,
      employeeId: employeeId,
      authUid: authUid || null,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      adminName: adminDoc.data()?.name || 'Unknown Admin'
    });

    res.json({
      success: true,
      message: 'Employee account and login deleted successfully',
      employeeId: employeeId,
      authUid: authUid
    });
  } catch (error) {
    console.error('Error in deleteEmployeeAccount:', error);
    res.status(500).json({ error: error.message });
  }
});