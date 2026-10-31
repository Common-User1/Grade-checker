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
  console.log(students);
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

document.getElementById("checkBtn").addEventListener("click", checkGrades);
document.getElementById("clearBtn").addEventListener("click", clearAll);
document.getElementById("saveBtn").addEventListener("click", saveStudent);

document.getElementById("addSubjectBtn").addEventListener("click", addSubjectRow);

// Start with 3 subject rows
addSubjectRow();
addSubjectRow();
addSubjectRow();