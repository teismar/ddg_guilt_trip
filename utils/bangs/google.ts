import { BangConfig } from '../models/bang';

export const google: BangConfig = {
  id: "google",
  trigger: "!g",
  name: "Google",
  matchPatterns: [
    "*://www.google.com/*", 
    "*://www.google.at/*", 
    "*://www.google.de/*",
    "*://google.com/*",
    "*://google.at/*"
  ],
  extractQuery: (url) => url.searchParams.get("q"),
  defaultBaseUrl: "https://duckduckgo.com",
  getRedirectUrl(query, baseUrl) {
    const base = baseUrl || this.defaultBaseUrl;
    return `${base}/?q=${encodeURIComponent(query)}`;
  }
};


