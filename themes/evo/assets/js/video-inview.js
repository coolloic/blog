// Cover loops (Remotion) on the article page. The WebP cover paints first (it is the LCP); after the page has
// loaded, a muted <video> is created over it while the cover is on screen. Never with reduced motion or
// Save-Data; pauses off screen. Cards never carry videos.
const covers = document.querySelectorAll("[data-video]");
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const saveData = navigator.connection?.saveData;
function start() {
  if (!covers.length || reduce.matches || saveData || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const { target: box, isIntersecting } of entries) {
      let v = box.querySelector("video");
      if (isIntersecting && !reduce.matches) {
        if (!v) {
          v = Object.assign(document.createElement("video"), { muted: true, loop: true, playsInline: true, src: box.dataset.video });
          v.className = "cover__media cover__video";
          v.setAttribute("aria-hidden", "true");
          v.addEventListener("playing", () => v.classList.add("is-playing"), { once: true });
          box.append(v);
        }
        v.play().catch(() => {});
      } else v?.pause();
    }
  }, { threshold: 0.25 });
  covers.forEach((c) => io.observe(c));
  reduce.addEventListener("change", () => reduce.matches && covers.forEach((c) => c.querySelector("video")?.pause()));
}
if (document.readyState === "complete") start(); else addEventListener("load", start, { once: true });
