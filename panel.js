var myWindowID;
const contentBox = document.querySelector("#content");

window.addEventListener("mouseover", () => {
    contentBox.setAttribute("contenteditable", true);
});

window.addEventListener("mouseout", () => {
    contentBox.setAttribute("contenteditable", false);
    browser.tabs.query({windowID: myWindowID, active: true}). then ((tabs) => {
        let contentToStore = {};
        contentToStore[tabs[0].url] = contentBox.textContent;
        browser.storage.local.set(contentToStore);
    });
});

function updateContent() {
    browser.tabs.query({windowID: myWindowID, active: true}).then ((tabs) => {
        return broswer.storage.local.get(tabs[0].url);
    })
    .then((storedInfo) => {
        contentBox.textContent= storedInfo[Object.keys(storedInfo) [0]];
    });
}

broswer.tabs.onActivated.addListener(updateContent);

broswer.tabs.onUpdated.addListener(updateContent);

browser.window.getCurrent({populate: true}).then ((windowInfo) => {
    myWindowID = windowInfo.id;
    updateContent();
});