// 1280×544 silent loop for the site's cover slot: a slow push-in/out on the cover and one light sweep.
// Frame 0 and the last frame match, so it loops without a seam.
import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig } from "remotion";
import { palette } from "./theme.js";

export const CoverLoop = ({ cover, tokens }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const c = palette(tokens);
  const t = frame / durationInFrames; // 0 → 1
  const scale = 1 + 0.03 * (1 - Math.cos(2 * Math.PI * t)) / 2;
  const sweep = -40 + 180 * t; // percent; starts and ends off-frame
  return (
    <AbsoluteFill style={{ backgroundColor: c.bg, overflow: "hidden" }}>
      <Img src={cover} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }} />
      <AbsoluteFill style={{ background: `linear-gradient(100deg, transparent ${sweep - 12}%, ${c["accent-fill"]}22 ${sweep}%, #ffffff18 ${sweep + 3}%, transparent ${sweep + 14}%)`, mixBlendMode: "screen" }} />
    </AbsoluteFill>
  );
};
