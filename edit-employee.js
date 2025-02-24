// Function to fetch employee details and pre-populate the form
function loadEmployeeData() {
  // Get employee index from URL
  const urlParams = new URLSearchParams(window.location.search);
  const employeeIndex = parseInt(urlParams.get("index"));

  if (isNaN(employeeIndex)) {
    alert("Invalid employee index.");
    window.location.href = "employee-details.html";
    return;
  }

  // Get employees data from localStorage
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  if (employeeIndex < 0 || employeeIndex >= employees.length) {
    alert("Employee not found.");
    window.location.href = "employee-details.html";
    return;
  }

  const employee = employees[employeeIndex];

  // Pre-populate form fields with employee data
  document.getElementById("employeeName").value = employee.name;
  document.getElementById("employeeLastName").value = employee.lastName;
  document.getElementById("employeeNumber").value = employee.empNumber;
  document.getElementById("employeePhone").value = employee.phone;
  document.getElementById("employeeEmail").value = employee.email;
  document.getElementById("employeeAddress").value = employee.address;
  document.getElementById("employeeSSN").value = employee.ssn;
  document.getElementById("employeeHireDate").value = employee.hireDate;
}

// Function to save employee changes
function saveEmployeeChanges() {
  const name = document.getElementById("employeeName").value;
  const lastName = document.getElementById("employeeLastName").value;
  const empNumber = document.getElementById("employeeNumber").value;
  const phone = document.getElementById("employeePhone").value;
  const email = document.getElementById("employeeEmail").value;
  const address = document.getElementById("employeeAddress").value;
  const ssn = document.getElementById("employeeSSN").value;
  const hireDate = document.getElementById("employeeHireDate").value;

  // Get employee index from URL
  const urlParams = new URLSearchParams(window.location.search);
  const employeeIndex = parseInt(urlParams.get("index"));

  if (isNaN(employeeIndex)) {
    alert("Invalid employee index.");
    return;
  }

  // Get employees data from localStorage
  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  if (employeeIndex < 0 || employeeIndex >= employees.length) {
    alert("Employee not found.");
    return;
  }

  // Update employee data
  employees[employeeIndex] = {
    name,
    lastName,
    empNumber,
    phone,
    email,
    address,
    ssn,
    hireDate,
  };

  // Save updated employee data back to localStorage
  localStorage.setItem("employees", JSON.stringify(employees));

  alert("Employee details updated successfully!");
  window.location.href = "employee-details.html"; // Redirect to employee details page
}

// Go back to the employee details page
function goToEmployeeDetails() {
  window.location.href = "employee-details.html";
}

// Add click event to toggle active class
link.addEventListener("click", function () {
  navLinks.forEach((lnk) => lnk.classList.remove("active"));
  this.classList.add("active");
});

//Hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("show");
}

// Load employee data when the page loads
window.onload = loadEmployeeData;
