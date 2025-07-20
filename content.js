(function () {
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
            let presentButNotReplaced = {};

            for (const [key, value] of Object.entries(mapping)) {
                const pattern = new RegExp(`\\b${key}\\b`, "gi");
                const matches = html.match(pattern);
                if (matches && matches.length > 0) {
                    html = html.replace(pattern, value);
                    appliedMappings[key] = value;
                } else {
                    presentButNotReplaced[key] = value;
                }
            }

            if (Object.keys(appliedMappings).length > 0) {
                targetDiv.innerHTML = html;
            }

            const summary = document.createElement("div");
            summary.className = "cp-name-mapper-summary";
            summary.style.marginTop = "1rem";
            summary.innerHTML = (Object.keys(appliedMappings).length > 0
                    ? Object.entries(appliedMappings).map(([k, v]) => `${k} → ${v}`).join("<br>")
                    : "None");

            const presentDiv = document.createElement("div");
            presentDiv.className = "cp-name-mapper-present";
            presentDiv.style.marginTop = "0.5rem";
            presentDiv.innerHTML =(Object.entries(mapping)
                          .filter(([k]) => new RegExp(`\\b${k}\\b`, "i").test(targetDiv.innerText))
                          .map(([k, v]) => `${k} → ${v}`)
                          .join("<br>") || "None");

            targetDiv.insertAdjacentElement("afterend", summary);
            summary.insertAdjacentElement("afterend", presentDiv);
        });
    }
})();
