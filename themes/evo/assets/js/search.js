import { makeSearch, meetsMinLength, debounce } from "./search-core.js";

const DEBOUNCE_MS = 250;

const form = document.querySelector("[data-search]");
const input = form.querySelector("input");
const list = document.querySelector("[data-search-results]");
const status = document.querySelector("[data-search-status]");
const idle = document.querySelector("[data-search-idle]");
const labels = JSON.parse(form.dataset.labels);
let search = null;

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const mark = (text, terms) => {
  let html = esc(text);
  for (const t of terms) html = html.replace(new RegExp(esc(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), (m) => `<mark>${m}</mark>`);
  return html;
};
const snippet = (doc, terms) => {
  const text = doc.content || doc.summary || "";
  const i = Math.max(0, ...terms.map((t) => text.toLowerCase().indexOf(t.toLowerCase())));
  const start = Math.max(0, i - 40);
  return (start ? "…" : "") + text.slice(start, start + 140) + "…";
};

function render() {
  const q = input.value.trim();
  const url = new URL(location.href);
  q ? url.searchParams.set("q", q) : url.searchParams.delete("q");
  history.replaceState(null, "", url);
  idle.hidden = Boolean(q);
  if (!q || !search) { list.innerHTML = ""; status.textContent = ""; return; }
  if (!meetsMinLength(q)) { list.innerHTML = ""; status.textContent = labels.short; return; }
  const terms = q.split(/\s+/);
  const results = search(q).slice(0, 30);
  status.textContent = results.length ? labels.count.replace("%d", results.length) : labels.none;
  list.innerHTML = results.map((d) => `<li class="result"><a href="${esc(d.permalink)}"><span class="badge badge--${esc(d.section)}">${esc(labels[d.section] || d.section)}</span><span class="result__title"${d.lang === "en" ? ' lang="en"' : ""}>${mark(d.title, terms)}</span><span class="result__snippet">${mark(snippet(d, terms), terms)}</span></a></li>`).join("");
}

// The index (~240KB gzipped) loads only when someone is about to search, so it never competes with first paint.
let loading = null;
const load = () => (loading ??= fetch(form.dataset.index).then((r) => r.json()).then((idx) => { search = makeSearch(idx); render(); }));
input.addEventListener("focus", load, { once: true });
input.addEventListener("pointerdown", load, { once: true });
const renderSoon = debounce(render, DEBOUNCE_MS);
input.addEventListener("input", () => { load(); renderSoon(); });
form.addEventListener("submit", (e) => e.preventDefault());
input.value = new URL(location.href).searchParams.get("q") || "";
if (input.value) load();
