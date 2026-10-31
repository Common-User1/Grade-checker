// App script: connects the page to the grade functions

// Read the inputs and check the grades
function checkGrades() {
  let result = document.getElementById("result");

  let name = document.getElementById("studentName").value;
  let grade1 = document.getElementById("grade1").value;
  let grade2 = document.getElementById("grade2").value;
  let grade3 = document.getElementById("grade3").value;

  if (name === "" || grade1 === "" || grade2 === "" || grade3 === "") {
    result.innerHTML = "Error: please fill in all the boxes";
    result.className = "failed";
    return;
  }

  let grades = [Number(grade1), Number(grade2), Number(grade3)];

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