import { BangConfig } from '../models/bang';

export const github: BangConfig = {
  id: "github",
  trigger: "!gh",
  name: "GitHub",
  matchPatterns: [
    "*://www.github.com/*", 
    "*://github.com/*"
  ],
  extractQuery: (url) => url.searchParams.get("q"),
  // Fallback to DuckDuckGo limited to GitHub site (roughly same effect but private)
  defaultBaseUrl: "https://duckduckgo.com",
  getRedirectUrl(query, baseUrl) {
    const base = baseUrl || this.defaultBaseUrl;
    return `${base}/?q=site%3Agithub.com+${encodeURIComponent(query)}`;
  }
};


