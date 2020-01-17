chrome.tabs.onCreated.addListener(function (tab) {
  checkUrl(tab.url);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url !== undefined) {
    checkUrl(changeInfo.url);
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    checkUrl(tab.url);
  });
});


var count = 10; //計數器
var time = 10;  //所設定的時間
var myTimer;    //每秒執行一次的 function
function checkUrl(url) {

  var regex = new RegExp('^https://www.netflix.com/ |^https://www.youtube.com/');

  if (regex.test(url)) {
    if (myTimer !== undefined) {
      clearTimeout(myTimer);
    }
    count = time
    myTimer = countDown();
  } else {
    if (myTimer !== undefined) {
      clearTimeout(myTimer);
    }
  }

  function countDown() {
    count--;
    chrome.browserAction.setBadgeText({ text: count.toString() });
    if (count > 0) {
      myTimer = setTimeout(countDown, 1000);
    }
    else {
      if (confirm("準備好要面對現實了嗎?")) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.remove(tabs[0].id)
        })
      } else {
        alert('哼!隨便你!反正10秒後我會再問一次!')
      };
      count = time;
      myTimer = setTimeout(countDown, 1000);
    }
  }
}