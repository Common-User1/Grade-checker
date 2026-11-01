// Theme script: dark mode for all pages

// Apply the saved theme right away so the page does not flash white
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

// Show the right text on the theme button
function updateThemeButton() {
  let themeBtn = document.getElementById("themeBtn");

  if (document.documentElement.getAttribute("data-theme") === "dark") {
    themeBtn.textContent = "Light Mode";
  } else {
    themeBtn.textContent = "Dark Mode";
  }
}

// Switch between light and dark mode and save the choice
function toggleTheme() {
  let root = document.documentElement;

  if (root.getAttribute("data-theme") === "dark") {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }

  updateThemeButton();
}

// Connect the button when the page is ready
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("themeBtn").addEventListener("click", toggleTheme);
  updateThemeButton();
});