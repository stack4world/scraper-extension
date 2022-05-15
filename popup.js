chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

  const tabId = tabs[0].id;

  // const title = tabs[0].title;

  // console.log('tabs content', title);

  // document.getElementById('tab-title').innerHTML = title;

  chrome.scripting.executeScript({

    target: { tabId: tabId },

    files: ['payload.js']

  });

});



chrome.runtime.onMessage.addListener(function (message) {

  document.getElementById('emails-list').innerHTML = message;

  document.querySelector('#download').addEventListener("click", function(evt) {
    contentDownload(message);
  });
});


function contentDownload(message) {
  let data = JSON.stringify(message);
  
  let type = "application/json", name = "testfile.json";
  downloader(data, type, name)
}

function downloadURI(uri, name) {
  let link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
}

function downloader(data, type, name) {
  let blob = new Blob([data], {type});
  let url = window.URL.createObjectURL(blob);
  downloadURI(url, name);
  window.URL.revokeObjectURL(url);
}