var message = extractEmails(document.body.outerHTML).join('\n');

chrome.runtime.sendMessage(message);

function extractEmails(text) {
    const result = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    console.log('result: ', result);
    return result;
}