// Records script: shared helpers for saving and loading grade records

// The name used to save all records in the browser
const RECORDS_KEY = "gradeRecords";

// Make a unique ID for a new record, for example "rec_mhx2k3f9a2b1"
function createId() {
  return "rec_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// Get the current date and time as text, for example "2026-11-04T11:30:00.000Z"
function nowIso() {
  return new Date().toISOString();
}

// Load all records from the browser.
// Gives an error if the saved data is damaged, so the page can show a warning.
function loadRecords() {
  let saved = localStorage.getItem(RECORDS_KEY);

  if (saved === null) {
    return [];
  }

  let data = JSON.parse(saved);

  if (!Array.isArray(data)) {
    throw new Error("Saved data is not a list");
  }

  return data;
}

// Save all records in the browser
function saveRecords(records) {
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}