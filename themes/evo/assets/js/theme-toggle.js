// Light/dark toggle. The inline script in <head> sets the initial data-theme before first paint.
const root = document.documentElement;
const sync = (btn) => btn.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
for (const btn of document.querySelectorAll("[data-theme-toggle]")) {
  sync(btn);
  btn.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
    sync(btn);
  });
}
