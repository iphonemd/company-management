// ============================================
// INTERNATIONALIZATION (i18n)
// English and Spanish Support
// ============================================

const translations = {
  en: {
    // General
    appName: "CleanPro",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    search: "Search",
    filter: "Filter",
    export: "Export",
    import: "Import",
    back: "Back",
    next: "Next",
    previous: "Previous",
    confirm: "Confirm",
    close: "Close",
    yes: "Yes",
    no: "No",
    active: "Active",
    inactive: "Inactive",
    all: "All",
    none: "None",
    actions: "Actions",
    status: "Status",
    date: "Date",
    time: "Time",
    notes: "Notes",
    details: "Details",
    total: "Total",
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Info",

    // Login
    login: "Login",
    logout: "Logout",
    email: "Email",
    password: "Password",
    loginTitle: "Sign In to CleanPro",
    loginSubtitle: "Manage your cleaning business",
    loginButton: "Sign In",
    loginError: "Invalid email or password",
    loggingIn: "Signing in...",
    forgotPassword: "Forgot password?",

    // Navigation
    dashboard: "Dashboard",
    employees: "Employees",
    clients: "Clients",
    scheduling: "Scheduling",
    timeClock: "Time Clock",
    finances: "Finances",
    reports: "Reports",
    auditLog: "Audit Log",
    settings: "Settings",

    // Dashboard
    welcomeBack: "Welcome back",
    todaySchedule: "Today's Schedule",
    jobsToday: "Jobs Today",
    revenueThisWeek: "Revenue This Week",
    revenueThisMonth: "Revenue This Month",
    pendingPayments: "Pending Payments",
    activeEmployees: "Active Employees",
    activeClients: "Active Clients",
    upcomingJobs: "Upcoming Jobs",
    recentActivity: "Recent Activity",
    quickActions: "Quick Actions",
    noJobsToday: "No jobs scheduled for today",
    viewFullSchedule: "View Full Schedule",

    // Employees
    employeeList: "Employee List",
    addEmployee: "Add Employee",
    editEmployee: "Edit Employee",
    employeeDetails: "Employee Details",
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone",
    hourlyRate: "Hourly Rate",
    hireDate: "Hire Date",
    team: "Team",
    noTeam: "No Team",
    teamLeader: "Team Leader",
    totalEmployees: "Total Employees",
    employeeAdded: "Employee added successfully",
    employeeUpdated: "Employee updated successfully",
    employeeDeleted: "Employee deleted successfully",
    confirmDeleteEmployee: "Are you sure you want to delete this employee?",
    hoursThisWeek: "Hours This Week",
    hoursThisMonth: "Hours This Month",

    // Teams
    teams: "Teams",
    teamList: "Team List",
    addTeam: "Add Team",
    editTeam: "Edit Team",
    teamName: "Team Name",
    teamMembers: "Team Members",
    selectMembers: "Select Members",
    teamCreated: "Team created successfully",
    teamUpdated: "Team updated successfully",
    teamDeleted: "Team deleted successfully",
    confirmDeleteTeam: "Are you sure you want to delete this team?",

    // Clients
    clientList: "Client List",
    addClient: "Add Client",
    editClient: "Edit Client",
    clientDetails: "Client Details",
    importClients: "Import Clients",
    address: "Address",
    street: "Street",
    city: "City",
    state: "State",
    zipCode: "ZIP Code",
    totalClients: "Total Clients",
    clientAdded: "Client added successfully",
    clientUpdated: "Client updated successfully",
    clientDeleted: "Client deleted successfully",
    confirmDeleteClient: "Are you sure you want to delete this client?",
    serviceHistory: "Service History",
    paymentHistory: "Payment History",
    
    // Service Configuration
    serviceConfig: "Service Configuration",
    scheduleType: "Schedule Type",
    scheduleTypes: {
      oneTime: "One Time",
      weekly: "Weekly",
      biweekly: "Every 2 Weeks",
      every3weeks: "Every 3 Weeks",
      monthly: "Monthly",
      custom: "Custom"
    },
    customDays: "Custom Interval (days)",
    preferredDay: "Preferred Day",
    preferredTime: "Preferred Time",
    morning: "Morning",
    afternoon: "Afternoon",
    
    // Service Types
    serviceType: "Service Type",
    serviceTypes: {
      full: "Full House",
      half: "Half House",
      alternating: "Alternating (Full/Half)",
      custom: "Custom"
    },
    basePrice: "Base Price (Full)",
    halfPrice: "Half House Price",
    
    // Areas
    areas: "Areas",
    standardAreas: "Standard Areas",
    additionalAreas: "Additional Areas",
    kitchen: "Kitchen",
    bathrooms: "Bathrooms",
    bedrooms: "Bedrooms",
    livingRoom: "Living Room",
    diningRoom: "Dining Room",
    basement: "Basement",
    garage: "Garage",
    attic: "Attic",
    office: "Office",
    laundry: "Laundry Room",
    extraCharge: "Extra Charge",
    frequency: "Frequency",
    always: "Always",
    sometimes: "Sometimes",
    never: "Never",
    
    // Invoicing
    invoicing: "Invoicing",
    generateInvoice: "Generate Invoice",
    requiresInvoice: "Requires Invoice",
    invoiceGenerated: "Invoice Generated",

    // Scheduling
    calendar: "Calendar",
    scheduleJob: "Schedule Job",
    editSchedule: "Edit Schedule",
    assignTeam: "Assign Team",
    selectClient: "Select Client",
    selectTeam: "Select Team",
    selectDate: "Select Date",
    timeSlot: "Time Slot",
    estimatedDuration: "Estimated Duration",
    hours: "hours",
    scheduleCreated: "Schedule created successfully",
    scheduleUpdated: "Schedule updated successfully",
    scheduleDeleted: "Schedule deleted successfully",
    confirmDeleteSchedule: "Are you sure you want to delete this schedule?",
    generateSchedules: "Generate Schedules",
    autoSchedule: "Auto Schedule",
    scheduleConflict: "Schedule Conflict",
    jobStatus: {
      scheduled: "Scheduled",
      inProgress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
      rescheduled: "Rescheduled"
    },
    viewDay: "Day",
    viewWeek: "Week",
    viewMonth: "Month",
    today: "Today",
    noSchedules: "No schedules for this period",
    addOns: "Add-ons",

    // Time Clock
    clockIn: "Clock In",
    clockOut: "Clock Out",
    clockedIn: "Clocked In",
    clockedOut: "Clocked Out",
    currentlyWorking: "Currently Working",
    notClockedIn: "Not Clocked In",
    selectJob: "Select Job",
    startTime: "Start Time",
    endTime: "End Time",
    hoursWorked: "Hours Worked",
    todayHours: "Today's Hours",
    weeklyHours: "Weekly Hours",
    timeEntryAdded: "Time entry added",
    timeEntryUpdated: "Time entry updated",
    breakTime: "Break",
    overtime: "Overtime",

    // Finances
    revenue: "Revenue",
    expenses: "Expenses",
    profit: "Profit",
    profitMargin: "Profit Margin",
    addExpense: "Add Expense",
    editExpense: "Edit Expense",
    expenseCategories: {
      supplies: "Supplies",
      equipment: "Equipment",
      vehicle: "Vehicle",
      insurance: "Insurance",
      payroll: "Payroll",
      marketing: "Marketing",
      office: "Office",
      other: "Other"
    },
    amount: "Amount",
    vendor: "Vendor",
    description: "Description",
    category: "Category",
    receipt: "Receipt",
    uploadReceipt: "Upload Receipt",
    expenseAdded: "Expense added successfully",
    expenseUpdated: "Expense updated successfully",
    expenseDeleted: "Expense deleted successfully",
    confirmDeleteExpense: "Are you sure you want to delete this expense?",
    
    // Payments
    payments: "Payments",
    addPayment: "Add Payment",
    recordPayment: "Record Payment",
    paymentMethod: "Payment Method",
    paymentMethods: {
      cash: "Cash",
      check: "Check",
      card: "Card",
      venmo: "Venmo",
      zelle: "Zelle",
      other: "Other"
    },
    paymentStatus: {
      pending: "Pending",
      paid: "Paid",
      overdue: "Overdue"
    },
    paymentRecorded: "Payment recorded successfully",
    markAsPaid: "Mark as Paid",
    
    // Invoices
    invoices: "Invoices",
    createInvoice: "Create Invoice",
    invoiceNumber: "Invoice #",
    invoiceDate: "Invoice Date",
    dueDate: "Due Date",
    invoiceItems: "Items",
    subtotal: "Subtotal",
    tax: "Tax",
    invoiceTotal: "Total",
    downloadPDF: "Download PDF",
    sendInvoice: "Send Invoice",
    invoiceCreated: "Invoice created successfully",

    // Reports
    generateReport: "Generate Report",
    reportType: "Report Type",
    dateRange: "Date Range",
    startDate: "Start Date",
    endDate: "End Date",
    thisWeek: "This Week",
    thisMonth: "This Month",
    thisYear: "This Year",
    customRange: "Custom Range",
    financialReport: "Financial Report",
    employeeReport: "Employee Report",
    clientReport: "Client Report",
    downloadCSV: "Download CSV",
    downloadPDF: "Download PDF",
    noDataForPeriod: "No data for selected period",

    // Audit Log
    auditLogTitle: "Activity Log",
    action: "Action",
    performedBy: "Performed By",
    target: "Target",
    changes: "Changes",
    timestamp: "Timestamp",
    auditActions: {
      create: "Created",
      update: "Updated",
      delete: "Deleted",
      login: "Logged In",
      logout: "Logged Out",
      statusChange: "Status Changed"
    },
    filterByAction: "Filter by Action",
    filterByAdmin: "Filter by Admin",
    filterByModule: "Filter by Module",
    noAuditLogs: "No activity logs found",

    // Days of week
    days: {
      sunday: "Sunday",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday"
    },
    daysShort: {
      sun: "Sun",
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat"
    },

    // Months
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December"
    },

    // Validation messages
    required: "This field is required",
    invalidEmail: "Please enter a valid email",
    invalidPhone: "Please enter a valid phone number",
    invalidPrice: "Please enter a valid price",
    minLength: "Minimum {0} characters required",
    maxLength: "Maximum {0} characters allowed",

    // Confirmation dialogs
    unsavedChanges: "You have unsaved changes. Are you sure you want to leave?",
    confirmAction: "Are you sure you want to proceed?",

    // Empty states
    noEmployees: "No employees found",
    noClients: "No clients found",
    noTeams: "No teams found",
    noExpenses: "No expenses found",
    noPayments: "No payments found",

    // Import
    importTitle: "Import Data",
    selectFile: "Select File",
    mapColumns: "Map Columns",
    previewData: "Preview Data",
    importData: "Import Data",
    importSuccess: "Data imported successfully",
    importError: "Error importing data",
    skipRow: "Skip this row",
    rowsToImport: "Rows to import",
    duplicateFound: "Duplicate found"
  },

  es: {
    // General
    appName: "CleanPro",
    loading: "Cargando...",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    add: "Agregar",
    search: "Buscar",
    filter: "Filtrar",
    export: "Exportar",
    import: "Importar",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    confirm: "Confirmar",
    close: "Cerrar",
    yes: "Sí",
    no: "No",
    active: "Activo",
    inactive: "Inactivo",
    all: "Todos",
    none: "Ninguno",
    actions: "Acciones",
    status: "Estado",
    date: "Fecha",
    time: "Hora",
    notes: "Notas",
    details: "Detalles",
    total: "Total",
    success: "Éxito",
    error: "Error",
    warning: "Advertencia",
    info: "Información",

    // Login
    login: "Iniciar Sesión",
    logout: "Cerrar Sesión",
    email: "Correo Electrónico",
    password: "Contraseña",
    loginTitle: "Iniciar Sesión en CleanPro",
    loginSubtitle: "Administra tu negocio de limpieza",
    loginButton: "Iniciar Sesión",
    loginError: "Correo o contraseña incorrectos",
    loggingIn: "Iniciando sesión...",
    forgotPassword: "¿Olvidaste tu contraseña?",

    // Navigation
    dashboard: "Panel Principal",
    employees: "Empleados",
    clients: "Clientes",
    scheduling: "Programación",
    timeClock: "Reloj de Tiempo",
    finances: "Finanzas",
    reports: "Reportes",
    auditLog: "Registro de Actividad",
    settings: "Configuración",

    // Dashboard
    welcomeBack: "Bienvenido de nuevo",
    todaySchedule: "Agenda de Hoy",
    jobsToday: "Trabajos Hoy",
    revenueThisWeek: "Ingresos Esta Semana",
    revenueThisMonth: "Ingresos Este Mes",
    pendingPayments: "Pagos Pendientes",
    activeEmployees: "Empleados Activos",
    activeClients: "Clientes Activos",
    upcomingJobs: "Próximos Trabajos",
    recentActivity: "Actividad Reciente",
    quickActions: "Acciones Rápidas",
    noJobsToday: "No hay trabajos programados para hoy",
    viewFullSchedule: "Ver Agenda Completa",

    // Employees
    employeeList: "Lista de Empleados",
    addEmployee: "Agregar Empleado",
    editEmployee: "Editar Empleado",
    employeeDetails: "Detalles del Empleado",
    firstName: "Nombre",
    lastName: "Apellido",
    phone: "Teléfono",
    hourlyRate: "Tarifa por Hora",
    hireDate: "Fecha de Contratación",
    team: "Equipo",
    noTeam: "Sin Equipo",
    teamLeader: "Líder de Equipo",
    totalEmployees: "Total de Empleados",
    employeeAdded: "Empleado agregado exitosamente",
    employeeUpdated: "Empleado actualizado exitosamente",
    employeeDeleted: "Empleado eliminado exitosamente",
    confirmDeleteEmployee: "¿Estás seguro de que deseas eliminar este empleado?",
    hoursThisWeek: "Horas Esta Semana",
    hoursThisMonth: "Horas Este Mes",

    // Teams
    teams: "Equipos",
    teamList: "Lista de Equipos",
    addTeam: "Agregar Equipo",
    editTeam: "Editar Equipo",
    teamName: "Nombre del Equipo",
    teamMembers: "Miembros del Equipo",
    selectMembers: "Seleccionar Miembros",
    teamCreated: "Equipo creado exitosamente",
    teamUpdated: "Equipo actualizado exitosamente",
    teamDeleted: "Equipo eliminado exitosamente",
    confirmDeleteTeam: "¿Estás seguro de que deseas eliminar este equipo?",

    // Clients
    clientList: "Lista de Clientes",
    addClient: "Agregar Cliente",
    editClient: "Editar Cliente",
    clientDetails: "Detalles del Cliente",
    importClients: "Importar Clientes",
    address: "Dirección",
    street: "Calle",
    city: "Ciudad",
    state: "Estado",
    zipCode: "Código Postal",
    totalClients: "Total de Clientes",
    clientAdded: "Cliente agregado exitosamente",
    clientUpdated: "Cliente actualizado exitosamente",
    clientDeleted: "Cliente eliminado exitosamente",
    confirmDeleteClient: "¿Estás seguro de que deseas eliminar este cliente?",
    serviceHistory: "Historial de Servicios",
    paymentHistory: "Historial de Pagos",
    
    // Service Configuration
    serviceConfig: "Configuración de Servicio",
    scheduleType: "Tipo de Programación",
    scheduleTypes: {
      oneTime: "Una Vez",
      weekly: "Semanal",
      biweekly: "Cada 2 Semanas",
      every3weeks: "Cada 3 Semanas",
      monthly: "Mensual",
      custom: "Personalizado"
    },
    customDays: "Intervalo Personalizado (días)",
    preferredDay: "Día Preferido",
    preferredTime: "Hora Preferida",
    morning: "Mañana",
    afternoon: "Tarde",
    
    // Service Types
    serviceType: "Tipo de Servicio",
    serviceTypes: {
      full: "Casa Completa",
      half: "Media Casa",
      alternating: "Alternado (Completa/Media)",
      custom: "Personalizado"
    },
    basePrice: "Precio Base (Completa)",
    halfPrice: "Precio Media Casa",
    
    // Areas
    areas: "Áreas",
    standardAreas: "Áreas Estándar",
    additionalAreas: "Áreas Adicionales",
    kitchen: "Cocina",
    bathrooms: "Baños",
    bedrooms: "Recámaras",
    livingRoom: "Sala",
    diningRoom: "Comedor",
    basement: "Sótano",
    garage: "Garaje",
    attic: "Ático",
    office: "Oficina",
    laundry: "Cuarto de Lavado",
    extraCharge: "Cargo Extra",
    frequency: "Frecuencia",
    always: "Siempre",
    sometimes: "A veces",
    never: "Nunca",
    
    // Invoicing
    invoicing: "Facturación",
    generateInvoice: "Generar Factura",
    requiresInvoice: "Requiere Factura",
    invoiceGenerated: "Factura Generada",

    // Scheduling
    calendar: "Calendario",
    scheduleJob: "Programar Trabajo",
    editSchedule: "Editar Programación",
    assignTeam: "Asignar Equipo",
    selectClient: "Seleccionar Cliente",
    selectTeam: "Seleccionar Equipo",
    selectDate: "Seleccionar Fecha",
    timeSlot: "Horario",
    estimatedDuration: "Duración Estimada",
    hours: "horas",
    scheduleCreated: "Programación creada exitosamente",
    scheduleUpdated: "Programación actualizada exitosamente",
    scheduleDeleted: "Programación eliminada exitosamente",
    confirmDeleteSchedule: "¿Estás seguro de que deseas eliminar esta programación?",
    generateSchedules: "Generar Programaciones",
    autoSchedule: "Programación Automática",
    scheduleConflict: "Conflicto de Programación",
    jobStatus: {
      scheduled: "Programado",
      inProgress: "En Progreso",
      completed: "Completado",
      cancelled: "Cancelado",
      rescheduled: "Reprogramado"
    },
    viewDay: "Día",
    viewWeek: "Semana",
    viewMonth: "Mes",
    today: "Hoy",
    noSchedules: "No hay programaciones para este período",
    addOns: "Adicionales",

    // Time Clock
    clockIn: "Entrada",
    clockOut: "Salida",
    clockedIn: "Registró Entrada",
    clockedOut: "Registró Salida",
    currentlyWorking: "Trabajando Actualmente",
    notClockedIn: "Sin Registrar Entrada",
    selectJob: "Seleccionar Trabajo",
    startTime: "Hora de Inicio",
    endTime: "Hora de Fin",
    hoursWorked: "Horas Trabajadas",
    todayHours: "Horas de Hoy",
    weeklyHours: "Horas Semanales",
    timeEntryAdded: "Entrada de tiempo agregada",
    timeEntryUpdated: "Entrada de tiempo actualizada",
    breakTime: "Descanso",
    overtime: "Tiempo Extra",

    // Finances
    revenue: "Ingresos",
    expenses: "Gastos",
    profit: "Ganancia",
    profitMargin: "Margen de Ganancia",
    addExpense: "Agregar Gasto",
    editExpense: "Editar Gasto",
    expenseCategories: {
      supplies: "Suministros",
      equipment: "Equipo",
      vehicle: "Vehículo",
      insurance: "Seguro",
      payroll: "Nómina",
      marketing: "Marketing",
      office: "Oficina",
      other: "Otro"
    },
    amount: "Cantidad",
    vendor: "Proveedor",
    description: "Descripción",
    category: "Categoría",
    receipt: "Recibo",
    uploadReceipt: "Subir Recibo",
    expenseAdded: "Gasto agregado exitosamente",
    expenseUpdated: "Gasto actualizado exitosamente",
    expenseDeleted: "Gasto eliminado exitosamente",
    confirmDeleteExpense: "¿Estás seguro de que deseas eliminar este gasto?",
    
    // Payments
    payments: "Pagos",
    addPayment: "Agregar Pago",
    recordPayment: "Registrar Pago",
    paymentMethod: "Método de Pago",
    paymentMethods: {
      cash: "Efectivo",
      check: "Cheque",
      card: "Tarjeta",
      venmo: "Venmo",
      zelle: "Zelle",
      other: "Otro"
    },
    paymentStatus: {
      pending: "Pendiente",
      paid: "Pagado",
      overdue: "Vencido"
    },
    paymentRecorded: "Pago registrado exitosamente",
    markAsPaid: "Marcar como Pagado",
    
    // Invoices
    invoices: "Facturas",
    createInvoice: "Crear Factura",
    invoiceNumber: "Factura #",
    invoiceDate: "Fecha de Factura",
    dueDate: "Fecha de Vencimiento",
    invoiceItems: "Artículos",
    subtotal: "Subtotal",
    tax: "Impuesto",
    invoiceTotal: "Total",
    downloadPDF: "Descargar PDF",
    sendInvoice: "Enviar Factura",
    invoiceCreated: "Factura creada exitosamente",

    // Reports
    generateReport: "Generar Reporte",
    reportType: "Tipo de Reporte",
    dateRange: "Rango de Fechas",
    startDate: "Fecha de Inicio",
    endDate: "Fecha de Fin",
    thisWeek: "Esta Semana",
    thisMonth: "Este Mes",
    thisYear: "Este Año",
    customRange: "Rango Personalizado",
    financialReport: "Reporte Financiero",
    employeeReport: "Reporte de Empleados",
    clientReport: "Reporte de Clientes",
    downloadCSV: "Descargar CSV",
    downloadPDF: "Descargar PDF",
    noDataForPeriod: "No hay datos para el período seleccionado",

    // Audit Log
    auditLogTitle: "Registro de Actividad",
    action: "Acción",
    performedBy: "Realizado Por",
    target: "Objetivo",
    changes: "Cambios",
    timestamp: "Fecha y Hora",
    auditActions: {
      create: "Creó",
      update: "Actualizó",
      delete: "Eliminó",
      login: "Inició Sesión",
      logout: "Cerró Sesión",
      statusChange: "Cambió Estado"
    },
    filterByAction: "Filtrar por Acción",
    filterByAdmin: "Filtrar por Administrador",
    filterByModule: "Filtrar por Módulo",
    noAuditLogs: "No se encontraron registros de actividad",

    // Days of week
    days: {
      sunday: "Domingo",
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado"
    },
    daysShort: {
      sun: "Dom",
      mon: "Lun",
      tue: "Mar",
      wed: "Mié",
      thu: "Jue",
      fri: "Vie",
      sat: "Sáb"
    },

    // Months
    months: {
      january: "Enero",
      february: "Febrero",
      march: "Marzo",
      april: "Abril",
      may: "Mayo",
      june: "Junio",
      july: "Julio",
      august: "Agosto",
      september: "Septiembre",
      october: "Octubre",
      november: "Noviembre",
      december: "Diciembre"
    },

    // Validation messages
    required: "Este campo es requerido",
    invalidEmail: "Por favor ingresa un correo válido",
    invalidPhone: "Por favor ingresa un teléfono válido",
    invalidPrice: "Por favor ingresa un precio válido",
    minLength: "Mínimo {0} caracteres requeridos",
    maxLength: "Máximo {0} caracteres permitidos",

    // Confirmation dialogs
    unsavedChanges: "Tienes cambios sin guardar. ¿Estás seguro de que deseas salir?",
    confirmAction: "¿Estás seguro de que deseas continuar?",

    // Empty states
    noEmployees: "No se encontraron empleados",
    noClients: "No se encontraron clientes",
    noTeams: "No se encontraron equipos",
    noExpenses: "No se encontraron gastos",
    noPayments: "No se encontraron pagos",

    // Import
    importTitle: "Importar Datos",
    selectFile: "Seleccionar Archivo",
    mapColumns: "Mapear Columnas",
    previewData: "Vista Previa",
    importData: "Importar Datos",
    importSuccess: "Datos importados exitosamente",
    importError: "Error al importar datos",
    skipRow: "Saltar esta fila",
    rowsToImport: "Filas a importar",
    duplicateFound: "Duplicado encontrado"
  }
};

// ============================================
// i18n CLASS
// ============================================
class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || 'en';
    this.translations = translations;
  }

  // Get translation by key (supports nested keys like "scheduleTypes.weekly")
  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English
        value = this.translations['en'];
        for (const k2 of keys) {
          if (value && value[k2] !== undefined) {
            value = value[k2];
          } else {
            return key; // Return key if not found
          }
        }
        break;
      }
    }

    // Replace parameters
    if (typeof value === 'string') {
      Object.keys(params).forEach((param, index) => {
        value = value.replace(`{${index}}`, params[param]);
      });
    }

    return value;
  }

  // Set language
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      this.updatePageTranslations();
      return true;
    }
    return false;
  }

  // Get current language
  getLanguage() {
    return this.currentLanguage;
  }

  // Toggle between EN and ES
  toggleLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'es' : 'en';
    this.setLanguage(newLang);
    return newLang;
  }

  // Update all elements with data-i18n attribute
  updatePageTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (element.tagName === 'INPUT' && element.type === 'placeholder') {
        element.placeholder = translation;
      } else if (element.hasAttribute('data-i18n-placeholder')) {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });

    // Update titles
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      element.title = this.t(key);
    });

    // Dispatch event for custom handlers
    document.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: this.currentLanguage } 
    }));
  }

  // Format date according to locale
  formatDate(date, options = {}) {
    const locale = this.currentLanguage === 'es' ? 'es-MX' : 'en-US';
    return new Date(date).toLocaleDateString(locale, options);
  }

  // Format currency
  formatCurrency(amount) {
    const locale = this.currentLanguage === 'es' ? 'es-MX' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  // Format number
  formatNumber(number) {
    const locale = this.currentLanguage === 'es' ? 'es-MX' : 'en-US';
    return new Intl.NumberFormat(locale).format(number);
  }

  // Get day name
  getDayName(dayIndex, short = false) {
    const days = short ? 
      ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] :
      ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const key = short ? `daysShort.${days[dayIndex]}` : `days.${days[dayIndex]}`;
    return this.t(key);
  }

  // Get month name
  getMonthName(monthIndex) {
    const months = ['january', 'february', 'march', 'april', 'may', 'june',
                    'july', 'august', 'september', 'october', 'november', 'december'];
    return this.t(`months.${months[monthIndex]}`);
  }
}

// Create global instance
const i18n = new I18n();

// Export
export { i18n, I18n };