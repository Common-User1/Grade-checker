// Grade Checker
// This program checks the grades of students

// ----- Functions -----

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

// Compute the weighted average (GWA) using the units of each subject
function computeWeightedAverage(grades, units) {
  let totalPoints = 0;
  let totalUnits = 0;

  for (let i = 0; i < grades.length; i++) {
    totalPoints = totalPoints + grades[i] * units[i];
    totalUnits = totalUnits + units[i];
  }

  return totalPoints / totalUnits;
}


// Round a number to 2 decimal places
function roundTwo(value) {
  return Math.round(value * 100) / 100;
}

// Convert a percent grade to the 1.0 to 5.0 equivalent
function getEquivalent(grade) {
  if (grade >= 97) {
    return 1.0;
  } else if (grade >= 94) {
    return 1.25;
  } else if (grade >= 91) {
    return 1.5;
  } else if (grade >= 88) {
    return 1.75;
  } else if (grade >= 85) {
    return 2.0;
  } else if (grade >= 82) {
    return 2.25;
  } else if (grade >= 79) {
    return 2.5;
  } else if (grade >= 76) {
    return 2.75;
  } else if (grade >= 75) {
    return 3.0;
  }
  return 5.0;
}

// Get the honors based on the general average
function getHonors(average, hasFailing) {
  if (hasFailing) {
    return "None";
  }

  if (average >= 98) {
    return "With Highest Honors";
  } else if (average >= 95) {
    return "With High Honors";
  } else if (average >= 90) {
    return "With Honors";
  }

  return "None";
}