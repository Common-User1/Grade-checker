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
console.log("Average: " + computeAverage(grades));
console.log("Remark: " + getRemark(computeAverage(grades)));


function getLetter(avg) {
  if (avg >= 90) {
    return "A";
  } else if (avg >= 80) {
    return "B";
  } else if (avg >= 75) {
    return "C";
  }
  return "F";
}


console.log("Letter: " + getLetter(computeAverage(grades)));