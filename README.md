# CleanPro - Cleaning Company Management System

A comprehensive management system for cleaning companies built with HTML, CSS, JavaScript, and Firebase.

---

## 🚀 Quick Start

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Enter project name: `cleanpro-management` (or your preferred name)
4. Disable Google Analytics (optional, not needed for this app)
5. Click **"Create project"**

### Step 2: Enable Authentication

1. In Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Click on **"Email/Password"** provider
4. Enable **"Email/Password"** (first toggle)
5. Click **"Save"**

### Step 3: Create Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose your preferred location (closest to your users)
5. Click **"Enable"**

### Step 4: Set Up Firestore Security Rules

1. In Firestore, click the **"Rules"** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }
    
    match /admins/{adminId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin() && 
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'super_admin';
    }
    
    match /employees/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /teams/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /clients/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /schedules/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /timeEntries/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /expenses/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /payments/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /invoices/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /auditLog/{document=**} {
      allow read: if isAdmin();
      allow create: if isAdmin();
    }
    
    match /settings/{document=**} {
      allow read, write: if isAdmin();
    }
  }
}
```

3. Click **"Publish"**

### Step 5: Get Firebase Configuration

1. Click the **gear icon** next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** `</>`
5. Register app with nickname: `cleanpro-web`
6. Click **"Register app"**
7. Copy the `firebaseConfig` object - you'll need this!

It looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 6: Update the App Configuration

1. Open `js/firebase-config.js`
2. Replace the placeholder `firebaseConfig` with your actual config from Step 5
3. Save the file

### Step 7: Create Your First Admin Account

**IMPORTANT**: You must create the first admin manually in Firebase.

#### 7a. Create the Authentication User:
1. Go to **Authentication** → **Users** tab
2. Click **"Add user"**
3. Enter your email and a strong password
4. Click **"Add user"**
5. Copy the **User UID** (click on the user to see it)

#### 7b. Create the Admin Document:
1. Go to **Firestore Database**
2. Click **"Start collection"**
3. Collection ID: `admins`
4. Click **"Next"**
5. Document ID: **Paste the User UID from step 7a**
6. Add these fields:
   - `email` (string): your email
   - `name` (string): Your Name
   - `role` (string): `super_admin`
   - `createdAt` (timestamp): click the timestamp icon and select now
7. Click **"Save"**

### Step 8: Test Locally

Simply open `index.html` in your web browser to test. For best results, use a local server:

```bash
# If you have Python installed:
python -m http.server 8000

# Then open: http://localhost:8000
```

### Step 9: Deploy to Firebase Hosting (Optional)

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy --only hosting`

Your app will be live at: `https://your-project.web.app`

---

## 📁 Project Structure

```
cleaning-app/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── employees.html          # Employee management
├── clients.html            # Client management
├── scheduling.html         # Calendar & scheduling
├── timeclock.html          # Mobile clock in/out
├── finances.html           # Expenses, revenue, invoices
├── reports.html            # Reports & exports
├── audit-log.html          # Activity log viewer
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── firebase-config.js  # Firebase setup (UPDATE THIS!)
│   ├── i18n.js             # Translations (EN/ES)
│   ├── audit.js            # Audit logging
│   └── utils.js            # Utilities
├── assets/
└── README.md               # This file
```

---

## 🌐 Language Support

The app supports English and Spanish. Toggle language using the button in the header.

---

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| `super_admin` | Full access, can manage other admins |
| `admin` | Full access except admin management |
| `viewer` | Read-only access to all data |

---

## 📱 Mobile Access

The Time Clock page is optimized for mobile. Team leaders can clock in/out and view schedules.

---

## 🔧 Troubleshooting

### "Permission denied" error
- Make sure you're logged in
- Check that your user UID matches the admin document ID in Firestore

### Login not working
- Verify Email/Password auth is enabled in Firebase
- Check firebaseConfig is correct in firebase-config.js

---

Built with ❤️ for cleaning companies