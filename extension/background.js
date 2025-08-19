// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractedCourseData") {
    console.log("--- Data Received From Content Script ---");
    console.log(message.data);
    console.log("---------------------------------------");

    // In the next phase, we will send this data to our backend API.
    // For now, we're just logging it to confirm it works.

    sendResponse({ success: true, message: "Data logged by background script." });
  }
  return true; // Indicates an async response
});
