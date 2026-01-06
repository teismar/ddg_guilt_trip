import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    permissions: ['storage', 'webNavigation'],
    // We need to see URLs on DDG to catch the bang
    host_permissions: ['*://duckduckgo.com/*'] 
  }
});