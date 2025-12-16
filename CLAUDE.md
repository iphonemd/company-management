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

**Firebase deployment:**
```bash
firebase deploy --only hosting
```

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
- `user-management.js` - Employee account creation with admin re-authentication flow

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
