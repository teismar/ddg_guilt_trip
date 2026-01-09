# DDG Guilt Trip

A browser extension that mildly "guilts" you when you use DuckDuckGo bangs (like `!g`, `!yt`, `!a`) to jump to non-private platforms. It intercepts the request, suggests a privacy-friendly alternative, or lets you proceed if you must.

<div align="center">

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Coming_Soon-blue?style=for-the-badge&logo=google-chrome)](https://chrome.google.com/webstore/detail/YOUR_ID_HERE)
[![Firefox Add-on](https://img.shields.io/badge/Firefox_Add--ons-Pending-orange?style=for-the-badge&logo=firefox-browser)](https://addons.mozilla.org/firefox/addon/ddg-guilt-trip/)

</div>

## Features

- **Bang Interception**: Detects when you use bangs for Google (`!g`), YouTube (`!yt`), Amazon (`!a`), Reddit (`!r`), GitHub (`!gh`), and Wikipedia (`!w`).
- **Privacy Redirects**: Attempts to redirect your query to a privacy front-end (e.g., Piped for YouTube, Wikiless for Wikipedia) instead of the big-tech platform.
- **Strict Mode**: Skip the guilt banner and automatically redirect to the privacy alternative immediately.
- **Custom Instances**: Edit the redirect URL for services (e.g., switch which Piped instance you use).
- **Privacy Stats**: Tracks how many times you've avoided Big Tech services in the last 30 days.
- **Snooze**: Temporarily disable the extension for 30 minutes.

## Development

```bash
pnpm install
pnpm dev
```

## Supported Bangs

| Bang | Target | Privacy Alternative (Default) |
|------|--------|---------------------|
| `!g` | Google | DuckDuckGo |
| `!yt`| YouTube| Piped |
| `!a` | Amazon | DDG Products |
| `!gh`| GitHub | DDG Site Search |
| `!w` | Wikipedia| Wikiless |
| `!r` | Reddit | DDG Site Search |
