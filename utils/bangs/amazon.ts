import { BangConfig } from '../models/bang';

export const amazon: BangConfig = {
  id: "amazon",
  trigger: "!a",
  name: "Amazon",
  matchPatterns: [
    "*://www.amazon.com/*", 
    "*://amazon.com/*"
  ],
  bannerMessage: "You used !a. Try searching for products on DuckDuckGo instead.",
  extractQuery: (url) => url.searchParams.get("k"),
  defaultBaseUrl: "https://duckduckgo.com",
  getRedirectUrl(query, baseUrl) {
    const base = baseUrl || this.defaultBaseUrl;
    return `${base}/?q=${encodeURIComponent(query)}&iax=shopping&ia=shopping`;
  }
};


