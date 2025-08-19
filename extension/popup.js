document.getElementById('scrapeButton').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const statusEl = document.getElementById('status');
  statusEl.textContent = 'Injecting scraper...';

  // This executes the content-script.js file on the current page
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content-script.js']
  }, () => {
    if (chrome.runtime.lastError) {
      statusEl.textContent = 'Error: Could not run on this page.';
      console.error(chrome.runtime.lastError.message);
      return;
    }
    statusEl.textContent = 'Scraping in progress...';
    // The popup will close automatically after a short delay
    setTimeout(() => window.close(), 2000);
  });
});
