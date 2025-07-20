const textarea = document.getElementById("mappings");
const saveBtn = document.getElementById("save");
const statusDiv = document.getElementById("status");

// Load existing mappings on popup open
chrome.storage.local.get(["nameMappings"], (result) => {
    if (result.nameMappings) {
        const obj = result.nameMappings;
        textarea.value = Object.entries(obj).map(([k, v]) => `${k}:${v}`).join("\n");
        statusDiv.textContent = `${Object.keys(obj).length} mappings loaded`;
    } else {
        statusDiv.textContent = "No mappings saved yet";
    }
});

saveBtn.addEventListener("click", () => {
    const lines = textarea.value.split("\n").map(line => line.trim()).filter(Boolean);
    const mapping = {};
    
    for (let line of lines) {
        const colonIndex = line.indexOf(":");
        if (colonIndex > 0) {
            const k = line.substring(0, colonIndex).trim();
            const v = line.substring(colonIndex + 1).trim();
            if (k && v) mapping[k] = v;
        }
    }
    
    chrome.storage.local.set({ nameMappings: mapping }, () => {
        const count = Object.keys(mapping).length;
        statusDiv.textContent = `✅ Saved ${count} mappings! Refresh the problem page.`;
        
        // Clear status after 3 seconds
        setTimeout(() => {
            statusDiv.textContent = `${count} mappings saved`;
        }, 3000);
    });
});