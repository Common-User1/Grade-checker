// High School script: connects the page to the grade functions

// List of saved students
let students = [];

// Index of the student being edited (-1 means not editing)
let editingIndex = -1;

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
document.getElementById("checkBtn").addEventListener("click", checkGrades);
document.getElementById("saveBtn").addEventListener("click", saveStudent);
document.getElementById("clearBtn").addEventListener("click", clearAll);
document.getElementById("clearStudentsBtn").addEventListener("click", clearStudents);
document.getElementById("cancelEditBtn").addEventListener("click", clearAll);

// Read the inputs and check the grades
function checkGrades() {
  let result = document.getElementById("result");

  let name = document.getElementById("studentName").value;
  let gradeLevel = document.getElementById("gradeLevel").value;
  let rows = document.querySelectorAll(".subject-row");

  let finalGrades = [];
  let allQuarters = [];
  let subjectList = [];
  let subjectData = [];
  let hasEmpty = name === "";

  for (let i = 0; i < rows.length; i++) {
    let subjectName = rows[i].querySelector(".subject-name").value;
    if (subjectName === "") {
      subjectName = "Subject " + (i + 1);
    }

    let quarterBoxes = rows[i].querySelectorAll(".quarter");
    let quarters = [];

    for (let j = 0; j < quarterBoxes.length; j++) {
      if (quarterBoxes[j].value === "") {
        hasEmpty = true;
      }
      quarters.push(Number(quarterBoxes[j].value));
    }

    allQuarters = allQuarters.concat(quarters);

    let finalGrade = roundTwo(computeAverage(quarters));
    finalGrades.push(finalGrade);

    subjectList.push(subjectName + ": " + finalGrade.toFixed(2));
    subjectData.push({ name: subjectName, quarters: quarters, finalGrade: finalGrade });
  }

  if (hasEmpty || rows.length === 0) {
    result.innerHTML = "Error: please fill in all the boxes";
    result.className = "failed";
    return null;
  }

  if (!isValid(allQuarters)) {
    result.innerHTML = "Error: grades must be from 0 to 100";
    result.className = "failed";
    return null;
  }

  let generalAverage = roundTwo(computeAverage(finalGrades));

  let hasFailing = false;
  for (let i = 0; i < finalGrades.length; i++) {
    if (finalGrades[i] < 75) {
      hasFailing = true;
    }
  }

  let remark = "Passed";
  if (hasFailing) {
    remark = "Failed";
  }

  let honors = getHonors(generalAverage, hasFailing);

  let subjectLines = "";
  for (let i = 0; i < subjectData.length; i++) {
    subjectLines = subjectLines + subjectData[i].name + ": " + subjectData[i].finalGrade.toFixed(2) + "<br>";
  }

  result.innerHTML =
    "Name: " + name + " (Grade " + gradeLevel + ")<br><br>" +
    "Final grades:<br>" + subjectLines + "<br>" +
    "General Average: " + generalAverage.toFixed(2) + "<br>" +
    "Remark: " + remark + "<br>" +
    "Honors: " + honors;

  if (remark === "Passed") {
    result.className = "passed";
  } else {
    result.className = "failed";
  }

  return {
    name: name,
    gradeLevel: gradeLevel,
    subjects: subjectList.join("; "),
    subjectData: subjectData,
    average: generalAverage.toFixed(2),
    remark: remark,
    honors: honors
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
  document.getElementById("gradeLevel").value = "7";

  document.getElementById("subjects").innerHTML = "";
  for (let i = 0; i < 5; i++) {
    addSubjectRow();
  }

  let result = document.getElementById("result");
  result.innerHTML = "";
  result.className = "";
}

// Show all saved students in the table
function showStudents() {
  let body = document.getElementById("studentsBody");
  body.innerHTML = "";

  for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let row = document.createElement("tr");

    let badgeClass = "badge-failed";
    if (s.remark === "Passed") {
      badgeClass = "badge-passed";
    }

    row.innerHTML =
      "<td>" + s.name + "</td>" +
      "<td>" + s.gradeLevel + "</td>" +
      "<td>" + s.subjects + "</td>" +
      "<td>" + s.average + "</td>" +
      "<td>" + s.honors + "</td>" +
      '<td><span class="badge ' + badgeClass + '">' + s.remark + "</span></td>" +
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

  if (students.length === 0) {
    let emptyRow = document.createElement("tr");
    emptyRow.innerHTML = '<td colspan="7" class="empty-message">No students saved yet.</td>';
    body.appendChild(emptyRow);
  }

  showSummary();
}

// Save the students list in the browser
function saveToStorage() {
  localStorage.setItem("students_hs", JSON.stringify(students));
}

// Load the saved students when the page opens
function loadFromStorage() {
  let saved = localStorage.getItem("students_hs");

  if (saved !== null) {
    students = JSON.parse(saved);
  }
}

// Delete one student from the list
function deleteStudent(index) {
  if (editingIndex !== -1) {
    clearAll();
  }

  students.splice(index, 1);
  saveToStorage();
  showStudents();
}

// Delete all saved students
function clearStudents() {
  if (confirm("Delete all saved students?")) {
    if (editingIndex !== -1) {
      clearAll();
    }

    students = [];
    saveToStorage();
    showStudents();
  }
}

// Load a saved student into the form so it can be edited
function editStudent(index) {
  let s = students[index];

  editingIndex = index;

  document.getElementById("studentName").value = s.name;
  document.getElementById("gradeLevel").value = s.gradeLevel;
  document.getElementById("subjects").innerHTML = "";

  for (let i = 0; i < s.subjectData.length; i++) {
    addSubjectRow();

    let rows = document.querySelectorAll(".subject-row");
    let row = rows[rows.length - 1];
    let quarterBoxes = row.querySelectorAll(".quarter");

    row.querySelector(".subject-name").value = s.subjectData[i].name;

    for (let j = 0; j < quarterBoxes.length; j++) {
      quarterBoxes[j].value = s.subjectData[i].quarters[j];
    }
  }

  document.getElementById("saveBtn").textContent = "Update Student";
  document.getElementById("cancelEditBtn").classList.remove("hidden");
  document.getElementById("result").innerHTML = "";
  document.getElementById("result").className = "";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Go back to normal mode (not editing)
function stopEditing() {
  editingIndex = -1;
  document.getElementById("saveBtn").textContent = "Save Student";
  document.getElementById("cancelEditBtn").classList.add("hidden");
}

// Show the class summary
function showSummary() {
  let total = students.length;
  let sum = 0;
  let passed = 0;
  let failed = 0;
  let honorsCount = 0;

  for (let i = 0; i < students.length; i++) {
    sum = sum + Number(students[i].average);

    if (students[i].remark === "Passed") {
      passed = passed + 1;
    } else {
      failed = failed + 1;
    }

    if (students[i].honors !== "None") {
      honorsCount = honorsCount + 1;
    }
  }

  document.getElementById("totalStudents").textContent = total;
  document.getElementById("passedCount").textContent = passed;
  document.getElementById("failedCount").textContent = failed;
  document.getElementById("honorsCount").textContent = honorsCount;

  if (total > 0) {
    document.getElementById("classAverage").textContent = (sum / total).toFixed(2);
  } else {
    document.getElementById("classAverage").textContent = "0";
  }
}

// Start with 5 subject rows
for (let i = 0; i < 5; i++) {
  addSubjectRow();
}

// Load and show the saved students
loadFromStorage();
showStudents();