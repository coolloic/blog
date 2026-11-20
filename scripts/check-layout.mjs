// Real layout check: no horizontal scroll at 375px. Usage: node scripts/check-layout.mjs <baseURL> <path>...
// Mobile emulation is OFF on purpose: with isMobile the layout viewport grows to fit overflowing
// content, so scrollWidth always equals innerWidth and the check could never fail.
// Needs puppeteer: set PUPPETEER_MODULE to its ESM entry, or it is looked up in the npx cache.
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
let mod = process.env.PUPPETEER_MODULE;
if (!mod) {
  const npx = `${homedir()}/.npm/_npx`;
  for (const d of existsSync(npx) ? readdirSync(npx) : []) {
    const p = `${npx}/${d}/node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js`;
    if (existsSync(p)) { mod = p; break; }
  }
}
if (!mod) { console.log("puppeteer not found: run `npx -y @mermaid-js/mermaid-cli@11.4.1 --version` once, or set PUPPETEER_MODULE"); process.exit(2); }
const { default: puppeteer } = await import(mod);
const [, , base, ...paths] = process.argv;
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812 });
let bad = 0;
for (const path of paths) {
  await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  if (sw > 375) { bad++; console.log(`overflow ${path}: scrollWidth ${sw}`); }
}
await browser.close();
console.log(bad ? `${bad} pages overflow at 375px` : "layout ok"); process.exit(bad ? 1 : 0);
