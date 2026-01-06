// entrypoints/background.ts
export default defineBackground(() => {
  // Listen for any navigation to DuckDuckGo
  browser.webNavigation.onBeforeNavigate.addListener((details) => {
    try {
      const url = new URL(details.url);
      const query = url.searchParams.get("q");

      // Check if the search query contains !g
      // We check for startsWith "!g " (bang at start) or includes " !g" (bang at end)
      if (query && (query.startsWith("!g ") || query === "!g" || query.includes(" !g"))) {
        
        console.log("Detected !g usage. Setting flag.");
        
        // Save the current time to storage
        browser.storage.local.set({ lastBangTime: Date.now() });
      }
    } catch (e) {
      // Ignore invalid URLs
    }
  }, {
    url: [{ hostContains: 'duckduckgo.com' }] // Only run on DDG
  });
});