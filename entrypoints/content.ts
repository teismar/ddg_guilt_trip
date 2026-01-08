import { SUPPORTED_BANGS, BangConfig } from '../utils/bangs';
import { logger } from '../utils/logger';

export default defineContentScript({
  // Use specific TLDs to be safe
  matches: SUPPORTED_BANGS.flatMap(b => b.matchPatterns),

  async main() {
    logger.log("✅ DDG Guilt Trip: I am running on this page!"); 
    
    // Fetch preferences
    const data = await browser.storage.local.get(["lastBang", "bannerStyle", "strictMode", "customRedirects", "stats"]);
    const lastBang = data.lastBang;
    const bannerStyle = data.bannerStyle;
    const strictMode = data.strictMode || false;
    const customRedirects = data.customRedirects || {};
    const stats = data.stats || { interventions: 0 };
    
    if (!lastBang) return;

    const timeDiff = Date.now() - lastBang.timestamp;

    if (timeDiff < 15000) {
      const bang = SUPPORTED_BANGS.find(b => b.id === lastBang.id);
      if (!bang) return;

      logger.log(`Guilt Trip Triggered! (${bang.trigger} used ${timeDiff}ms ago)`);

      // Increment stats
      if (!stats.history) stats.history = [];
      stats.history.push({ ts: Date.now(), bangId: bang.id });
      stats.interventions = stats.history.length; // Keep total synced
      
      await browser.storage.local.set({ stats });

      const customBaseUrl = customRedirects[bang.id];

      if (strictMode) {
        const currentUrl = new URL(window.location.href);
        const query = bang.extractQuery(currentUrl);
        if (query) {
          logger.log("Strict Mode: Auto-redirecting...");
          
          // Brief "toast" notification before redirect
          const toast = document.createElement("div");
          Object.assign(toast.style, {
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#333",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            zIndex: "999999",
            fontSize: "14px",
            fontFamily: "Segoe UI, sans-serif",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            opacity: "0",
            transition: "opacity 0.3s ease"
          });
          toast.textContent = `Redirecting to privacy alternative via ${bang.trigger}...`;
          document.body.appendChild(toast);
          
          requestAnimationFrame(() => toast.style.opacity = "1");

          // Slight delay to allow reading the toast
          setTimeout(() => {
            window.location.replace(bang.getRedirectUrl(query, customBaseUrl));
          }, 800); 

          browser.storage.local.remove("lastBang");
          return;
        }
      }

      showGuiltBanner(bang, bannerStyle, customBaseUrl);
      
      browser.storage.local.remove("lastBang");
    }
  },
});

function showGuiltBanner(bang: BangConfig, style?: { bg: string, text: string }, customBaseUrl?: string) {
  const banner = document.createElement("div");
  
  // Default colors
  const bgColor = style?.bg || "#de5833";
  const textColor = style?.text || "white";
  
  Object.assign(banner.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    backgroundColor: bgColor,
    color: textColor,
    textAlign: "center",
    padding: "16px",
    fontSize: "18px",
    zIndex: "99999",
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transform: "translateY(-120%)",
    transition: "transform 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)"
  });

  const message = bang.bannerMessage || `You used <b>${bang.trigger}</b> (${bang.name}). Are you sure you couldn't find it on DuckDuckGo?`;

  banner.innerHTML = `
    <span>🦆 ${message}</span>
    <button id="ddg-return-btn" style="padding: 6px 12px; cursor: pointer; border: none; background: white; color: ${bgColor}; font-weight: bold; border-radius: 4px;">Take me back</button>
    <button id="ddg-close-btn" style="background: none; border: none; color: ${textColor}; cursor: pointer; font-size: 20px;">✕</button>
  `;

  document.body.prepend(banner);

  // Trigger animation
  requestAnimationFrame(() => {
    banner.style.transform = "translateY(0)";
  });

  // Add Button Listeners
  const returnBtn = document.getElementById("ddg-return-btn");
  const closeBtn = document.getElementById("ddg-close-btn");

  if (returnBtn) {
    returnBtn.focus(); // Auto-focus for keyboard accessibility
    
    returnBtn.addEventListener("click", () => {
      const currentUrl = new URL(window.location.href);
      const query = bang.extractQuery(currentUrl);
      
      if (query) {
        window.location.href = bang.getRedirectUrl(query, customBaseUrl);
      } else {
        window.location.href = "https://duckduckgo.com/";
      }
    });
  }

  // Keyboard accessibility (Escape to close)
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      banner.style.transform = "translateY(-120%)";
      setTimeout(() => banner.remove(), 300);
      document.removeEventListener("keydown", onKeyDown);
    }
  };
  document.addEventListener("keydown", onKeyDown);

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      banner.style.transform = "translateY(-120%)";
      setTimeout(() => banner.remove(), 300);
      document.removeEventListener("keydown", onKeyDown);
    });
  }
}