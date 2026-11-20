// Search behaviour tests against a built index.json. Usage: node scripts/test-search.mjs <out>/index.json
import { readFileSync } from "node:fs";
import { makeSearch } from "../themes/evo/assets/js/search-core.js";
const idx = JSON.parse(readFileSync(process.argv[2], "utf8"));
const search = makeSearch(idx);
const urls = (q) => search(q).map((d) => new URL(d.permalink, "http://x").pathname);
const cases = [
  ["MCP finds the wiki concept", () => urls("MCP").some((u) => u.endsWith("/wiki/concepts/model-context-protocol/"))],
  ["Chinese term finds a sample article", () => urls("示例").some((u) => u.endsWith("/articles/sample-1/"))],
  ["mixed zh/en query matches", () => urls("agent 示例").length > 0],
  ["mixed query is an intersection", () => urls("agent 示例").every((u) => u.includes("/articles/sample-"))],
  ["empty query returns nothing", () => search("").length === 0 && search("   ").length === 0],
];
let failed = 0;
for (const [name, fn] of cases) {
  let ok = false; try { ok = fn(); } catch (e) { console.log("error:", e.message); }
  console.log(`${ok ? "ok" : "FAIL"} ${name}`); if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
