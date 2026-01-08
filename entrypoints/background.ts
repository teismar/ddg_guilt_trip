// entrypoints/background.ts
import { SUPPORTED_BANGS } from '../utils/bangs';
import { logger } from '../utils/logger';

export default defineBackground(() => {
  // Listen for any navigation to DuckDuckGo
  browser.webNavigation.onBeforeNavigate.addListener(async (details) => {
    try {
      const url = new URL(details.url);
      const query = url.searchParams.get("q");

      if (!query) return;

      const data = await browser.storage.local.get(["enabledBangs", "snoozeUntil"]);
      
      // Check Snooze
      if (data.snoozeUntil && Date.now() < data.snoozeUntil) {
        return;
      }
      
      const enabledBangs = data.enabledBangs || {};
      const isEnabled = (id: string) => enabledBangs[id] !== false;

      for (const bang of SUPPORTED_BANGS) {
        if (!isEnabled(bang.id)) continue;

        const trigger = bang.trigger.toLowerCase();
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.startsWith(trigger + " ") || lowerQuery === trigger || lowerQuery.includes(" " + trigger)) {
          logger.log(`Detected ${trigger} usage. Setting flag.`);
          await browser.storage.local.set({ 
            lastBang: { id: bang.id, timestamp: Date.now() }
          });
          break;
        }
      }
    } catch (e) {
      // Ignore invalid URLs
    }
  }, {
    url: [{ hostContains: 'duckduckgo.com' }] // Only run on DDG
  });
});