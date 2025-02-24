let currentMonth = new Date().getMonth(); // Current month (0-11)
let currentYear = new Date().getFullYear(); // Current year (yyyy)

function generateCalendar() {
  const date = new Date(currentYear, currentMonth, 1);
  const firstDay = date.getDay(); // First day of the month (0-6, Sunday-Saturday)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Total days in the month

  // Update the month and year headers
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById(
    "calendarMonth"
  ).innerText = `${monthNames[currentMonth]}`;
  document.getElementById("calendarYear").innerText = `${currentYear}`;

  // Generate the days of the month
  const daysContainer = document.getElementById("days");
  daysContainer.innerHTML = ""; // Clear previous days

  // Fill in the empty spaces before the first day
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    daysContainer.appendChild(emptyCell);
  }

  // Get today's date
  const today = new Date();
  const currentDate = today.getDate();

  // Create the day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day");

    // Check if the day is today
    if (
      day === currentDate &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      dayCell.classList.add("today");
    }

    dayCell.innerText = day;
    dayCell.onclick = () => showEmployeeTable(day); // Show table on click
    daysContainer.appendChild(dayCell);
  }
}

function changeMonth(direction) {
  // Change the month based on the direction (-1 for previous, 1 for next)
  currentMonth += direction;

  // Handle the month rollover (from Jan to Dec, or Dec to Jan)
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  // Generate the updated calendar
  generateCalendar();
}

function changeYear(direction) {
  // Change the year based on the direction (-1 for previous year, 1 for next year)
  currentYear += direction;

  // Generate the updated calendar
  generateCalendar();
}

function goToToday() {
  // Reset to the current month and year
  const today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();

  // Generate the updated calendar
  generateCalendar();
}

function showEmployeeTable(day) {
  // Get the selected date (which is in the current month and year)
  const selectedDate = new Date(currentYear, currentMonth, day);

  // Save the selected date in sessionStorage
  sessionStorage.setItem("weekStartDate", selectedDate.toISOString());

  // Now navigate to basic-employee-info.html
  window.location.href = "basic-employee-info.html";
}

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

//Hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("show");
}

//Nav var event listener for glowing effect
document.querySelectorAll(".glow-link").forEach((link) => {
  link.addEventListener("mousemove", (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    link.style.setProperty("--x", `${x}px`);
    link.style.setProperty("--y", `${y}px`);
  });

  link.addEventListener("mouseleave", () => {
    link.style.setProperty("--x", "50%");
    link.style.setProperty("--y", "50%");
  });
});

// Buttons event listener for hover neon effect
document.querySelectorAll(".nav-buttons").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.setProperty("--x", "50%");
    btn.style.setProperty("--y", "50%");
  });
});

// Run the calendar generation on page load
window.onload = generateCalendar;
