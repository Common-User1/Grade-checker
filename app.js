// App script: connects the page to the grade functions


// Add a new subject row (subject name + grade)
function addSubjectRow() {
  let container = document.getElementById("subjects");

  let row = document.createElement("div");
  row.className = "subject-row";

  row.innerHTML =
    '<input type="text" class="subject-name" placeholder="Subject">' +
    '<input type="number" class="subject-grade" placeholder="Grade">';

  container.appendChild(row);
}
// Read the inputs and check the grades
function checkGrades() {
  let result = document.getElementById("result");

  let name = document.getElementById("studentName").value;
  let gradeBoxes = document.querySelectorAll(".subject-grade");

  let grades = [];
  let hasEmpty = name === "";

  for (let i = 0; i < gradeBoxes.length; i++) {
    if (gradeBoxes[i].value === "") {
      hasEmpty = true;
    }
    grades.push(Number(gradeBoxes[i].value));
  }

  if (hasEmpty || grades.length === 0) {
    result.innerHTML = "Error: please fill in all the boxes";
    result.className = "failed";
    return;
  }

  if (!isValid(grades)) {
    result.innerHTML = "Error: grades must be from 0 to 100";
    result.className = "failed";
    return;
  }

  let average = computeAverage(grades);
  let remark = getRemark(average);
  let letter = getLetter(average);
  let highest = getHighest(grades);

  result.innerHTML =
    "Name: " + name + "<br>" +
    "Average: " + average.toFixed(2) + "<br>" +
    "Remark: " + remark + "<br>" +
    "Letter: " + letter + "<br>" +
    "Highest: " + highest;

  if (remark === "Passed") {
    result.className = "passed";
  } else {
    result.className = "failed";
  }
}

// Clear all inputs and the result
function clearAll() {
  document.getElementById("studentName").value = "";
  document.getElementById("grade1").value = "";
  document.getElementById("grade2").value = "";
  document.getElementById("grade3").value = "";

  let result = document.getElementById("result");
  result.innerHTML = "";
  result.className = "";
}

document.getElementById("checkBtn").addEventListener("click", checkGrades);
document.getElementById("clearBtn").addEventListener("click", clearAll);

document.getElementById("addSubjectBtn").addEventListener("click", addSubjectRow);

// Start with 3 subject rows
addSubjectRow();
addSubjectRow();
addSubjectRow();