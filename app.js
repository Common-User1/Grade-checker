// App script: connects the page to the grade functions

// List of saved students
let students = [];

// Add a new subject row (subject name + grade)
function addSubjectRow() {
  let container = document.getElementById("subjects");

  let row = document.createElement("div");
  row.className = "subject-row";

  row.innerHTML =
    '<input type="text" class="subject-name" placeholder="Subject">' +
    '<input type="number" class="subject-grade" placeholder="Grade">' +
    '<input type="number" class="subject-units" placeholder="Units" value="3" min="1">' +
    '<button type="button" class="remove-btn">X</button>';

  row.querySelector(".remove-btn").addEventListener("click", function () {
    row.remove();
  });

  container.appendChild(row);
}

// Read the inputs and check the grades
function checkGrades() {
  let result = document.getElementById("result");

  let name = document.getElementById("studentName").value;
  let gradeBoxes = document.querySelectorAll(".subject-grade");
  let nameBoxes = document.querySelectorAll(".subject-name");

  let grades = [];
  let subjectList = [];
  let hasEmpty = name === "";

  for (let i = 0; i < gradeBoxes.length; i++) {
    if (gradeBoxes[i].value === "") {
      hasEmpty = true;
    }
    grades.push(Number(gradeBoxes[i].value));

    let subjectName = nameBoxes[i].value;
    if (subjectName === "") {
      subjectName = "Subject " + (i + 1);
    }
    subjectList.push(subjectName + ": " + gradeBoxes[i].value);
  }

  if (hasEmpty || grades.length === 0) {
    result.innerHTML = "Error: please fill in all the boxes";
    result.className = "failed";
    return null;
  }

  if (!isValid(grades)) {
    result.innerHTML = "Error: grades must be from 0 to 100";
    result.className = "failed";
    return null;
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

  return {
    name: name,
    subjects: subjectList.join(", "),
    average: average.toFixed(2),
    remark: remark,
    letter: letter,
    highest: highest
  };
}

// Save the current student to the list
function saveStudent() {
  let student = checkGrades();

  if (student === null) {
    return;
  }

  students.push(student);
  saveToStorage();
  showStudents();
}


// Clear all inputs and the result
function clearAll() {
  document.getElementById("studentName").value = "";

  document.getElementById("subjects").innerHTML = "";
  addSubjectRow();
  addSubjectRow();
  addSubjectRow();

  let result = document.getElementById("result");
  result.innerHTML = "";
  result.className = "";
}

// Show all saved students in the table
function showStudents() {
  let body = document.getElementById("studentsBody");
  body.innerHTML = "";

  let shown = 0;

  for (let i = 0; i < students.length; i++) {
    let s = students[i];

    if (!matchesFilter(s)) {
      continue;
    }

    shown = shown + 1;

    let row = document.createElement("tr");

    let badgeClass = "badge-failed";
    if (s.remark === "Passed") {
      badgeClass = "badge-passed";
    }

    row.innerHTML =
      "<td>" + s.name + "</td>" +
      "<td>" + s.subjects + "</td>" +
      "<td>" + s.average + "</td>" +
      '<td><span class="badge ' + badgeClass + '">' + s.remark + "</span></td>" +
      "<td>" + s.letter + "</td>" +
      "<td>" + s.highest + "</td>" +
      '<td><button type="button" class="delete-btn">Delete</button></td>';

    row.querySelector(".delete-btn").addEventListener("click", function () {
      deleteStudent(i);
    });

    body.appendChild(row);
  }

  if (shown === 0) {
    let emptyRow = document.createElement("tr");
    emptyRow.innerHTML = '<td colspan="7" class="empty-message">No students found.</td>';
    body.appendChild(emptyRow);
    
  }

  showSummary();
}

// Check if a student matches the search and filter
function matchesFilter(student) {
  let search = document.getElementById("searchBox").value.toLowerCase();
  let filter = document.getElementById("filterSelect").value;

  let nameMatches = student.name.toLowerCase().includes(search);
  let remarkMatches = filter === "all" || student.remark === filter;

  return nameMatches && remarkMatches;
}
// Save the students list in the browser
function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Save the students list in the browser
function saveToStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

// Load the saved students when the page opens
function loadFromStorage() {
  let saved = localStorage.getItem("students");

  if (saved !== null) {
    students = JSON.parse(saved);
  }
}

// Show the class summary
function showSummary() {
  let total = students.length;
  let sum = 0;
  let passed = 0;
  let failed = 0;
  let topName = "-";
  let topAverage = -1;

  for (let i = 0; i < students.length; i++) {
    let average = Number(students[i].average);

    sum = sum + average;

    if (students[i].remark === "Passed") {
      passed = passed + 1;
    } else {
      failed = failed + 1;
    }

    if (average > topAverage) {
      topAverage = average;
      topName = students[i].name;
    }
  }

  let classAverage = 0;
  if (total > 0) {
    classAverage = sum / total;
  }

  document.getElementById("totalStudents").textContent = total;
  document.getElementById("classAverage").textContent = classAverage.toFixed(2);
  document.getElementById("passedCount").textContent = passed;
  document.getElementById("failedCount").textContent = failed;
  document.getElementById("topStudent").textContent = topName;
}

// Delete one student from the list
function deleteStudent(index) {
  students.splice(index, 1);
  saveToStorage();
  showStudents();
}

// Delete all saved students
function clearStudents() {
  if (confirm("Delete all saved students?")) {
    students = [];
    saveToStorage();
    showStudents();
  }
}

document.getElementById("checkBtn").addEventListener("click", checkGrades);
document.getElementById("clearBtn").addEventListener("click", clearAll);
document.getElementById("saveBtn").addEventListener("click", saveStudent);

document.getElementById("addSubjectBtn").addEventListener("click", addSubjectRow);

// Start with 3 subject rows
addSubjectRow();
addSubjectRow();
addSubjectRow(); 

// Load and show the saved students
loadFromStorage();
showStudents();

document.getElementById("clearStudentsBtn").addEventListener("click", clearStudents);
document.getElementById("searchBox").addEventListener("input", showStudents);
document.getElementById("filterSelect").addEventListener("change", showStudents);