import { BangConfig } from '../models/bang';

export const wikipedia: BangConfig = {
  id: "wikipedia",
  trigger: "!w",
  name: "Wikipedia",
  matchPatterns: [
    "*://*.wikipedia.org/*"
  ],
  bannerMessage: "You used !w. Try Wikiless, a private Wikipedia frontend.",
  extractQuery: (url) => {
    const search = url.searchParams.get("search");
    if (search) return search;
    const match = url.pathname.match(/\/wiki\/(.+)$/);
    return match ? decodeURIComponent(match[1]) : null;
  },
  // Fallback to Wikiless
  defaultBaseUrl: "https://wikiless.tiekoetter.com",
  getRedirectUrl(query, baseUrl) {
    const base = baseUrl || this.defaultBaseUrl;
    return `${base}/w/index.php?search=${encodeURIComponent(query)}`;
  }
};


