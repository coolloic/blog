// Pure search logic, shared by the search page and scripts/test-search.mjs.
import Fuse from "./vendor/fuse.basic.min.js";

const OPTIONS = {
  keys: [{ name: "title", weight: 3 }, { name: "summary", weight: 2 }, "content"],
  ignoreLocation: true,
  threshold: 0.3,
  minMatchCharLength: 1,
  includeScore: true,
};

// Each whitespace-separated term is searched on its own and the results are merged (a union):
// pages matching more terms rank first, then by average Fuse score. A mixed query like
// "agent 记忆" therefore still finds English notes that can never contain the Chinese term.
export function makeSearch(index) {
  const fuse = new Fuse(index, OPTIONS);
  return (query) => {
    const terms = String(query).trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const merged = new Map();
    for (const term of terms) {
      for (const r of fuse.search(term)) {
        const m = merged.get(r.item.permalink) ?? { item: r.item, hits: 0, score: 0 };
        m.hits += 1; m.score += r.score;
        merged.set(r.item.permalink, m);
      }
    }
    return [...merged.values()]
      .sort((a, b) => b.hits - a.hits || a.score / a.hits - b.score / b.hits)
      .map((m) => m.item);
  };
}
