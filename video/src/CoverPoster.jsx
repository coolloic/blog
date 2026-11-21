// 1280×544 "real photo + 大字报" site cover: the photo (no text) with a two-line headline set in Noto Sans SC
// Black — line 1 white, line 2 orange — and a subline whose {braced} words are orange. Text is set here, never
// drawn by the image model, so every character is right.
import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansSC";
import { palette } from "./theme.js";

const { fontFamily } = loadFont("normal", { weights: ["900", "700"], ignoreTooManyRequestsWarning: true });

const Rough = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <filter id="rough"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" /></filter>
  </svg>
);

const Sub = ({ text, accent }) => (
  <>{String(text).split(/(\{[^}]+\})/).map((part, i) =>
    part.startsWith("{") ? <span key={i} style={{ color: accent }}>{part.slice(1, -1)}</span> : <span key={i}>{part}</span>)}</>
);

// Watermark: the horizontal logo (same layout as themes/evo/layouts/_partials/logo.html), light colours for a dark photo.
const Logo = ({ height = 54 }) => (
  <svg viewBox="70 68 1290 460" height={height} style={{ display: "block", filter: "drop-shadow(0 2px 6px rgba(0,0,0,.6))" }}>
    <image href={staticFile("images/logo-mark.png")} x="79" y="77" width="442" height="442" />
    <text x="600" y="300" fontWeight="900" fontSize="170" fill="#FFFFFF" fontFamily={fontFamily}><tspan fill="#8FA6FF">AI</tspan>调研员</text>
    <rect x="606" y="350" width="120" height="12" rx="6" fill="#FFC93C" />
    <text x="606" y="450" fontWeight="700" fontSize="58" letterSpacing="4" fill="#D5DBEE" fontFamily={fontFamily}>每一个脑洞，都有数据撑腰</text>
  </svg>
);

export const CoverPoster = ({ photo, line1, line2, sub, tokens, focus = "right", watermark = true }) => {
  const c = palette(tokens);
  const big = { fontFamily, fontWeight: 900, fontSize: 118, lineHeight: 1.08, letterSpacing: "-0.02em", filter: "url(#rough)",
    textShadow: "0 6px 18px rgba(0,0,0,.55), 0 2px 0 rgba(0,0,0,.6)", transform: "skewX(-6deg)", transformOrigin: "left" };
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Rough />
      <Img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${focus} center` }} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(5,8,14,.86) 0%, rgba(5,8,14,.62) 38%, rgba(5,8,14,0) 66%)" }} />
      {watermark !== false && <div style={{ position: "absolute", top: 26, left: 52, opacity: 0.92 }}><Logo /></div>}
      <AbsoluteFill style={{ padding: "0 0 0 58px", justifyContent: "center" }}>
        <div style={{ ...big, color: "#FFFFFF" }}>{line1}</div>
        <div style={{ ...big, color: c["accent-fill"] }}>{line2}</div>
        {sub && <div style={{ marginTop: 26, maxWidth: 640, fontFamily, fontWeight: 700, fontSize: 34, lineHeight: 1.4, color: "#fff", textShadow: "0 2px 10px rgba(0,0,0,.7)" }}><Sub text={sub} accent={c["accent-fill"]} /></div>}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
