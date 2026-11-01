# Grade Checker

A web page that checks the grades of high school and college students. The user picks the level on the dashboard, types the grades of each subject, and the page shows the result. Saved students stay in the browser, even after refreshing the page.

## Live Demo

https://common-user1.github.io/Grade-checker/

![Screenshot of the Grade Checker](screenshot.png)

## Pages

**High School**
- Quarterly grades from Q1 to Q4 for each subject
- Final grade of each subject and the general average
- Remark and honors based on the general average
- Filter by grade level, passed or failed, and with honors

**College**
- Units, midterm grade, and final term grade for each subject
- Midterm GWA, final term GWA, and overall GWA, with the 1.0 to 5.0 equivalent
- Sort the table by name, midterm, final term, overall, or remark

**Both pages**
- Add or remove subjects
- Search students by name
- Summary of the saved students
- Edit or delete a saved student
- Dark mode, and the page remembers your choice
- Works on computers and phones

## How to run

1. Download or clone this repository.
2. Open the `index.html` file in a browser.
3. Choose High School or College.

## Files

- `index.html` - the dashboard
- `highschool.html` and `highschool.js` - the High School page
- `college.html` and `college.js` - the College page
- `grade.js` - the functions that compute the grades
- `theme.js` - dark mode for all pages
- `dashboard.js` - shows the number of saved students on the dashboard
- `style.css` - the colors and layout
- `logo.svg` - the logo