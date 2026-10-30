// Grade Checker


let studentName = "Juan";
let grades = [85, 90, 78];


function computeAverage(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total = total + list[i];
  }
  return total / list.length;
}


function getRemark(avg) {
  if (avg >= 75) {
    return "Passed";
  }
  return "Failed";
}


console.log("Name: " + studentName);