// Layout script: opens and closes the sidebar on small screens

let menuBtn = document.getElementById("menuBtn");
let backdrop = document.getElementById("backdrop");

// Open or close the sidebar
function setSidebar(open) {
  document.body.classList.toggle("sidebar-open", open);
  menuBtn.setAttribute("aria-expanded", open);
}

menuBtn.addEventListener("click", function () {
  setSidebar(!document.body.classList.contains("sidebar-open"));
});

backdrop.addEventListener("click", function () {
  setSidebar(false);
});

// Close the sidebar with the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    setSidebar(false);
  }
});