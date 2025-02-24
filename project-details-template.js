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

// Function to save editable fields to local storage
function saveProjectInfo() {
  localStorage.setItem(
    "projectName",
    document.getElementById("projectName").value
  );
  localStorage.setItem(
    "projectAddress",
    document.getElementById("projectAddress").value
  );
  localStorage.setItem(
    "contractorName",
    document.getElementById("contractorName").value
  );
}

// Function to calculate financial remaining values (for Financial Tracking Table)
function calculateFinancialRemainingValues() {
  const rows = document.querySelectorAll("#jobDetailsTable tbody tr");
  rows.forEach((row) => {
    const budget = parseFloat(row.querySelector(".budget").value) || 0;
    const materialBudget =
      parseFloat(row.querySelector(".material-budget").value) || 0;
    const materialUsed =
      parseFloat(row.querySelector(".material-used").value) || 0;
    const manHoursBudget =
      parseFloat(row.querySelector(".man-hours-budget").value) || 0;
    const manHoursUsed =
      parseFloat(row.querySelector(".man-hours-used").value) || 0;

    const materialRemaining = materialBudget - materialUsed;
    const manHoursRemaining = manHoursBudget - manHoursUsed;
    const budgetRemaining = budget - (materialUsed + manHoursUsed);

    row.querySelector(".material-remaining").textContent =
      materialRemaining.toFixed(2);
    row.querySelector(".man-hours-remaining").textContent =
      manHoursRemaining.toFixed(2);
    row.querySelector(".budget-remaining").textContent =
      budgetRemaining.toFixed(2);
  });
}

// Function to calculate project progress (for Footing and Quantities Tracking Table)
function calculateProjectProgress() {
  const rows = document.querySelectorAll("#summaryTable tbody tr");
  rows.forEach((row) => {
    const totalFootage =
      parseFloat(row.querySelector(".total-footage").value) || 0;
    const footageCompleted =
      parseFloat(row.querySelector(".footage-completed").value) || 0;
    const materialTotal =
      parseFloat(row.querySelector(".material-total").value) || 0;
    const materialUsed =
      parseFloat(row.querySelector(".material-used").value) || 0;
    const manHoursTotal =
      parseFloat(row.querySelector(".man-hours-total").value) || 0;
    const manHoursUsed =
      parseFloat(row.querySelector(".man-hours-used").value) || 0;

    // Calculating remaining values
    const footageRemaining = totalFootage - footageCompleted;
    const materialRemaining = materialTotal - materialUsed;
    const manHoursRemaining = manHoursTotal - manHoursUsed;

    // Calculate progress percentages
    const progressFeetPercentage =
      totalFootage === 0 ? 0 : (footageCompleted / totalFootage) * 100;
    const progressMaterialPercentage =
      materialTotal === 0 ? 0 : (materialUsed / materialTotal) * 100;
    const progressManHoursPercentage =
      manHoursTotal === 0 ? 0 : (manHoursUsed / manHoursTotal) * 100;

    // Update text for remaining columns
    row.querySelector(".footage-remaining").textContent =
      footageRemaining.toFixed(2);
    row.querySelector(".material-remaining-summary").textContent =
      materialRemaining.toFixed(2);
    row.querySelector(".man-hours-remaining-summary").textContent =
      manHoursRemaining.toFixed(2);

    // Select progress bars within the row dynamically
    const progressBars = row.querySelectorAll(".progress-bar");

    // Update width and text dynamically
    progressBars[0].style.width = `${progressFeetPercentage}%`;
    progressBars[0].textContent = `${progressFeetPercentage.toFixed(2)}%`;

    progressBars[1].style.width = `${progressMaterialPercentage}%`;
    progressBars[1].textContent = `${progressMaterialPercentage.toFixed(2)}%`;

    progressBars[2].style.width = `${progressManHoursPercentage}%`;
    progressBars[2].textContent = `${progressManHoursPercentage.toFixed(2)}%`;
  });
}

// Function to load saved data when the page loads
window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const projectNameParam = params.get("name");

  if (projectNameParam) {
    // Loading existing project
    const projectData = localStorage.getItem(projectNameParam);
    if (projectData) {
      const project = JSON.parse(projectData);
      document.getElementById("projectName").value = project.name;
      document.getElementById("projectAddress").value =
        project.projectAddress || "";
      document.getElementById("contractorName").value =
        project.contractorName || "";

      // Load table data
      if (project.jobDetailsTable) {
        loadTableData("jobDetailsTable", project.jobDetailsTable);
      }
      if (project.summaryTable) {
        loadTableData("summaryTable", project.summaryTable);
      }
    } else {
      alert("Project details not found.");
    }
  }
};

function loadTableData(tableId, tableData) {
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll("tbody tr");

  rows.forEach((row, rowIndex) => {
    const rowData = tableData[rowIndex];
    if (rowData) {
      const inputs = row.querySelectorAll("input");
      inputs.forEach((input, inputIndex) => {
        input.value = rowData[inputIndex] || "";
      });
    }
  });
}

//B
function saveProject(callback) {
  const projectName = document.getElementById("projectName").value;
  const projectAddress = document.getElementById("projectAddress").value;
  const contractorName = document.getElementById("contractorName").value;

  // Capture table data
  const jobDetailsTableData = getTableData("jobDetailsTable");
  const summaryTableData = getTableData("summaryTable");

  // Create a project object with all data
  const project = {
    name: projectName,
    projectAddress: projectAddress,
    contractorName: contractorName,
    jobDetailsTable: jobDetailsTableData,
    summaryTable: summaryTableData,
  };

  // Save the entire project object to local storage
  localStorage.setItem(projectName, JSON.stringify(project));

  // Add project to projects.html (using local storage communication)
  let existingProjects =
    JSON.parse(localStorage.getItem("addedProjects")) || [];
  let existingProject = existingProjects.find((p) => p.name === projectName);
  if (!existingProject) {
    existingProjects.push({ name: projectName });
    localStorage.setItem("addedProjects", JSON.stringify(existingProjects));
  }

  // Saved! Message that fades
  const message = document.getElementById("saveMessage");
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 3000); // Fade out after 3 seconds
}

function getTableData(tableId) {
  const table = document.getElementById(tableId);
  const rows = table.querySelectorAll("tbody tr");
  const tableData = [];

  rows.forEach((row) => {
    const rowData = [];
    const inputs = row.querySelectorAll("input");
    inputs.forEach((input) => {
      rowData.push(input.value);
    });
    tableData.push(rowData);
  });
  return tableData;
}

function navigate(url) {
  saveProject();
  window.location.href = url;
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
