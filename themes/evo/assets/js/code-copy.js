// Copy buttons: on code blocks (copies the code) or with a value, data-copy="text" (copies that).
// Buttons ship hidden and only appear when this script runs.
for (const btn of document.querySelectorAll("[data-copy]")) {
  const code = btn.closest(".code-block")?.querySelector("pre code, pre");
  const text = () => btn.dataset.copy || code?.innerText;
  if (!text() || !navigator.clipboard) continue;
  const label = btn.textContent;
  btn.hidden = false;
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(text()); btn.textContent = btn.dataset.copied || "✓"; }
    catch { return; }
    setTimeout(() => (btn.textContent = label), 1500);
  });
}
