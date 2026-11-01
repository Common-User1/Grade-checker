// High School script: connects the page to the grade functions

// Add a new subject row (subject name + four quarters)
function addSubjectRow() {
  let container = document.getElementById("subjects");

  let row = document.createElement("div");
  row.className = "subject-row";

  row.innerHTML =
    '<input type="text" class="subject-name" placeholder="Subject">' +
    '<input type="number" class="quarter" placeholder="Q1">' +
    '<input type="number" class="quarter" placeholder="Q2">' +
    '<input type="number" class="quarter" placeholder="Q3">' +
    '<input type="number" class="quarter" placeholder="Q4">' +
    '<button type="button" class="remove-btn">X</button>';

  row.querySelector(".remove-btn").addEventListener("click", function () {
    row.remove();
  });

  container.appendChild(row);
}

document.getElementById("addSubjectBtn").addEventListener("click", addSubjectRow);

// Start with 5 subject rows
for (let i = 0; i < 5; i++) {
  addSubjectRow();
}