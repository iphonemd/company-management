# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CleanPro is a cleaning company management system built with vanilla HTML, CSS, and JavaScript. It uses Firebase for backend services (Authentication, Firestore database). The application manages employees, clients, scheduling, time tracking, finances, and reporting.

## Running the Application

No build step required. The app runs directly in the browser.

**Local development:**
```bash
# Option 1: Python simple server
python -m http.server 8000

# Option 2: Open index.html directly in browser
```

**Production Deployment (Firebase Hosting):**
```bash
firebase deploy --only hosting
```

Live at: https://cleanpro-74d87.web.app

## Firebase Configuration & Security

### API Key Management

⚠️ **IMPORTANT: API keys are kept OUT of the repository for security.**

- `js/firebase-config.js` - **Local only** (in .gitignore, never committed)
- `js/firebase-config.template.js` - Safe template reference (safe to commit)

**When setting up locally or deploying:**
1. Copy `firebase-config.template.js` to `firebase-config.js` if it doesn't exist
2. Update only the `apiKey` field with your Firebase API key from GCP Console
3. Keep all other config values unchanged
4. **Never commit `firebase-config.js`** to GitHub - it's automatically ignored

**Deployment workflow:**
1. Commit code changes to GitHub (firebase-config.js will NOT be included due to .gitignore)
2. Pull the latest code to your deployment machine
3. Ensure `firebase-config.js` exists locally with the correct API key
4. Run `firebase deploy --only hosting` to deploy to Firebase Hosting
5. Firebase automatically uses your project credentials for the hosted version

### API Key Restrictions (GCP Console)

The API key is restricted to:
- **APIs:** Identity Toolkit API, Cloud Firestore API
- **Application restrictions:** HTTP referrers
  - `https://cleanpro-74d87.web.app/*`
  - `https://cleanpro-74d87.firebaseapp.com/*`
  - `localhost:8000/*` (for local development)

## Architecture

### Technology Stack
- **Frontend:** Vanilla HTML/CSS/JavaScript (no framework)
- **Backend:** Firebase (Auth + Firestore)
- **Module System:** ES6 modules loaded from CDN (firebase-app.js, firebase-auth.js, firebase-firestore.js)

### Key Files

**Core JavaScript modules (in `js/`):**
- `firebase-config.js` - Firebase initialization, exports all Firebase functions (auth, db, collection, doc, etc.)
- `i18n.js` - Internationalization with English/Spanish support. Uses `data-i18n` attributes for automatic translation
- `utils.js` - Common utilities: date formatting, currency, DOM helpers, toast notifications, modals, CSV export
- `audit.js` - Audit logging system with `logAudit()` and helper functions per module
- `user-management.js` - Employee account management utilities (password reset, account status updates). Account creation is handled by Cloud Functions

**HTML pages:**
- `index.html` - Login page
- `dashboard.html` - Main dashboard with navigation sidebar (copied to all pages)
- `employees.html` - Employee and team management
- `clients.html` - Client management with service configuration
- `scheduling.html` - Weekly calendar with drag-and-drop scheduling
- `timeclock.html` - Mobile-optimized time clock for field workers
- `employee-hours.html` - Payroll/hours tracking
- `finances.html` - Expenses, revenue, invoices
- `reports.html` - Report generation and exports
- `audit-log.html` - Activity log viewer

### Firestore Collections
- `admins` - Admin users (document ID = Firebase Auth UID)
- `employees` - Employee records
- `teams` - Team configurations
- `clients` - Client information with service details
- `schedules` - Job schedules
- `timeEntries` - Clock in/out records
- `expenses` - Business expenses
- `payments` - Payment records
- `invoices` - Invoice documents
- `auditLog` - Activity audit trail
- `users` - Employee user accounts (for timeclock access)

### Authentication & Roles

Three user roles: `super_admin`, `admin`, `viewer`
- Authentication checks happen in each HTML page via `onAuthStateChanged`
- Admin status verified by checking if user's UID exists in `admins` collection

### Internationalization

The `i18n` object is exported from `i18n.js`:
- `i18n.t('key')` - Get translation
- `i18n.setLanguage('en'|'es')` - Change language
- `i18n.formatDate()`, `i18n.formatCurrency()` - Locale-aware formatting

Use `data-i18n="keyName"` attribute on HTML elements for automatic translation.

### Import Pattern

All pages use ES6 module imports:
```javascript
import { db, auth, collection, doc, ... } from './js/firebase-config.js';
import { i18n } from './js/i18n.js';
import { showToast, openModal, ... } from './js/utils.js';
```

### Inline JavaScript

Each HTML page contains its own `<script type="module">` block with page-specific logic. There are no separate JS files per page - all JavaScript is embedded in the HTML files.

### Scheduling System

Schedules use a `routeOrder` field (integer) to enumerate clients per team per day. The old `timeSlot` system (morning/afternoon) is deprecated and no longer used.

**Key fields in `schedules` collection:**
- `date` - String in YYYY-MM-DD format
- `clientId` - Reference to client document
- `teamId` - Reference to team document
- `routeOrder` - Integer indicating the client's position in the team's route for the day
- `status` - One of: scheduled, in_progress, completed, cancelled

When displaying schedules, sort by team name first, then by routeOrder.

## Firestore Security Rules

The application uses role-based access control with two user types:
- **Admins**: Full read/write access to manage the business
- **Employees**: Limited access to perform their assigned work

**Current Rules:**
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isAdmin() {
      return isAuthenticated() &&
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    function isEmployee() {
      return isAuthenticated() &&
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isActive == true;
    }

    function isAuthorized() {
      return isAdmin() || isEmployee();
    }

    // 1. Authentication Profiles
    match /admins/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    match /users/{userId} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isAdmin());
      allow create: if isAdmin(); // For Cloud Functions
      allow write: if isAdmin();
    }

    // 2. Operational Data (Read Only for Employees)
    match /config/{docId} {
      allow read: if isAuthorized();
      allow write: if isAdmin();
    }

    match /clients/{docId} {
      allow read: if isAuthorized();
      allow write: if isAdmin();
    }

    match /employees/{docId} {
      allow read: if isAuthorized();
      allow write: if isAdmin();
    }

    match /teams/{docId} {
      allow read: if isAuthorized();
      allow write: if isAdmin();
    }

    // 3. Operational Data (Read & Write for Employees)
    match /schedules/{docId} {
      allow read: if isAuthorized();
      allow update: if isAuthorized();
      allow create, delete: if isAdmin();
    }

    match /timeEntries/{docId} {
      allow read: if isAuthorized();
      allow create, update: if isAuthorized();
      allow delete: if isAdmin();
    }

    match /jobCompletions/{docId} {
      allow read: if isAdmin();
      allow create: if isAuthorized();
      allow update, delete: if isAdmin();
    }

    match /payments/{docId} {
      allow read: if isAdmin();
      allow create: if isAuthorized();
      allow update, delete: if isAdmin();
    }

    match /auditLog/{docId} {
      allow read: if isAdmin();
      allow create: if isAuthorized();
      allow update, delete: if isAdmin();
    }

    // 4. Admin Only Data
    match /expenses/{docId} {
      allow read, write: if isAdmin();
    }

    match /invoices/{docId} {
      allow read, write: if isAdmin();
    }
  }
}
```

## Employee Account Management

### Account Creation
Account creation uses Cloud Functions (`functions/index.js`) for security:

1. Admin calls `syncEmployeeAccount` Cloud Function
2. Function verifies admin is authenticated and authorized
3. Function creates Firebase Auth user with temporary password
4. Function creates user document in `users` collection
5. Function updates employee document with `hasAccount: true`
6. Admin stays logged in throughout (no sign-out)

### Account Deletion
Deleting an employee automatically removes their login via `deleteEmployeeAccount` Cloud Function:

1. Admin deletes employee from UI
2. Function deletes Firebase Auth user
3. Function deletes user document from Firestore
4. Logs deletion to auditLog

### Account Deactivation
Admin can deactivate (not delete) an employee account:

1. Edit employee and uncheck "Active" toggle
2. System syncs isActive status to users collection
3. Firestore security rules prevent inactive employees from accessing data
4. Auth account remains but employee can't access the app

**Key fields in `users` collection:**
- `email` - Employee's email address
- `role` - Always 'employee' for non-admin accounts
- `employeeId` - Reference to employee document
- `teamId` - Optional team assignment
- `firstName`, `lastName` - Employee name
- `isActive` - Account status (controls app access via security rules)
- `createdAt` - Account creation timestamp
- `createdBy` - Admin UID who created the account
- `lastLogin` - Last login timestamp (null initially)
- `updatedAt` - Last update timestamp
