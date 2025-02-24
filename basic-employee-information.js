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

// On page load, fetch the employee data from localStorage
window.onload = function () {
  // Get the employees array from localStorage
  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  // Call function to render employee info in the table
  renderEmployeeTable(employees);

  // Set up event listener for the "Pass Selected Employees" button
  document
    .getElementById("submitSelectedEmployees")
    .addEventListener("click", function () {
      passSelectedEmployeesToNextPage();
    });
};

// Function to render employee data in the table
function renderEmployeeTable(employees) {
  const tableBody = document
    .getElementById("employeeInfoTable")
    .querySelector("tbody");

  // Clear any existing rows
  tableBody.innerHTML = "";

  // Loop through the employees and create a row for each
  employees.forEach((employee) => {
    // Create a new row
    const row = document.createElement("tr");

    // Insert cells with employee data (checkbox, name, last name, emp number)
    row.innerHTML = `
       <td><input type="checkbox" class="employeeCheckbox" data-empNumber="${employee.empNumber}" /></td>
       <td>${employee.name}</td>
       <td>${employee.lastName}</td>
       <td>${employee.empNumber}</td>
     `;

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// Function to collect selected employees and pass to the next page
function passSelectedEmployeesToNextPage() {
  const selectedEmployees = [];

  // Get all checked checkboxes
  const checkboxes = document.querySelectorAll(".employeeCheckbox:checked");
  checkboxes.forEach((checkbox) => {
    const empNumber = checkbox.getAttribute("data-empNumber");
    const name = checkbox.closest("tr").cells[1].innerText;
    const lastName = checkbox.closest("tr").cells[2].innerText;

    // Push selected employee details to the array
    selectedEmployees.push({
      empNumber: empNumber,
      name: name,
      lastName: lastName,
    });
  });

  if (selectedEmployees.length > 0) {
    // Store selected employees in sessionStorage (or localStorage)
    sessionStorage.setItem(
      "selectedEmployees",
      JSON.stringify(selectedEmployees)
    );

    // Redirect to input-hours.html
    window.location.href = "input-hours.html";
  } else {
    alert("Please select at least one employee.");
  }
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
