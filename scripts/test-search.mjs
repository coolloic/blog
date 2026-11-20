// Search behaviour tests against a built index.json. Usage: node scripts/test-search.mjs <out>/index.json
import { readFileSync } from "node:fs";
import { makeSearch, meetsMinLength, debounce } from "../themes/evo/assets/js/search-core.js";
const idx = JSON.parse(readFileSync(process.argv[2], "utf8"));
const search = makeSearch(idx);
const urls = (q) => search(q).map((d) => new URL(d.permalink, "http://x").pathname);
const cases = [
  ["MCP finds the wiki concept", () => urls("MCP").some((u) => u.endsWith("/wiki/concepts/model-context-protocol/"))],
  ["Chinese term finds a sample article", () => urls("示例").some((u) => u.endsWith("/articles/sample-1/"))],
  ["mixed zh/en query reaches both sections", () => { const u = urls("agent 示例"); return u.some((x) => x.includes("/articles/")) && u.some((x) => x.includes("/wiki/") || x.includes("/posts/")); }],
  ["pages matching every term rank first", () => urls("agent 示例")[0].includes("/articles/sample-")],
  ["a Chinese term absent from English notes does not hide them", () => urls("agent 记忆").some((x) => x.includes("/wiki/") || x.includes("/posts/"))],
  ["empty query returns nothing", () => search("").length === 0 && search("   ").length === 0],
  ["Latin queries need 3 characters", () => !meetsMinLength("MC") && meetsMinLength("MCP") && search("MC").length === 0],
  ["queries with Chinese need 2 characters", () => !meetsMinLength("幻") && meetsMinLength("示例") && search("幻").length === 0],
  ["spaces do not count toward the minimum", () => !meetsMinLength(" M C ") && meetsMinLength("a gent")],
];
let failed = 0;
// debounce: five rapid calls run once, with the last argument, after the wait
{
  const seen = [];
  const f = debounce((x) => seen.push(x), 50);
  for (const x of [1, 2, 3, 4, 5]) f(x);
  await new Promise((r) => setTimeout(r, 120));
  const ok = seen.length === 1 && seen[0] === 5;
  console.log(`${ok ? "ok" : "FAIL"} debounce collapses rapid calls`); if (!ok) failed++;
}
for (const [name, fn] of cases) {
  let ok = false; try { ok = fn(); } catch (e) { console.log("error:", e.message); }
  console.log(`${ok ? "ok" : "FAIL"} ${name}`); if (!ok) failed++;
}
process.exit(failed ? 1 : 0);
