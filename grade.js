// Grade Checker

// Compute the average of a list of grades
function computeAverage(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total = total + list[i];
  }
  return total / list.length;
}

// Get the remark based on the average
function getRemark(avg) {
  if (avg >= 75) {
    return "Passed";
  }
  return "Failed";
}


// Get the letter grade based on the average
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


// Check if all grades are from 0 to 100
function isValid(list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] < 0 || list[i] > 100) {
      return false;
    }
  }
  return true;
}


let students = [
  { name: "Juan", grades: [85, 90, 78] },
  { name: "Maria", grades: [92, 88, 95] },
  { name: "Pedro", grades: [70, 65, 72] }
];

students.forEach(function (student) {
  console.log("----------");
  if (isValid(student.grades)) {
    console.log("Name: " + student.name);
    console.log("Average: " + computeAverage(student.grades));
    console.log("Remark: " + getRemark(computeAverage(student.grades)));
    console.log("Highest: " + getHighest(student.grades));
    console.log("Letter: " + getLetter(computeAverage(student.grades)));
  } else {
    console.log("Error: invalid grade for " + student.name);
  }
});


// Get the highest grade in a list
function getHighest(list) {
  let highest = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i] > highest) {
      highest = list[i];
    }
  }
  return highest;
}