// Draws every ```mermaid block on the page, and redraws on light/dark toggle.
// Each diagram includes this file as a module; browsers evaluate a module URL once per page.
import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs";
const root = document.documentElement;
const nodes = [...document.querySelectorAll("pre.mermaid")];
nodes.forEach((el) => (el.dataset.src = el.textContent));
const isDark = () =>
  root.dataset.theme === "dark" ||
  (!root.dataset.theme && document.body.classList.contains("dark"));
// deterministicIds: the default time-based IDs collide when several diagrams render
// in the same millisecond, which piles every diagram into the first SVG.
async function draw() {
  mermaid.initialize({ startOnLoad: false, securityLevel: "strict", deterministicIds: true, theme: isDark() ? "dark" : "default" });
  nodes.forEach((el) => { el.removeAttribute("data-processed"); el.textContent = el.dataset.src; });
  await mermaid.run({ nodes });
}
let queue = Promise.resolve();
const render = () => (queue = queue.then(draw, draw));
render();
new MutationObserver(render).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
