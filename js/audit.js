// ============================================
// AUDIT LOGGING MODULE
// ============================================

import { db, auth, collection, addDoc, Timestamp } from './firebase-config.js';

// ============================================
// LOG AUDIT ACTION
// ============================================
export async function logAudit(action, module, targetId, targetName, changes = null) {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('No authenticated user for audit log');
      return null;
    }

    // Get admin name from localStorage or use email
    const adminName = localStorage.getItem('adminName') || user.email;

    const logEntry = {
      timestamp: Timestamp.now(),
      adminId: user.uid,
      adminName: adminName,
      action: action,
      module: module,
      targetId: targetId || null,
      targetType: module,
      targetName: targetName || null,
      changes: changes,
      userAgent: navigator.userAgent,
      // Note: IP address would need to be captured server-side
    };

    const docRef = await addDoc(collection(db, 'auditLog'), logEntry);
    return docRef.id;
  } catch (error) {
    console.error('Error creating audit log:', error);
    return null;
  }
}

// ============================================
// AUDIT ACTION TYPES
// ============================================
export const AuditActions = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LOGIN: 'login',
  LOGOUT: 'logout',
  STATUS_CHANGE: 'status_change',
  IMPORT: 'import',
  EXPORT: 'export'
};

// ============================================
// AUDIT MODULES
// ============================================
export const AuditModules = {
  AUTH: 'auth',
  EMPLOYEES: 'employees',
  TEAMS: 'teams',
  CLIENTS: 'clients',
  SCHEDULES: 'schedules',
  TIME_ENTRIES: 'timeEntries',
  EXPENSES: 'expenses',
  PAYMENTS: 'payments',
  INVOICES: 'invoices',
  SETTINGS: 'settings'
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Log employee actions
export async function logEmployeeAction(action, employeeId, employeeName, changes = null) {
  return logAudit(action, AuditModules.EMPLOYEES, employeeId, employeeName, changes);
}

// Log team actions
export async function logTeamAction(action, teamId, teamName, changes = null) {
  return logAudit(action, AuditModules.TEAMS, teamId, teamName, changes);
}

// Log client actions
export async function logClientAction(action, clientId, clientName, changes = null) {
  return logAudit(action, AuditModules.CLIENTS, clientId, clientName, changes);
}

// Log schedule actions
export async function logScheduleAction(action, scheduleId, description, changes = null) {
  return logAudit(action, AuditModules.SCHEDULES, scheduleId, description, changes);
}

// Log expense actions
export async function logExpenseAction(action, expenseId, description, changes = null) {
  return logAudit(action, AuditModules.EXPENSES, expenseId, description, changes);
}

// Log payment actions
export async function logPaymentAction(action, paymentId, description, changes = null) {
  return logAudit(action, AuditModules.PAYMENTS, paymentId, description, changes);
}

// Log authentication actions
export async function logAuthAction(action, userId, userName) {
  return logAudit(action, AuditModules.AUTH, userId, userName);
}

// ============================================
// CHANGE TRACKING HELPER
// ============================================
export function trackChanges(oldData, newData, fieldsToTrack = null) {
  const changes = [];
  const fields = fieldsToTrack || Object.keys(newData);

  for (const field of fields) {
    const oldValue = oldData[field];
    const newValue = newData[field];

    // Skip if values are the same
    if (JSON.stringify(oldValue) === JSON.stringify(newValue)) continue;

    changes.push({
      field: field,
      oldValue: oldValue,
      newValue: newValue
    });
  }

  return changes.length > 0 ? changes : null;
}

// ============================================
// FORMAT AUDIT LOG FOR DISPLAY
// ============================================
export function formatAuditEntry(entry, i18n) {
  const actionLabels = {
    create: i18n.t('auditActions.create'),
    update: i18n.t('auditActions.update'),
    delete: i18n.t('auditActions.delete'),
    login: i18n.t('auditActions.login'),
    logout: i18n.t('auditActions.logout'),
    status_change: i18n.t('auditActions.statusChange'),
    import: 'Imported',
    export: 'Exported'
  };

  const moduleLabels = {
    auth: 'Authentication',
    employees: i18n.t('employees'),
    teams: i18n.t('teams'),
    clients: i18n.t('clients'),
    schedules: i18n.t('scheduling'),
    timeEntries: i18n.t('timeClock'),
    expenses: i18n.t('expenses'),
    payments: i18n.t('payments'),
    invoices: i18n.t('invoices'),
    settings: i18n.t('settings')
  };

  return {
    ...entry,
    actionLabel: actionLabels[entry.action] || entry.action,
    moduleLabel: moduleLabels[entry.module] || entry.module,
    formattedTimestamp: entry.timestamp?.toDate ? 
      i18n.formatDate(entry.timestamp.toDate(), {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : ''
  };
}