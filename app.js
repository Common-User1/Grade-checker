// App script: connects the page to the grade functions

// List of saved students
let students = [];

// Current sort column and direction
let sortColumn = "";
let sortDirection = "asc";

// Index of the student being edited (-1 means not editing)
let editingIndex = -1;

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
  let unitBoxes = document.querySelectorAll(".subject-units");

  let grades = [];
  let units = [];
  let subjectList = [];
  let subjectData = [];
  let hasEmpty = name === "";

  for (let i = 0; i < gradeBoxes.length; i++) {
    if (gradeBoxes[i].value === "" || unitBoxes[i].value === "") {
      hasEmpty = true;
    }

    let grade = Number(gradeBoxes[i].value);
    let unit = Number(unitBoxes[i].value);

    grades.push(grade);
    units.push(unit);

    let subjectName = nameBoxes[i].value;
    if (subjectName === "") {
      subjectName = "Subject " + (i + 1);
    }

    subjectList.push(subjectName + " (" + unit + "u): " + grade);
    subjectData.push({ name: subjectName, grade: grade, units: unit });
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

  for (let i = 0; i < units.length; i++) {
    if (units[i] <= 0) {
      result.innerHTML = "Error: units must be more than 0";
      result.className = "failed";
      return null;
    }
  }

  let average = computeWeightedAverage(grades, units);
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
    subjectData: subjectData,
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

  if (editingIndex === -1) {
    students.push(student);
  } else {
    students[editingIndex] = student;
    clearAll();
  }

  saveToStorage();
  showStudents();
}

// Clear all inputs and the result
function clearAll() {
  stopEditing();

  document.getElementById("studentName").value = "";

  document.getElementById("subjects").innerHTML = "";
  addSubjectRow();
  addSubjectRow();
  addSubjectRow();

  let result = document.getElementById("result");
  result.innerHTML = "";
  result.className = "";
}

// Go back to normal mode (not editing)
function stopEditing() {
  editingIndex = -1;
  document.getElementById("saveBtn").textContent = "Save Student";
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
      '<td><button type="button" class="edit-btn">Edit</button> ' +
      '<button type="button" class="delete-btn">Delete</button></td>';

    row.querySelector(".edit-btn").addEventListener("click", function () {
      editStudent(i);
    });

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

// Sort the students list by a column
function sortStudents(column) {
  if (sortColumn === column) {
    if (sortDirection === "asc") {
      sortDirection = "desc";
    } else {
      sortDirection = "asc";
    }
  } else {
    sortColumn = column;
    sortDirection = "asc";
  }

  students.sort(function (a, b) {
    let first = a[column];
    let second = b[column];

    if (column === "average" || column === "highest") {
      first = Number(first);
      second = Number(second);
    } else {
      first = String(first).toLowerCase();
      second = String(second).toLowerCase();
    }

    let order = 0;
    if (first < second) {
      order = -1;
    } else if (first > second) {
      order = 1;
    }

    if (sortDirection === "desc") {
      order = -order;
    }

    return order;
  });

  showStudents();
  showArrows();
}

// Show the sort arrow on the active column
function showArrows() {
  let headings = document.querySelectorAll("th.sortable");

  for (let i = 0; i < headings.length; i++) {
    let arrow = headings[i].querySelector(".arrow");

    if (headings[i].dataset.column === sortColumn) {
      if (sortDirection === "asc") {
        arrow.textContent = "\u25B2";
      } else {
        arrow.textContent = "\u25BC";
      }
    } else {
      arrow.textContent = "";
    }
  }
}

// Delete one student from the list
function deleteStudent(index) {
  students.splice(index, 1);
  saveToStorage();
  showStudents();
}

// Load a saved student into the form so it can be edited
function editStudent(index) {
  let s = students[index];

  if (!s.subjectData) {
    alert("This student was saved in an older version and cannot be edited. Please delete and add again.");
    return;
  }

  editingIndex = index;

  document.getElementById("studentName").value = s.name;
  document.getElementById("subjects").innerHTML = "";

  for (let i = 0; i < s.subjectData.length; i++) {
    addSubjectRow();

    let rows = document.querySelectorAll(".subject-row");
    let row = rows[rows.length - 1];

    row.querySelector(".subject-name").value = s.subjectData[i].name;
    row.querySelector(".subject-grade").value = s.subjectData[i].grade;
    row.querySelector(".subject-units").value = s.subjectData[i].units;
  }

  document.getElementById("saveBtn").textContent = "Update Student";
  document.getElementById("result").innerHTML = "";
  document.getElementById("result").className = "";

  window.scrollTo({ top: 0, behavior: "smooth" });
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

let sortHeadings = document.querySelectorAll("th.sortable");

for (let i = 0; i < sortHeadings.length; i++) {
  sortHeadings[i].addEventListener("click", function () {
    sortStudents(sortHeadings[i].dataset.column);
  });
}