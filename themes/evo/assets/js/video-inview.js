// Cover videos (Remotion loops) play only while on screen. With reduced motion they never play: the poster stays.
const videos = document.querySelectorAll("video[data-autoplay-in-view]");
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
if (videos.length && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const { target: v, isIntersecting } of entries) {
      if (isIntersecting && !reduce.matches) { v.preload = "auto"; v.play().catch(() => {}); }
      else v.pause();
    }
  }, { threshold: 0.25 });
  videos.forEach((v) => io.observe(v));
  reduce.addEventListener("change", () => reduce.matches && videos.forEach((v) => v.pause()));
}
