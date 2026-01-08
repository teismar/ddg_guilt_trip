# Contributing to DDG Guilt Trip

Thank you for your interest in contributing! I welcome bug reports, feature requests, and pull requests.

## How to Contribute

1.  **Fork the repository** and create your branch from `main`.
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Make your changes**. If you are adding a new bang support:
    *   Create a new file in `utils/bangs/` (e.g., `twitter.ts`).
    *   Implement the `BangConfig` interface.
    *   Export it in `utils/bangs/index.ts`.
4.  **Test your changes**:
    ```bash
    pnpm dev
    ```
4. **Update documentation** if necessary (e.g., README.md, CHANGELOG.md).
5.  **Submit a Pull Request**. Please provide a clear description of your changes.

## Coding Standards

*   Use TypeScript.
*   Follow the existing code style.
*   Ensure the extension builds without errors.

## Adding New Bangs

When adding a new bang, please try to find a privacy-friendly alternative to redirect to (e.g., Nitter for Twitter, Bibliogram for Instagram) if possible. If no good alternative exists, a DuckDuckGo "site:" search is a good fallback.
