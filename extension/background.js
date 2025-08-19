// This function gets the token and then sends the data to the backend
async function getTokenAndSendData(data) {
  // Find the tab where our web app is open
  const tabs = await chrome.tabs.query({ url: "http://localhost:3000/*" });

  if (tabs.length === 0) {
    console.error("Could not find the web app tab. Please make sure it's open and you are logged in.");
    return;
  }

  const appTab = tabs[0];

  // 1. "Ring the doorbell" by sending a message to our bridge script
  const response = await chrome.tabs.sendMessage(appTab.id, { type: 'GET_AUTH_TOKEN_FROM_PAGE' });

  if (!response || !response.token) {
    console.error("Failed to get auth token from the web app.");
    return;
  }

  const authToken = response.token;
  console.log("Successfully retrieved auth token.");

  // 2. Use the real token to make the API call
  fetch("http://localhost:3000/api/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}` // Using the REAL token
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(result => console.log("Backend response:", result))
  .catch(err => console.error("Error sending data to backend:", err));
}


// Listen for the scraped data from the original content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractedCourseData") {
    console.log("Data received. Requesting auth token...");
    getTokenAndSendData(message.data);
  }
  // No need for sendResponse or 'return true' here anymore,
  // as the process is now fully handled by getTokenAndSendData.
});
