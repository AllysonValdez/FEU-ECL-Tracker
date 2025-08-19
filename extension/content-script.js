// This function is a TEMPLATE. The CSS selectors are examples
// and MUST be updated to match the real FEU portal's HTML.

function scrapePortalData() {
  console.log("FEU-ECL-Tracker: Scraping has started.");

  // --- Scrape Grades/Curriculum ---
  // Find all the rows in the grades table.
  const courseRows = document.querySelectorAll('.grade-table .course-row'); // <-- UPDATE THIS
  const courses = [];
  courseRows.forEach(row => {
    const course = {
      code: row.querySelector('.course-code')?.innerText.trim(),     // <-- UPDATE THIS
      title: row.querySelector('.course-title')?.innerText.trim(),    // <-- UPDATE THIS
      units: parseFloat(row.querySelector('.course-units')?.innerText), // <-- UPDATE THIS
      grade: parseFloat(row.querySelector('.course-grade')?.innerText), // <-- UPDATE THIS
    };
    // Only add the course if we found a code
    if (course.code) {
      courses.push(course);
    }
  });

  // --- Scrape Current Schedule ---
  // This is a placeholder; you'll need to build this part out
  const schedule = [];
  // const scheduleRows = document.querySelectorAll('.schedule-table .schedule-row'); // <-- UPDATE THIS
  // scheduleRows.forEach(row => { ... });

  console.log(`FEU-ECL-Tracker: Found ${courses.length} courses.`);
  return { courses, schedule };
}

// Send the extracted data to the background script
const scrapedData = scrapePortalData();
chrome.runtime.sendMessage({ action: "extractedCourseData", data: scrapedData });
