function scrapePortalData() {
  console.log("FEU-ECL-Tracker: Scraping has started.");

  // --- Scrape Grades/Curriculum (Placeholder) ---
  const courses = [];
  // The logic for scraping grades would go here on the grades page.


  // --- Scrape Current Schedule ---
  const SCHEDULE_SELECTORS = {
    row: 'tbody tr.ng-star-inserted', // Selects every schedule row in the table body
    courseCode: 'td:nth-child(1)',    // The 1st table cell (td) in the row
    section: 'td:nth-child(2)',       // The 2nd table cell (td) in the row
    professor: 'td:nth-child(3)',     // The 3rd table cell (td) in the row
    building: 'td:nth-child(4)',      // The 4th table cell (td) in the row
    room: 'td:nth-child(5)',          // The 5th table cell (td) in the row
    day: 'td:nth-child(6)',           // The 6th table cell (td) in the row
    time: 'td:nth-child(7)',          // The 7th table cell (td) in the row
  };

  const scheduleRows = document.querySelectorAll(SCHEDULE_SELECTORS.row);
  const schedule = [];

  scheduleRows.forEach(row => {
    const timeRange = (row.querySelector(SCHEDULE_SELECTORS.time)?.innerText ?? '').trim();
    const [startTime, endTime] = timeRange.split(' - ');

    const scheduleItem = {
      courseCode: (row.querySelector(SCHEDULE_SELECTORS.courseCode)?.innerText ?? '').trim(),
      section: (row.querySelector(SCHEDULE_SELECTORS.section)?.innerText ?? '').trim(),
      professor: (row.querySelector(SCHEDULE_SELECTORS.professor)?.innerText ?? '').trim(),
      building: (row.querySelector(SCHEDULE_SELECTORS.building)?.innerText ?? '').trim(),
      room: (row.querySelector(SCHEDULE_SELECTORS.room)?.innerText ?? '').trim(),
      day: (row.querySelector(SCHEDULE_SELECTORS.day)?.innerText ?? '').trim(),
      startTime: startTime || '',
      endTime: endTime || '',
    };
    
    // Only add the item if it has a course code and a day
    if (scheduleItem.courseCode && scheduleItem.day) {
      schedule.push(scheduleItem);
    }
  });

  console.log(`FEU-ECL-Tracker: Found ${schedule.length} schedule items.`);
  return { courses, schedule }; // We return both, even if one is empty
}


// --- Do not change the code below ---
try {
  const scrapedData = scrapePortalData();
  chrome.runtime.sendMessage({ action: "extractedCourseData", data: scrapedData });
} catch (error) {
  console.error("FEU-ECL-Tracker: Error during scraping.", error);
  chrome.runtime.sendMessage({ action: "scrapingError", error: error.message });
}