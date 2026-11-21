// Loads Waline only when the comment area is about to scroll into view (it is ~90KB gzipped).
// The client is vendored under /vendor/waline/ because public CDNs are unreliable in mainland China.
const box = document.querySelector("[data-waline-server]");
if (box) {
  const start = async () => {
    const base = box.dataset.walineAssets;
    const css = Object.assign(document.createElement("link"), { rel: "stylesheet", href: `${base}waline.css` });
    document.head.append(css);
    const { init } = await import(`${base}waline.js`);
    box.querySelector("[data-waline-loading]")?.remove();
    init({
      el: box.querySelector("[data-waline-el]"),
      serverURL: box.dataset.walineServer,
      path: box.dataset.walinePath,
      lang: "zh-CN",
      dark: 'html[data-theme="dark"]',
      login: "disable",
      meta: ["nick", "mail"],
      requiredMeta: ["nick"],
      wordLimit: 1000,
      pageSize: 10,
      // Extras that call third-party CDNs are off: they fail in mainland China.
      emoji: false, search: false, imageUploader: false, reaction: false,
      locale: { placeholder: box.dataset.walinePlaceholder },
    });
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); start(); }
    }, { rootMargin: "600px 0px" });
    io.observe(box);
  } else start();
}
