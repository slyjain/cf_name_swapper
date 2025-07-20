
chrome.runtime.onInstalled.addListener(() => {
    console.log("CP Name Mapper extension installed");
});


chrome.action.onClicked.addListener((tab) => {
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
    });
});


chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.nameMappings) {
        console.log('Name mappings updated:', changes.nameMappings.newValue);
    }
});