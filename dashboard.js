// Dashboard script: shows how many students are saved for each level

// Count the students saved in the browser
function countSaved(key) {
  let saved = localStorage.getItem(key);

  if (saved === null) {
    return 0;
  }

  return JSON.parse(saved).length;
}

// Make the text, for example "1 student saved"
function savedText(count) {
  if (count === 1) {
    return "1 student saved";
  }

  return count + " students saved";
}

document.getElementById("hsCount").textContent = savedText(countSaved("students_hs"));
document.getElementById("collegeCount").textContent = savedText(countSaved("students"));