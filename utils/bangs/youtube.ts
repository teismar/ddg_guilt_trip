import { BangConfig } from '../models/bang';

export const youtube: BangConfig = {
  id: "youtube",
  trigger: "!yt",
  name: "YouTube",
  matchPatterns: [
    "*://www.youtube.com/*", 
    "*://youtube.com/*"
  ],
  bannerMessage: "You used !yt. Want to watch this more privately?",
  extractQuery: (url) => url.searchParams.get("search_query"),
  // Fallback to Piped (Privacy front-end for YouTube)
  defaultBaseUrl: "https://piped.private.coffee",
  getRedirectUrl(query, baseUrl) {
    const base = baseUrl || this.defaultBaseUrl;
    return `${base}/results?search_query=${encodeURIComponent(query)}`;
  }
};


