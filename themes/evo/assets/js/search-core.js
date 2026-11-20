// Pure search logic, shared by the search page and scripts/test-search.mjs.
import Fuse from "./vendor/fuse.basic.min.js";

const OPTIONS = {
  keys: [{ name: "title", weight: 3 }, { name: "summary", weight: 2 }, "content"],
  ignoreLocation: true,
  threshold: 0.3,
  minMatchCharLength: 1,
  includeScore: true,
};

// Each whitespace-separated term is searched on its own and the results are intersected,
// so a mixed query like "agent 记忆" works even though Fuse scores whole strings.
export function makeSearch(index) {
  const fuse = new Fuse(index, OPTIONS);
  return (query) => {
    const terms = String(query).trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    let best = null;
    for (const term of terms) {
      const hits = new Map(fuse.search(term).map((r) => [r.item.permalink, r]));
      if (!best) { best = hits; continue; }
      for (const [k, r] of best) {
        const h = hits.get(k);
        if (!h) best.delete(k); else r.score += h.score;
      }
    }
    return [...best.values()].sort((a, b) => a.score - b.score).map((r) => r.item);
  };
}
