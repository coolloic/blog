// 1080×1920 caption-only explainer for 视频号 / 小红书. Scenes come from lib/story.mjs timeline().
// Text stays inside y 220–1500 so the platforms' own buttons and captions do not cover it.
import { AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme.js";
import { fonts } from "./fonts.js";

const Enter = ({ children, delay = 0, y = 40 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * y}px)` }}>{children}</div>;
};

const Backdrop = ({ c }) => (
  <AbsoluteFill style={{ backgroundColor: c.bg, backgroundImage: `radial-gradient(900px 700px at 85% 8%, ${c["accent-fill"]}2e, transparent 70%), radial-gradient(800px 800px at 0% 95%, ${c.accent3}26, transparent 70%)` }} />
);

const Chrome = ({ c, category, scenes, durationInFrames }) => {
  const frame = useCurrentFrame();
  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, height: 10, width: `${(frame / durationInFrames) * 100}%`, background: c["accent-fill"] }} />
      <div style={{ position: "absolute", top: 110, left: 80, right: 80, display: "flex", alignItems: "center", gap: 20, fontFamily: fonts.sans, fontWeight: 700, fontSize: 38, color: c.text }}>
        <span style={{ width: 22, height: 22, borderRadius: 999, background: c["accent-fill"] }} />AI调研员
        {category && <span style={{ marginLeft: "auto", fontSize: 30, fontWeight: 500, color: c.accent3, border: `2px solid ${c.accent3}66`, borderRadius: 8, padding: "6px 18px" }}>{category}</span>}
      </div>
      <div style={{ position: "absolute", top: 1560, left: 80, display: "flex", gap: 14 }}>
        {scenes.filter((s) => s.kind === "point").map((s) => (
          <span key={s.index} style={{ width: frame >= s.from ? 56 : 18, height: 10, borderRadius: 999, background: frame >= s.from ? c["accent-fill"] : c.border }} />
        ))}
      </div>
    </>
  );
};

const Hook = ({ c, text }) => (
  <AbsoluteFill style={{ padding: "0 80px", justifyContent: "center" }}>
    <Enter><div style={{ fontFamily: fonts.sans, fontSize: 40, fontWeight: 700, color: c.accent2, letterSpacing: 4, marginBottom: 36 }}>一分钟看懂</div></Enter>
    <Enter delay={6}><div style={{ fontFamily: fonts.serif, fontSize: 104, fontWeight: 900, lineHeight: 1.25, color: c.text, textWrap: "balance" }}>{text}</div></Enter>
    <Enter delay={14}><div style={{ marginTop: 48, width: 180, height: 12, borderRadius: 999, background: c["accent-fill"] }} /></Enter>
  </AbsoluteFill>
);

const Point = ({ c, text, index, image, imageBase }) => (
  <AbsoluteFill style={{ padding: "300px 80px 0" }}>
    <Enter><div style={{ fontFamily: fonts.display, fontSize: 150, fontWeight: 700, lineHeight: 1, color: c["accent-fill"] }}>{String(index).padStart(2, "0")}</div></Enter>
    <Enter delay={5}><div style={{ marginTop: 36, fontFamily: fonts.sans, fontSize: 74, fontWeight: 700, lineHeight: 1.4, color: c.text, textWrap: "balance" }}>{text}</div></Enter>
    {image && (
      <Enter delay={12} y={80}>
        <Img src={`${imageBase}/${image}`} style={{ marginTop: 56, width: "100%", maxHeight: 720, objectFit: "contain", borderRadius: 16, border: `2px solid ${c.border}`, background: c.surface }} />
      </Enter>
    )}
  </AbsoluteFill>
);

const Takeaway = ({ c, text }) => (
  <AbsoluteFill style={{ padding: "0 80px", justifyContent: "center" }}>
    <Enter>
      <div style={{ background: c.surface, border: `3px solid ${c["accent-fill"]}`, borderRadius: 16, padding: "64px 56px" }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 40, fontWeight: 700, color: c.accent2, marginBottom: 28 }}>划重点</div>
        <div style={{ fontFamily: fonts.serif, fontSize: 84, fontWeight: 900, lineHeight: 1.35, color: c.text, textWrap: "balance" }}>{text}</div>
      </div>
    </Enter>
  </AbsoluteFill>
);

const Outro = ({ c, title }) => (
  <AbsoluteFill style={{ padding: "0 80px", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
    <Enter><Img src={staticFile("images/wechat-qr.png")} style={{ width: 360, height: 360, borderRadius: 16, background: "#fff", padding: 16 }} /></Enter>
    <Enter delay={6}><div style={{ marginTop: 56, fontFamily: fonts.sans, fontSize: 64, fontWeight: 700, color: c.text }}>关注「AI调研员」</div></Enter>
    <Enter delay={10}><div style={{ marginTop: 24, fontFamily: fonts.sans, fontSize: 40, fontWeight: 500, color: c.muted }}>全文：《{title}》</div></Enter>
    <Enter delay={14}><div style={{ marginTop: 40, fontFamily: fonts.display, fontSize: 56, fontWeight: 700, color: c.accent }}>aitanyan.com</div></Enter>
  </AbsoluteFill>
);

export const Vertical = ({ tokens, scenes, durationInFrames, title, shortTitle, category, imageBase }) => {
  const c = palette(tokens);
  return (
    <AbsoluteFill style={{ fontFamily: fonts.sans }}>
      <Backdrop c={c} />
      {scenes.map((s) => (
        <Sequence key={`${s.kind}${s.index ?? ""}`} from={s.from} durationInFrames={s.durationInFrames}>
          {s.kind === "hook" && <Hook c={c} text={s.text} />}
          {s.kind === "point" && <Point c={c} {...s} imageBase={imageBase} />}
          {s.kind === "takeaway" && <Takeaway c={c} text={s.text} />}
          {s.kind === "outro" && <Outro c={c} title={shortTitle || title} />}
        </Sequence>
      ))}
      <Chrome c={c} category={category} scenes={scenes} durationInFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
