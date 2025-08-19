// This script acts as a bridge between the background script and the web page.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_AUTH_TOKEN_FROM_PAGE') {
    // 1. Listen for the response from the web page
    window.addEventListener('message', function listener(event) {
      if (event.data.type === 'AUTH_TOKEN') {
        // 3. Once token is received, send it back to the background script
        sendResponse({ token: event.data.token });
        // Clean up the listener
        window.removeEventListener('message', listener);
      }
    });

    // 2. Ask the web page for the token
    window.postMessage({ type: 'GET_AUTH_TOKEN' }, '*');
    
    // Return true to indicate that we will send a response asynchronously
    return true;
  }
});
