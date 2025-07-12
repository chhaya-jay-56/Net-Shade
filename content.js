chrome.storage.local.get(["blockingEnabled", "sideCardEnabled", "darkModeEnabled"], (result) => {
    const removePromotedPosts = () => {
        const posts = document.querySelectorAll("div.feed-shared-update-v2");
        posts.forEach(post => {
            const spans = post.querySelectorAll("span");
            for (const span of spans) {
                if (span.innerText.trim().toLowerCase() === "promoted") {
                    post.remove();
                    break;
                }
            }
        });
    };

    const removeSideAds = () => {
        const adContainer = document.getElementById("ads-container");
        if (adContainer) adContainer.remove();

        document.querySelectorAll("section.ad-banner-container").forEach(e => e.remove());
        document.querySelectorAll("iframe.ad-banner").forEach(e => e.remove());
    };

    const applyDarkMode = () => {
        if (!document.getElementById("dark-invert-style")) {
            const style = document.createElement("style");
            style.id = "dark-invert-style";
            style.textContent = `
        html {
        filter: invert(1) hue-rotate(180deg) !important;
        background-color: #121212 !important;
        }
        img, video, iframe {
        filter: invert(1) hue-rotate(180deg) !important;
        }
    `;
            document.head.appendChild(style);
        }
    };

    if (result.blockingEnabled) removePromotedPosts();
    if (result.sideCardEnabled) removeSideAds();
    if (result.darkModeEnabled) applyDarkMode();

    const observer = new MutationObserver(() => {
        if (result.blockingEnabled) removePromotedPosts();
        if (result.sideCardEnabled) removeSideAds();
        if (result.darkModeEnabled) applyDarkMode();
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
