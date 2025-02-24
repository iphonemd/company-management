// Add active class to the clicked navigation link --this code may need to be added if the nav bar doesnt show the selected table
/*const navLinks = document.querySelectorAll('nav a');
        const currentPage = window.location.pathname.split('/').pop(); // Get the current page filename

        navLinks.forEach(link => {
            // Set the active class based on the current page
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }

            // Add click event to toggle active class
            link.addEventListener('click', function() {
                navLinks.forEach(lnk => lnk.classList.remove('active'));
                this.classList.add('active');
            });
        });*/

// On page load, fetch the selected employees from sessionStorage
window.onload = function () {
  // Fetch the selected employees from sessionStorage (you might want to save this earlier in the calendar)
  const selectedEmployees =
    JSON.parse(sessionStorage.getItem("selectedEmployees")) || [];

  // Fetch the week start date from sessionStorage (instead of URL)
  const startDate = new Date(sessionStorage.getItem("weekStartDate"));
  const weekDates = getWeekDates(startDate);

  // Set the date headers dynamically
  const tableHeaders = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];
  weekDates.forEach((day, index) => {
    document.getElementById(tableHeaders[index]).innerText = `${getDayOfWeek(
      day
    )} ${formatDate(day)}`;
  });

  // Render the employee data into the table with input fields for work hours
  const tableBody = document.getElementById("employeeTableBody");
  selectedEmployees.forEach((employee) => {
    const row = document.createElement("tr");

    // Add employee name, last name, and employee number
    row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.lastName}</td>
                <td>${employee.empNumber}</td>
                ${weekDates
                  .map((day, index) => {
                    return `<td><input type="number" id="hours_${
                      employee.empNumber
                    }_day${index + 1}" placeholder="0" min="0"></td>`;
                  })
                  .join("")}
            `;
    tableBody.appendChild(row);
  });

  // Add event listener to the submit button
  document
    .getElementById("submitButton")
    .addEventListener("click", submitWorkHours);
};

// Helper functions to work with date

function getWeekDates(date) {
  const weekStart = new Date(date);
  const diff = weekStart.getDay() === 0 ? -6 : 1 - weekStart.getDay(); // If it's Sunday, go back 6 days to Monday, else adjust to previous Monday
  weekStart.setDate(weekStart.getDate() + diff);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(weekStart);
    currentDay.setDate(weekStart.getDate() + i);
    days.push(currentDay);
  }
  return days;
}

function getDayOfWeek(date) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return daysOfWeek[date.getDay()];
}

function formatDate(date) {
  const month = date.getMonth() + 1; // Months are zero-indexed
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  return `${month}/${day}/${year}`;
}

// Function to handle submitting the work hours
function submitWorkHours() {
  const selectedEmployees =
    JSON.parse(sessionStorage.getItem("selectedEmployees")) || [];

  // Prepare the data to submit
  const workHoursData = selectedEmployees.map((employee) => {
    const hours = [];
    for (let i = 0; i < 7; i++) {
      const hourInput = document.getElementById(
        `hours_${employee.empNumber}_day${i + 1}`
      );
      hours.push(hourInput ? hourInput.value : "0"); // Default to 0 if no value
    }
    return {
      empNumber: employee.empNumber,
      hours: hours,
    };
  });

  // You can save this data to a database, send it to a server, or save it to sessionStorage or localStorage
  console.log("Work Hours Submitted:", workHoursData);
  // You can also navigate or show a confirmation message:
  alert("Work hours have been submitted!");
}

// Function to go back to the calendar page
function goBackToCalendar() {
  // Get the current start date (Monday of the selected week)
  const startDateStr = sessionStorage.getItem("weekStartDate");
  // Navigate back to the calendar with the current week start date
  window.location.href = `calendar.html?start=${startDateStr}`;
}

//Check and see if the function above is needed, if it is, call the function elsewhere since the button has been removed. If not, delete it or comment it like the other pages

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
