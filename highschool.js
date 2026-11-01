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
document.getElementById("checkBtn").addEventListener("click", checkGrades);

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

// Start with 5 subject rows
for (let i = 0; i < 5; i++) {
  addSubjectRow();
}