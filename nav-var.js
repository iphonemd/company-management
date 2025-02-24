fetch("nav-bar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;

    // Initialize glow effect after navbar is loaded
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
  })
  .catch((error) => console.error("Error loading navigation:", error));
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
