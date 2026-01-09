<div align="center">

<img src="public/logo.svg" alt="DDG Guilt Trip Logo" width="128">

# DDG Guilt Trip

A browser extension that mildly "guilts" you when you use DuckDuckGo bangs (like `!g`, `!yt`, `!a`) to jump to non-private platforms. It intercepts the request, suggests a privacy-friendly alternative, or lets you proceed if you must.

Read my blog post about why I built this: [Stop Auto-Piloting to Google](https://threattales.com/posts/ddgguiltrip/)

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Coming_Soon-blue?style=for-the-badge&logo=google-chrome)](https://chrome.google.com/webstore/detail/YOUR_ID_HERE)
[![Firefox Add-on](https://img.shields.io/badge/Firefox_Add--ons-Pending-orange?style=for-the-badge&logo=firefox-browser)](https://addons.mozilla.org/firefox/addon/ddg-guilt-trip/)
[![Microsoft Edge Add-ons](https://img.shields.io/badge/Microsoft_Edge-Coming_Soon-0078D7?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAALcUExURTTB7zTB7TPB60XUkEzZhEzZhTXB8DTB7k/ah07bgjXB71TefxFxsSCbqQxOkTHGiA1VnDPHdhRnkT7HXyGKgRNclhZhjwB51BBGhAB41BBIiBBHhQ9KixBLjA9HhS/D3i/C3y7C2yzD1izD0SzDyS3EwC3EtzLHqznLnjTB7TPB6THC5DbKqj/QmUbVjTXB8TXB70zZh1LdfzXB8DXC8FnieV3ldDPE6Syw3GLocSOmzhSCwBiDr1/mcQ+DwxOIzxeT2RJysCKerFfgcgd/0g1prApHgCq2oTDEmk/abwV/1wtMiwxNjzLGiDHFh0jVaAR91gxPkg1VnTPGdkDPX0PRXwJ71Q1Vng5UnDTIbDTGZTXHXTbHWDjJVT7VUQF61QJ71Q5UnA5TmgAeqgAAwg09gxBEeQB41AF51A5TmQ9Rlw9QlQ9OkhBNkBBKjBBGggwwXAB41AF51BBKixBGgw9OkhBMjg9JiQB30wF51QJ71gRyxwlgrAxWnA5RlQ5OkA9Mjg9JiS/C4C7C3C3D2CzD0yzDyy7FvjTC7jTC6zLD5zDD4SzD1yvD0TDGwTrNqUTTlTS/7S+04iqq1ymr0yu11y7A2y3E2CvD0jHHwD3PpkjWkVLdghuMwRN8txJ8uBN9txZ/sx2OtyezyizEzjLIuz7QokrYjlXffl/mdBKAvQ1+xhCJ1RKP2hSR2hWP1CezvDLItD3PnUnXi1TefV3ldAqA0A2J2g+M3BGP3RKO2TDEqTvNl0XUiE/afFbfdQiD2AqG2QyJ2w6K2TfKjkHQgkjWeU7ZcgaB1wqH2gt1vzTHgDvMd0LRcEbTagV+1gaA1wpgpjPGczTGbDbIZjvLYQN81gZ+1AlZngxSmAV91Qlbog1SmA1VngJ61QN91gdlsgxRlQ5UmwJ71QR1ywpVmw1TmQ5UnA5TmQ9Rlw9QlRBOkhBNkAVvwgpWnA5Rlg5SmA9Rlg9QlP///4cVl9oAAACCdFJOUwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFSajk+/zpuGQTF5Lv+bs7F7HhRQWSzyRJ74+o6+vi5KcvL6f9++svLuvy+ugnMeul4vxefrgkpc0lJnibmmcUR+7FQwUDGQIEkPC0fmt7sHYBFq+0Ge6RFwRHpeL6+uOmRwXP7QasAAAAAWJLR0TzrLG+7gAAAAd0SU1FB+oBCQAZFc2+uY0AAAEbSURBVBjTARAB7/4AAAECHyAhIiMkJSYnKAMEBQAGBykqK4KDhIWGhywtLggJAAovMIiJiouDjI2Oj5AxMgsAMzSRkpOUlZaXmJmam5w1NgA3OJ2en6ChoqOkpaanqKk5ADqqq6ytrq87PLCxsrO0tT0APra3uLm6P0BBQru8vb6/QwBEwMHCw0VGDA1HSMTFxsdJAErIwMnKS0wOD01Oy8zNzk8AUM/QwNFRUhARU9LT1NVUVQBW1s/X2NlXWBJZWltcXV4TAF9g1trb3N1hYmMUFRZkZWYAZ2je3+Dh3eJpamtsbW5vcAAXcXLj5OXm5+jp6uvsc3QYABcZcWhg7e7v8PHydXZ3GhsAGRkZeHl6e3x9fn+AgRwdHt/0ePwMxN8XAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI2LTAxLTA5VDAwOjIzOjUyKzAwOjAwGNCvewAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNi0wMS0wOVQwMDoyMzo1MiswMDowMGmNF8cAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjYtMDEtMDlUMDA6MjU6MjArMDA6MDCu3F5vAAAAAElFTkSuQmCC)](https://microsoftedge.microsoft.com/addons/detail/YOUR_ID_HERE)

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

## Screenshot

![Extension Screenshot](gh_assets/screenshot.png)
