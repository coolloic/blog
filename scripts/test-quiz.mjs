// Scoring tests for the job-check quiz. Usage: node scripts/test-quiz.mjs
import { score } from "../themes/evo/assets/js/quiz-core.js";
const Q = [
  { id: "a1", bucket: "alone" }, { id: "a2", bucket: "alone" }, { id: "a3", bucket: "alone" },
  { id: "b1", bucket: "assisted" }, { id: "b2", bucket: "assisted" },
  { id: "c1", bucket: "human" }, { id: "c2", bucket: "human" }, { id: "c3", bucket: "human" },
];
const all = (v) => Object.fromEntries(Q.map((q) => [q.id, v]));
const only = (bucket, v) => Object.fromEntries(Q.map((q) => [q.id, q.bucket === bucket ? v : 0]));
const cases = [
  ["mostly AI-doable tasks → high", () => score(Q, only("alone", 2)).tier === "high"],
  ["mostly in-person/trust tasks → low", () => score(Q, only("human", 2)).tier === "low"],
  ["balanced answers → mid", () => score(Q, all(1)).tier === "mid"],
  ["shares are 0..1 per bucket", () => { const s = score(Q, all(2)).shares; return s.alone === 1 && s.assisted === 1 && s.human === 1; }],
  ["unanswered questions count as 很少 (0)", () => score(Q, {}).shares.alone === 0],
  ["entry-level flag is passed through", () => score(Q, all(1), { entry: true }).entry === true],
  ["high exposure but strong human part is not high", () => score(Q, { ...only("alone", 2), c1: 2, c2: 2, c3: 2 }).tier !== "high"],
];
let failed = 0;
for (const [name, fn] of cases) { let ok = false; try { ok = fn(); } catch (e) { console.log("error:", e.message); } console.log(`${ok ? "ok" : "FAIL"} ${name}`); if (!ok) failed++; }
process.exit(failed ? 1 : 0);
