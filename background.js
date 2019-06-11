function updateCount(tabId, isOnRemoved) {
	broswer.tabs.query({}).then((tabs) => {});
}

browser.tabs.onRemoved.addListener((tabId) => { updateCount (tabId, true);
});

browser.tabs.onCreated.addListener((tabId) => { updateCount (tabId, false);
});

updateCount();
