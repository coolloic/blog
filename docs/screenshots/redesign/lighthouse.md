# Redesign acceptance (2026-11-21)

Lighthouse 12.2.1, mobile form factor with simulated throttling, against a local `hugo -D` build served by `python3 -m http.server`. That server does not gzip, so these are conservative.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 1.4 s | 0.001 | 0 ms |
| `/articles/sample-1/` | 100 | 100 | 100 | 100 | 1.4 s | 0.001 | 0 ms |
| `/posts/modern-web-guidelines/` | 100 | 100 | 100 | 100 | 1.5 s | 0.003 | 20 ms |
| `/search/` | 100 | 100 | 100 | 100 | 1.4 s | 0 | 0 ms |

Fixes made during acceptance (first run: home LCP 2.6 s, Accessibility 96; search LCP 5.6 s):

- The Google Fonts stylesheet no longer blocks rendering (`rel=preload` + `onload`, `<noscript>` fallback).
- The card rise-in moves cards but no longer fades them. Off-screen text was transparent, and contrast audits flagged it.
- The search form is visible from first paint. The search index loads only on focus, input or a `?q=` link.

Browser checks (Puppeteer, headless Chrome):

- 11 pages × {1280, 375} × {light, dark}: no horizontal scroll, the theme follows the system preference, no console errors. Screenshots are in this folder (1280 dark and 375 light).
- Edge fixture (an extremely long unbroken title, a long URL, wide code and a table, a broken R2 cover and a broken cover video) × {JS on, JS off} × {motion, reduced motion}, 37 assertions: no overflow, all content visible, the cover keeps its 16:9 or 21:9 box, and no video plays with JS off or reduced motion.

## After the final review

The first browser pass used Puppeteer's mobile emulation (`isMobile: true`). In that mode the layout viewport grows to fit overflowing content, so `scrollWidth <= innerWidth` could never fail. The review measured horizontal scroll at 375px on long-form pages: 639px on `/posts/modern-web-guidelines/` and 481px on `/wiki/concepts/agent-loop/`. Grid tracks now use `minmax(0, 1fr)`, and the layout check (`scripts/check-layout.mjs`, run by `check-site.sh`) uses a real 375px viewport with no emulation. All 44 page/width/theme combinations and all 37 edge-case assertions pass on that check.
