function addEmployee() {
  const name = document.getElementById("employeeName").value;
  const lastName = document.getElementById("employeeLastName").value;
  const empNumber = document.getElementById("employeeNumber").value;
  const phone = document.getElementById("employeePhone").value;
  const email = document.getElementById("employeeEmail").value;
  const address = document.getElementById("employeeAddress").value;
  const ssn = document.getElementById("employeeSSN").value;
  const hireDate = document.getElementById("employeeHireDate").value;

  if (!name || !lastName || !empNumber) {
    alert("Please fill in all the required fields.");
    return;
  }

  const newEmployee = {
    name,
    lastName,
    empNumber,
    phone,
    email,
    address,
    ssn,
    hireDate,
  };

  // Add new employee to the employee list in local storage
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.push(newEmployee);
  localStorage.setItem("employees", JSON.stringify(employees));

  alert("Employee added successfully");
  goToEmployeeDetails();
}

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
