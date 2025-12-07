// ============================================
// UTILITY FUNCTIONS
// ============================================

import { i18n } from './i18n.js';

// ============================================
// DATE UTILITIES
// ============================================
export function formatDate(date, options = {}) {
  return i18n.formatDate(date, options);
}

export function formatDateTime(date) {
  return i18n.formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatTime(date) {
  return i18n.formatDate(date, {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getToday() {
  return new Date().toISOString().split('T')[0];
}

export function getStartOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

export function getEndOfWeek(date = new Date()) {
  const start = getStartOfWeek(date);
  return new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
}

export function getStartOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getEndOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date2 - date1) / oneDay));
}

// ============================================
// CURRENCY UTILITIES
// ============================================
export function formatCurrency(amount) {
  return i18n.formatCurrency(amount);
}

export function parseCurrency(value) {
  if (typeof value === 'number') return value;
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
}

// ============================================
// STRING UTILITIES
// ============================================
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function titleCase(str) {
  if (!str) return '';
  return str.split(' ').map(word => capitalize(word)).join(' ');
}

export function truncate(str, length = 50) {
  if (!str || str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function getInitials(firstName, lastName) {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
}

// ============================================
// PHONE UTILITIES
// ============================================
export function formatPhone(phone) {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export function cleanPhone(phone) {
  return phone ? phone.replace(/\D/g, '') : '';
}

// ============================================
// VALIDATION UTILITIES
// ============================================
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isValidPhone(phone) {
  const cleaned = cleanPhone(phone);
  return cleaned.length >= 10;
}

export function isRequired(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return !isNaN(value);
  return value != null;
}

// ============================================
// DOM UTILITIES
// ============================================
export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function createElement(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

export function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
export function showToast(type, title, message, duration = 4000) {
  const container = document.getElementById('toastContainer') || createToastContainer();
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  const toast = createElement('div', `toast ${type}`, `
    <div class="toast-icon">${icons[type] || 'ℹ'}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `);
  
  container.appendChild(toast);
  
  if (duration > 0) {
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, duration);
  }
  
  return toast;
}

function createToastContainer() {
  const container = createElement('div', 'toast-container');
  container.id = 'toastContainer';
  document.body.appendChild(container);
  return container;
}

// ============================================
// MODAL UTILITIES
// ============================================
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const backdrop = document.getElementById('modalBackdrop') || createModalBackdrop();
  
  if (modal) {
    backdrop.classList.add('active');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  const backdrop = document.getElementById('modalBackdrop');
  
  if (modal) {
    modal.classList.remove('active');
  }
  
  if (backdrop) {
    backdrop.classList.remove('active');
  }
  
  document.body.style.overflow = '';
}

export function closeAllModals() {
  document.querySelectorAll('.modal.active').forEach(modal => {
    modal.classList.remove('active');
  });
  
  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
  }
  
  document.body.style.overflow = '';
}

function createModalBackdrop() {
  const backdrop = createElement('div', 'modal-backdrop');
  backdrop.id = 'modalBackdrop';
  backdrop.addEventListener('click', closeAllModals);
  document.body.appendChild(backdrop);
  return backdrop;
}

// ============================================
// LOADING STATES
// ============================================
export function showLoading(element, text = '') {
  if (!element) return;
  
  element.dataset.originalContent = element.innerHTML;
  element.disabled = true;
  element.innerHTML = `
    <span class="loading-spinner" style="width: 18px; height: 18px; border-width: 2px;"></span>
    ${text ? `<span style="margin-left: 8px;">${text}</span>` : ''}
  `;
}

export function hideLoading(element) {
  if (!element) return;
  
  element.disabled = false;
  if (element.dataset.originalContent) {
    element.innerHTML = element.dataset.originalContent;
    delete element.dataset.originalContent;
  }
}

export function showPageLoading() {
  let overlay = document.getElementById('pageLoadingOverlay');
  if (!overlay) {
    overlay = createElement('div', 'loading-overlay', `
      <div class="loading-spinner"></div>
    `);
    overlay.id = 'pageLoadingOverlay';
    overlay.style.position = 'fixed';
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
}

export function hidePageLoading() {
  const overlay = document.getElementById('pageLoadingOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

// ============================================
// CONFIRMATION DIALOG
// ============================================
export function confirmDialog(title, message, confirmText = 'Confirm', cancelText = 'Cancel') {
  return new Promise((resolve) => {
    const backdrop = createElement('div', 'modal-backdrop active');
    backdrop.style.zIndex = '9998';
    
    const modal = createElement('div', 'modal active', `
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
      </div>
      <div class="modal-body">
        <p>${message}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="confirmCancel">${cancelText}</button>
        <button class="btn btn-danger" id="confirmOk">${confirmText}</button>
      </div>
    `);
    modal.style.zIndex = '9999';
    
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
    
    const cleanup = () => {
      backdrop.remove();
      modal.remove();
    };
    
    modal.querySelector('#confirmCancel').addEventListener('click', () => {
      cleanup();
      resolve(false);
    });
    
    modal.querySelector('#confirmOk').addEventListener('click', () => {
      cleanup();
      resolve(true);
    });
    
    backdrop.addEventListener('click', () => {
      cleanup();
      resolve(false);
    });
  });
}

// ============================================
// LOCAL STORAGE UTILITIES
// ============================================
export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    return false;
  }
}

export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading from localStorage:', e);
    return defaultValue;
  }
}

// ============================================
// DEBOUNCE & THROTTLE
// ============================================
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// DATA EXPORT UTILITIES
// ============================================
export function exportToCSV(data, filename) {
  if (!data || !data.length) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        let cell = row[header];
        if (cell === null || cell === undefined) cell = '';
        if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
          cell = `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============================================
// SCHEDULE UTILITIES
// ============================================
export function getNextScheduleDate(lastDate, scheduleType, customDays = 0) {
  const last = new Date(lastDate);
  
  switch (scheduleType) {
    case 'weekly':
      return addDays(last, 7);
    case 'biweekly':
      return addDays(last, 14);
    case 'every3weeks':
      return addDays(last, 21);
    case 'monthly':
      const nextMonth = new Date(last);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    case 'custom':
      return addDays(last, customDays || 30);
    case 'oneTime':
    default:
      return null;
  }
}

export function getScheduleTypeLabel(type) {
  const labels = {
    oneTime: i18n.t('scheduleTypes.oneTime'),
    weekly: i18n.t('scheduleTypes.weekly'),
    biweekly: i18n.t('scheduleTypes.biweekly'),
    every3weeks: i18n.t('scheduleTypes.every3weeks'),
    monthly: i18n.t('scheduleTypes.monthly'),
    custom: i18n.t('scheduleTypes.custom')
  };
  return labels[type] || type;
}

export function getServiceTypeLabel(type) {
  const labels = {
    full: i18n.t('serviceTypes.full'),
    half: i18n.t('serviceTypes.half'),
    alternating: i18n.t('serviceTypes.alternating'),
    custom: i18n.t('serviceTypes.custom')
  };
  return labels[type] || type;
}

// ============================================
// COLOR UTILITIES
// ============================================
export function getStatusColor(status) {
  const colors = {
    active: 'success',
    inactive: 'secondary',
    pending: 'warning',
    completed: 'success',
    cancelled: 'danger',
    scheduled: 'primary',
    inProgress: 'info',
    paid: 'success',
    overdue: 'danger'
  };
  return colors[status] || 'secondary';
}

export function generateAvatarColor(name) {
  const colors = [
    '#0d9488', '#f97316', '#8b5cf6', '#ec4899', 
    '#10b981', '#3b82f6', '#f59e0b', '#ef4444'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

// ============================================
// SORTING & FILTERING
// ============================================
export function sortByField(array, field, direction = 'asc') {
  return [...array].sort((a, b) => {
    let aVal = a[field];
    let bVal = b[field];
    
    if (aVal == null) return direction === 'asc' ? 1 : -1;
    if (bVal == null) return direction === 'asc' ? -1 : 1;
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

export function filterBySearch(array, searchTerm, fields) {
  if (!searchTerm) return array;
  
  const term = searchTerm.toLowerCase();
  return array.filter(item => {
    return fields.some(field => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(term);
    });
  });
}

// ============================================
// ID GENERATION
// ============================================
export function generateId(prefix = '') {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`;
}