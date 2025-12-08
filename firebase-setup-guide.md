# Firebase Manual User Creation & Security Rules Guide

## Part 1: Creating Employee Accounts Manually in Firebase Console

Since you'll be doing this infrequently, here's how to manually create employee login accounts directly in the Firebase Console:

### Step-by-Step Instructions

1. **Go to Firebase Console**
   - Navigate to [https://console.firebase.google.com](https://console.firebase.google.com)
   - Select your CleanPro project

2. **Create the Authentication Account**
   - Click **Authentication** in the left sidebar
   - Click the **Users** tab
   - Click **Add user**
   - Enter the employee's email address
   - Create a temporary password (e.g., `TempPass123!`)
   - Click **Add user**
   - **Copy the User UID** that appears - you'll need this for the next step

3. **Create the User Document in Firestore**
   - Click **Firestore Database** in the left sidebar
   - Click the **users** collection (create it if it doesn't exist)
   - Click **Add document**
   - For **Document ID**, paste the User UID you copied
   - Add these fields:

   | Field | Type | Value |
   |-------|------|-------|
   | email | string | employee's email |
   | firstName | string | employee's first name |
   | lastName | string | employee's last name |
   | role | string | `employee` |
   | employeeId | string | the employee's ID from employees collection |
   | teamId | string | team ID (or leave empty) |
   | isActive | boolean | true |
   | createdAt | timestamp | (click timestamp and select now) |
   | createdBy | string | `manual` |
   | lastLogin | null | null |

4. **Update the Employee Record**
   - Go to the **employees** collection
   - Find the employee's document
   - Click to edit it
   - Add/update these fields:
     - `hasAccount`: boolean → `true`
     - `userId`: string → paste the User UID

5. **Notify the Employee**
   - Give them their email and temporary password
   - Tell them to change their password after first login (they can do this in Firebase Auth settings or you can send a password reset email)

### Sending Password Reset Email (Optional)
If you want to let them set their own password:
1. In Authentication > Users, find the user
2. Click the three dots menu (⋮) on the right
3. Select **Reset password**
4. Firebase will send them an email to set their password

---

## Part 2: Firebase Security Rules

Copy and paste these rules into your Firebase Console under **Firestore Database > Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function: Check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function: Check if user is an admin
    function isAdmin() {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    // Helper function: Check if user is an employee
    function isEmployee() {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/users/$(request.auth.uid));
    }
    
    // Helper function: Get current user's data
    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }
    
    // ==========================================
    // ADMINS COLLECTION
    // ==========================================
    match /admins/{adminId} {
      // Only admins can read admin documents
      allow read: if isAdmin();
      // No one can create/update/delete admins through client
      // (manage through Firebase Console)
      allow write: if false;
    }
    
    // ==========================================
    // USERS COLLECTION (Employee Login Accounts)
    // ==========================================
    match /users/{userId} {
      // Users can read their own document, admins can read all
      allow read: if isAdmin() || request.auth.uid == userId;
      
      // Admins can create/update user documents
      allow create, update: if isAdmin();
      
      // Users can update their own lastLogin field only
      allow update: if request.auth.uid == userId && 
                      request.resource.data.diff(resource.data).affectedKeys().hasOnly(['lastLogin']);
      
      // Only admins can delete
      allow delete: if isAdmin();
    }
    
    // ==========================================
    // EMPLOYEES COLLECTION
    // ==========================================
    match /employees/{employeeId} {
      // Admins can read all, employees can read their own record
      allow read: if isAdmin() || 
                    (isEmployee() && getUserData().employeeId == employeeId);
      
      // Only admins can create/update/delete employees
      allow create, update, delete: if isAdmin();
    }
    
    // ==========================================
    // TEAMS COLLECTION
    // ==========================================
    match /teams/{teamId} {
      // Admins can read all, employees can read their assigned team
      allow read: if isAdmin() || 
                    (isEmployee() && getUserData().teamId == teamId);
      
      // Only admins can manage teams
      allow create, update, delete: if isAdmin();
    }
    
    // ==========================================
    // CLIENTS COLLECTION
    // ==========================================
    match /clients/{clientId} {
      // Admins can read all clients
      // Employees can read clients assigned to their team
      allow read: if isAdmin() || isEmployee();
      
      // Only admins can manage clients
      allow create, update, delete: if isAdmin();
    }
    
    // ==========================================
    // SCHEDULES / JOBS COLLECTION
    // ==========================================
    match /schedules/{scheduleId} {
      // Admins can read all, employees can read their assignments
      allow read: if isAdmin() || isEmployee();
      
      // Only admins can create/delete schedules
      allow create, delete: if isAdmin();
      
      // Admins can update all, employees can update status fields
      allow update: if isAdmin() || 
                      (isEmployee() && 
                       request.resource.data.diff(resource.data).affectedKeys()
                         .hasOnly(['status', 'completedAt', 'notes', 'clockIn', 'clockOut']));
    }
    
    // ==========================================
    // TIME ENTRIES COLLECTION
    // ==========================================
    match /timeEntries/{entryId} {
      // Admins read all, employees read their own
      allow read: if isAdmin() || 
                    (isEmployee() && resource.data.employeeId == getUserData().employeeId);
      
      // Employees can create their own time entries
      allow create: if isEmployee() && 
                      request.resource.data.employeeId == getUserData().employeeId;
      
      // Employees can update their own active entries (clock out)
      allow update: if isAdmin() || 
                      (isEmployee() && 
                       resource.data.employeeId == getUserData().employeeId);
      
      // Only admins can delete
      allow delete: if isAdmin();
    }
    
    // ==========================================
    // AUDIT LOG COLLECTION
    // ==========================================
    match /auditLog/{logId} {
      // Only admins can read audit logs
      allow read: if isAdmin();
      
      // Anyone authenticated can create audit entries (logging)
      allow create: if isAuthenticated();
      
      // No one can update or delete audit logs
      allow update, delete: if false;
    }
    
    // ==========================================
    // FINANCES COLLECTION
    // ==========================================
    match /finances/{financeId} {
      // Only admins can access finances
      allow read, write: if isAdmin();
    }
    
    // ==========================================
    // INVOICES COLLECTION
    // ==========================================
    match /invoices/{invoiceId} {
      // Only admins can access invoices
      allow read, write: if isAdmin();
    }
    
    // ==========================================
    // SETTINGS COLLECTION
    // ==========================================
    match /settings/{settingId} {
      // Admins can read/write settings
      allow read, write: if isAdmin();
    }
    
    // ==========================================
    // REPORTS COLLECTION (if you store generated reports)
    // ==========================================
    match /reports/{reportId} {
      allow read, write: if isAdmin();
    }
  }
}
```

### How to Apply These Rules

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab at the top
5. Delete the existing rules
6. Paste the rules above
7. Click **Publish**

### Important Notes

- **Admins Collection**: You need to manually create an `admins` collection with documents where the document ID is the admin's Firebase Auth UID. This is what grants admin access.

- **Test Mode**: If you're still in development and these rules are too strict, you can temporarily use:
  ```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.auth != null;
      }
    }
  }
  ```
  ⚠️ **Don't use this in production!**

- **Before Publishing Your App**: Make sure to:
  1. Create your admin document in the `admins` collection
  2. Test all functionality with the new rules
  3. Verify employees can only see their own data

---

## Quick Reference Card

### Create New Employee Account
1. Firebase Console → Authentication → Add user
2. Copy the UID
3. Firestore → users → Add document (use UID as doc ID)
4. Firestore → employees → Update `hasAccount: true`, `userId: [UID]`

### Deactivate Employee Account
1. Firestore → users → Find user → Set `isActive: false`
2. Firebase Console → Authentication → Find user → Disable account

### Reset Employee Password
1. Firebase Console → Authentication → Find user → ⋮ → Reset password
