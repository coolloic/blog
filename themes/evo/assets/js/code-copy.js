// Copy buttons on code blocks. Buttons ship hidden and only appear when this script runs.
for (const btn of document.querySelectorAll("[data-copy]")) {
  const code = btn.closest(".code-block")?.querySelector("pre code, pre");
  if (!code || !navigator.clipboard) continue;
  const label = btn.textContent;
  btn.hidden = false;
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(code.innerText); btn.textContent = btn.dataset.copied || "✓"; }
    catch { return; }
    setTimeout(() => (btn.textContent = label), 1500);
  });
}
