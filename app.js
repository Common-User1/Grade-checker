// App script: connects the page to the grade functions


// Read the inputs and check the grades
function checkGrades() {
  let name = document.getElementById("studentName").value;
  let grade1 = document.getElementById("grade1").value;
  let grade2 = document.getElementById("grade2").value;
  let grade3 = document.getElementById("grade3").value;

  let grades = [Number(grade1), Number(grade2), Number(grade3)];

  console.log(name, grades);
}