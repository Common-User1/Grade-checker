// App script: connects the page to the grade functions


// Read the inputs and check the grades
function checkGrades() {
  let name = document.getElementById("studentName").value;
  let grade1 = document.getElementById("grade1").value;
  let grade2 = document.getElementById("grade2").value;
  let grade3 = document.getElementById("grade3").value;

  let grades = [Number(grade1), Number(grade2), Number(grade3)];

  let average = computeAverage(grades);

  let remark = getRemark(average);

  let letter = getLetter(average);

  let highest = getHighest(grades);

  let result = document.getElementById("result");

    result.innerHTML =
    "Name: " + name + "<br>" +
    "Average: " + average.toFixed(2) + "<br>" +
    "Remark: " + remark + "<br>" +
    "Letter: " + letter + "<br>" +
    "Highest: " + highest;
}


document.getElementById("checkBtn").addEventListener("click", checkGrades);