export interface BangConfig {
  id: string;
  trigger: string;
  name: string;
  matchPatterns: string[];
  /**
   * Custom message for the banner. 
   * Defaults to "You used {trigger}. Are you sure you couldn't find it on DuckDuckGo?"
   */
  bannerMessage?: string; 
  /**
   * Extract the search query from the current page URL.
   */
  extractQuery: (url: URL) => string | null;
  /**
   * The default base URL for the privacy alternative (e.g. "https://piped.video")
   */
  defaultBaseUrl: string;
  /**
   * Generate the URL to redirect the user to.
   * @param query The search query
   * @param baseUrl Optional custom base URL to override the default
   */
  getRedirectUrl: (query: string, baseUrl?: string) => string;
}
