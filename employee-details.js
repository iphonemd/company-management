// Add active class to the clicked navigation link
const navLinks = document.querySelectorAll("nav a");
const currentPage = window.location.pathname.split("/").pop(); // Get the current page filename

navLinks.forEach((link) => {
  // Set the active class based on the current page
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }

  // Add click event to toggle active class
  link.addEventListener("click", function () {
    navLinks.forEach((lnk) => lnk.classList.remove("active"));
    this.classList.add("active");
  });
});

// Function to render the employee table
function renderEmployeeTable(employees) {
  const tableBody = document
    .getElementById("employeeTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear the table before rendering

  employees.forEach((employee, index) => {
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = employee.name;
    row.insertCell(1).innerText = employee.lastName;
    row.insertCell(2).innerText = employee.empNumber;
    row.insertCell(3).innerText = employee.phone;
    row.insertCell(4).innerText = employee.email;
    row.insertCell(5).innerText = employee.address;
    row.insertCell(6).innerText = employee.ssn;
    row.insertCell(7).innerText = employee.hireDate;

    const actionsCell = row.insertCell(8);

    // Edit Button
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-btn"); // Add a CSS class
    editButton.onclick = () => editEmployee(index);
    actionsCell.appendChild(editButton);

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-btn"); // Add a CSS class
    deleteButton.onclick = () => deleteEmployee(index);
    actionsCell.appendChild(deleteButton);
  });
}

// Function to delete an employee with confirmation
function deleteEmployee(index) {
  // Show confirmation dialog before deletion
  const confirmation = confirm(
    "Are you sure you want to delete this employee?"
  );

  if (confirmation) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.splice(index, 1); // Remove the employee at the given index
    localStorage.setItem("employees", JSON.stringify(employees)); // Update localStorage
    renderEmployeeTable(employees); // Re-render the employee table
    alert("Employee deleted successfully");
  }
}

// Function to edit an employee (Navigate to edit page)
function editEmployee(index) {
  window.location.href = `edit-employee.html?index=${index}`;
}

// Function to search employees by name, last name or employee number
function searchEmployee() {
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchQuery) ||
      employee.lastName.toLowerCase().includes(searchQuery) ||
      employee.empNumber.toString().includes(searchQuery)
    );
  });
  renderEmployeeTable(filteredEmployees);
}

// Go back to the calendar page NOT needed since we are using the nav bar
/*
function goToCalendar() {
    window.location.href = 'calendar.html';
}
    */

// Go to the add employee page
function goToAddEmployeePage() {
  window.location.href = "add-employee.html";
}

// Load the employee data when the page loads
window.onload = function () {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  renderEmployeeTable(employees);
};

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
