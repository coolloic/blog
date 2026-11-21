import { score } from "./quiz-core.js";

const data = JSON.parse(document.getElementById("quiz-data").textContent);
const form = document.querySelector("[data-quiz-form]");
const out = document.querySelector("[data-quiz-result]");
const pct = (x) => `${Math.round(x * 100)}%`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function card(result) {
  // A 1080×1440 result card for sharing (long-press to save in WeChat). Drawn locally, nothing is uploaded.
  const c = document.createElement("canvas");
  c.width = 1080; c.height = 1440;
  const g = c.getContext("2d");
  g.fillStyle = "#0C1321"; g.fillRect(0, 0, 1080, 1440);
  g.fillStyle = "#FFB690"; g.font = "600 40px ui-monospace, monospace"; g.fillText(data.site, 90, 140);
  g.fillStyle = "#DCE2F6"; g.font = "800 76px system-ui, sans-serif"; g.fillText(data.title, 90, 260);
  g.font = "700 64px system-ui, sans-serif"; g.fillStyle = "#F97316"; g.fillText(data.results[result.tier].title, 90, 400);
  let y = 540;
  for (const b of ["alone", "assisted", "human"]) {
    g.fillStyle = "#E0C0B1"; g.font = "500 40px system-ui, sans-serif"; g.fillText(`${data.labels[b]}  ${pct(result.shares[b])}`, 90, y);
    g.fillStyle = "#232A39"; g.fillRect(90, y + 24, 900, 36);
    g.fillStyle = b === "human" ? "#4FDBC8" : b === "alone" ? "#F97316" : "#DDB7FF"; g.fillRect(90, y + 24, 900 * result.shares[b], 36);
    y += 170;
  }
  g.fillStyle = "#A78B7D"; g.font = "400 36px system-ui, sans-serif"; g.fillText(data.disclaimer_short, 90, 1180);
  g.fillStyle = "#DCE2F6"; g.font = "600 40px system-ui, sans-serif"; g.fillText(data.url_label, 90, 1300);
  return c.toDataURL("image/png");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const answers = Object.fromEntries(new FormData(form));
  const result = score(data.questions, answers, { entry: answers.entry === "1" });
  const r = data.results[result.tier];
  out.innerHTML = `
    <h2>${esc(r.title)}</h2>
    <div class="quiz-bars">${["alone", "assisted", "human"].map((b) => `
      <div class="quiz-bar quiz-bar--${b}"><span>${esc(data.labels[b])}</span><span class="quiz-bar__track"><span style="inline-size:${pct(result.shares[b])}"></span></span><b>${pct(result.shares[b])}</b></div>`).join("")}
    </div>
    <p>${esc(r.body)}</p>
    ${result.entry ? `<p class="quiz-entry">${esc(data.entry_note)}</p>` : ""}
    <p class="quiz-next"><a class="button" href="${esc(data.next_url)}">${esc(data.next_label)}</a></p>
    <figure class="quiz-card"><img alt="${esc(r.title)}" src="${card(result)}" width="1080" height="1440"><figcaption>${esc(data.save_hint)}</figcaption></figure>`;
  out.hidden = false;
  out.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
});
form.querySelector("[type=submit]").disabled = false;
