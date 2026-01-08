import { BangConfig } from '../models/bang';

export const reddit: BangConfig = {
  id: "reddit",
  trigger: "!r",
  name: "Reddit",
  matchPatterns: [
    "*://*.reddit.com/*"
  ],
  bannerMessage: "You used !r. Try searching via DuckDuckGo site search for privacy.",
  extractQuery: (url) => url.searchParams.get("q"),
  defaultBaseUrl: "https://duckduckgo.com",
  getRedirectUrl(query, baseUrl) {
    const base = baseUrl || this.defaultBaseUrl;
    return `${base}/?q=site%3Areddit.com+${encodeURIComponent(query)}`;
  }
};


