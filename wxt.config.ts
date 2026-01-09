import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: "DDG Guilt Trip",
    description: "Reminds you to try privacy alternatives when using specific DuckDuckGo !bangs like !g or !yt.",
    version: "0.1.0",
    permissions: ['storage', 'webNavigation'],
    // We need to see URLs on DDG to catch the bang
    host_permissions: ['*://duckduckgo.com/*'],
    icons: {
      16: '/icon/16.png',
      32: '/icon/32.png',
      48: '/icon/48.png',
      96: '/icon/96.png',
      128: '/icon/128.png'
    },
    browser_specific_settings: {
      gecko: {
        id: "ddg-guilt-trip@teismar.github.io",
        strict_min_version: "109.0",
        data_collection_permissions: {
             "required": ["none"]
        }
      }
    }
  }
});