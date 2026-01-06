export default defineContentScript({
  // Use specific TLDs to be safe
  matches: [
    "*://www.google.com/*",
    "*://www.google.at/*", 
    "*://www.google.de/*",
    "*://google.com/*",
    "*://google.at/*"
  ],

  async main() {
    console.log("✅ DDG Guilt Trip: I am running on this page!"); 
    
    // 1. Get the timestamp from storage
    // (Only declare 'data' once!)
    const data = await browser.storage.local.get("lastBangTime");
    const lastBangTime = data.lastBangTime;
    
    console.log("🕒 Time stored in background:", lastBangTime);

    // 2. If no bang recorded, exit
    if (!lastBangTime) return;

    // 3. Check how much time has passed (in milliseconds)
    const timeDiff = Date.now() - lastBangTime;

    // 4. If less than 15 seconds have passed (increased slightly to be safe)
    if (timeDiff < 15000) {
      console.log(`Guilt Trip Triggered! (!g used ${timeDiff}ms ago)`);
      showGuiltBanner();
      
      // Clear the flag so reloading the page doesn't show the banner again
      browser.storage.local.remove("lastBangTime");
    }
  },
});

function showGuiltBanner() {
  const banner = document.createElement("div");
  
  Object.assign(banner.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    backgroundColor: "#de5833",
    color: "white",
    textAlign: "center",
    padding: "16px",
    fontSize: "18px",
    zIndex: "99999",
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  });

  banner.innerHTML = `
    <span>🦆 You used <b>!g</b>. Are you sure you couldn't find it on DuckDuckGo?</span>
    <button id="ddg-return-btn" style="padding: 6px 12px; cursor: pointer; border: none; background: white; color: #de5833; font-weight: bold; border-radius: 4px;">Take me back</button>
    <button id="ddg-close-btn" style="background: none; border: none; color: white; cursor: pointer; font-size: 20px;">✕</button>
  `;

  document.body.prepend(banner);

  // Add Button Listeners
  const returnBtn = document.getElementById("ddg-return-btn");
  const closeBtn = document.getElementById("ddg-close-btn");

  if (returnBtn) {
    returnBtn.addEventListener("click", () => {
      const params = new URLSearchParams(window.location.search);
      const query = params.get("q") || "";
      window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      banner.remove();
    });
  }
}