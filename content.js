(function () {
    // Wait for page to load completely
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyMappings);
    } else {
        applyMappings();
    }

    function applyMappings() {
        const headerDiv = document.querySelector(".problem-statement > .header");
        if (!headerDiv) return;
      
        const targetDiv = headerDiv.nextElementSibling;
        if (!targetDiv) return;
      
        chrome.storage.local.get(["nameMappings"], (result) => {
            const mapping = result.nameMappings || {};
            if (Object.keys(mapping).length === 0) return;
          
            let html = targetDiv.innerHTML;
            let appliedMappings = {};
            
            for (const [key, value] of Object.entries(mapping)) {
                const pattern = new RegExp(`\\b${key}\\b`, "gi");
                const matches = html.match(pattern);
                if (matches && matches.length > 0) {
                    html = html.replace(pattern, value);
                    appliedMappings[key] = value;
                }
            }
            
            // Only update if we found replacements
            if (Object.keys(appliedMappings).length > 0) {
                targetDiv.innerHTML = html;
              
                // Add mapping summary to page
                const summary = document.createElement("div");
                summary.className = "cp-name-mapper-summary";
                summary.innerHTML = `<strong>🔄 Name Mappings Applied:</strong><br>` +
                    Object.entries(appliedMappings).map(([k, v]) => `${k} → ${v}`).join("<br>");
              
                targetDiv.parentElement.appendChild(summary);
            }
        });
    }
})();