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

let projects = [
  { id: 1, name: "Oklahoma Psychiatric", status: "active" },
  { id: 2, name: "Pryor Stadium", status: "future" },
  { id: 3, name: "Simmons Bank", status: "completed" },
  { id: 4, name: "Stillwater Airport", status: "active" },
  { id: 5, name: "Boone Pickens", status: "future" },
];

// Load added projects from local storage
let addedProjects = JSON.parse(localStorage.getItem("addedProjects")) || [];
addedProjects.forEach((project) => {
  let existingProject = projects.find((p) => p.name === project.name);
  if (!existingProject) {
    projects.push({
      id: projects.length + 1,
      name: project.name,
      status: "active",
    });
  }
});

//B
// Function to render projects based on their status
function renderProjects() {
  const activeProjectsContainer = document.getElementById("active-projects");
  const futureProjectsContainer = document.getElementById("future-projects");
  const completedProjectsContainer =
    document.getElementById("completed-projects");

  // Clear the current content
  activeProjectsContainer.innerHTML = "";
  futureProjectsContainer.innerHTML = "";
  completedProjectsContainer.innerHTML = "";

  // Render active projects
  projects.forEach((project) => {
    const projectElement = createProjectElement(project);
    if (project.status === "active") {
      activeProjectsContainer.appendChild(projectElement);
    } else if (project.status === "future") {
      futureProjectsContainer.appendChild(projectElement);
    } else if (project.status === "completed") {
      completedProjectsContainer.appendChild(projectElement);
    }
  });
}

// Function to create project element with buttons
function createProjectElement(project) {
  const div = document.createElement("div");
  div.classList.add("project-item");
  div.id = `project-${project.id}`;
  div.setAttribute("draggable", "true");
  div.setAttribute("ondragstart", `drag(event, ${project.id})`);
  div.innerHTML = `
              <strong>${project.name}</strong>
              <br>
              <button class="delete" onclick="deleteProject(${project.id})">Delete</button>
          `;
  div.onclick = () => openProjectPage(project.id);
  return div;
}

// Function to drag a project
function drag(ev, projectId) {
  ev.dataTransfer.setData("text", projectId);
}

// Function to allow drop
function allowDrop(ev) {
  ev.preventDefault();
}

// Function to handle drop
function drop(ev) {
  ev.preventDefault();
  const projectId = parseInt(ev.dataTransfer.getData("text"));
  const project = projects.find((p) => p.id === projectId);

  const targetColumn = ev.target.closest(".project-column");
  const targetId = targetColumn.id;

  if (targetId === "active-column") {
    project.status = "active";
  } else if (targetId === "future-column") {
    project.status = "future";
  } else if (targetId === "completed-column") {
    project.status = "completed";
  }

  // Save project positions to localStorage
  localStorage.setItem(
    "projectPositions",
    JSON.stringify(projects.map((p) => ({ id: p.id, status: p.status })))
  );

  renderProjects();
}

// Function to open a project page
function openProjectPage(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    const projectDetails = localStorage.getItem(project.name);
    if (projectDetails) {
      window.location.href = `project-details-template.html?name=${project.name}`;
    } else {
      alert("Details not found.");
    }
  }
}

/* original chatGpt code // Function to add a new project (simple prompt for demo purposes)
      function addNewProject() {
          const projectName = prompt("Enter the project name:");
          if (projectName) {
              const newProject = {
                  id: projects.length + 1,
                  name: projectName,
                  status: 'active',
              };
              projects.push(newProject);
              renderProjects();
          }
      }
          */
// Function to add new project
function addNewProject() {
  window.location.href = "project-details-template.html";
}

/* button was removed // Function to edit a project
      function editProject(projectId) {
          const project = projects.find(p => p.id === projectId);
          const newName = prompt("Edit project name:", project.name);
          if (newName) {
              project.name = newName;
              renderProjects();
              // Redirect to project details page after editing
              window.location.href = `project-detail.html?id=${project.id}`;
          }
      }*/

// Function to delete a project with confirmation
function deleteProject(projectId) {
  if (confirm("Are you sure you want to delete this project?")) {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      // Remove from projects array
      projects = projects.filter((p) => p.id !== projectId);

      // Remove from addedProjects in localStorage
      let addedProjects =
        JSON.parse(localStorage.getItem("addedProjects")) || [];
      addedProjects = addedProjects.filter((p) => p.name !== project.name);
      localStorage.setItem("addedProjects", JSON.stringify(addedProjects));

      // Remove project data from localStorage
      localStorage.removeItem(project.name);

      renderProjects();
    }
  }
}

// Function to go back to the calendar page NOT neded since we are using the nav bar

/*
      function goBackToCalendar() {
          window.location.href = 'calendar.html';
      }
          */

// Load project positions from localStorage
const savedPositions =
  JSON.parse(localStorage.getItem("projectPositions")) || [];
savedPositions.forEach((position) => {
  const project = projects.find((p) => p.id === position.id);
  if (project) {
    project.status = position.status;
  }
});

renderProjects();

// Initial render of projects
renderProjects();

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
