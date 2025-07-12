document.addEventListener("DOMContentLoaded", () => {
    const toggleBlocking = document.getElementById("toggleBlocking");
    const toggleSideCard = document.getElementById("toggleSideCardBlock");
    const toggleDark = document.getElementById("toggleDark");

    // Load previous state
    chrome.storage.local.get(["blockingEnabled", "sideCardEnabled", "darkModeEnabled"], (result) => {
        toggleBlocking.checked = result.blockingEnabled ?? true;
        toggleSideCard.checked = result.sideCardEnabled ?? true;
        toggleDark.checked = result.darkModeEnabled ?? false;
    });

    // Save toggle states
    toggleBlocking.addEventListener("change", () => {
        chrome.storage.local.set({ blockingEnabled: toggleBlocking.checked });
    });

    toggleSideCard.addEventListener("change", () => {
        chrome.storage.local.set({ sideCardEnabled: toggleSideCard.checked });
    });

    toggleDark.addEventListener("change", () => {
        chrome.storage.local.set({ darkModeEnabled: toggleDark.checked });
    });
});
