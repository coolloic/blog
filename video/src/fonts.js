// Chinese fonts for the vertical video (OFL, from Google Fonts at render time). Only the weights used.
import { loadFont as loadSans } from "@remotion/google-fonts/NotoSansSC";
import { loadFont as loadSerif } from "@remotion/google-fonts/NotoSerifSC";
import { loadFont as loadCrimson } from "@remotion/google-fonts/CrimsonPro";

const quiet = { ignoreTooManyRequestsWarning: true };
export const fonts = {
  sans: `${loadSans("normal", { weights: ["500", "700"], ...quiet }).fontFamily}, "PingFang SC", sans-serif`,
  serif: `${loadSerif("normal", { weights: ["900"], ...quiet }).fontFamily}, "Songti SC", serif`,
  display: `${loadCrimson("normal", { weights: ["700"], subsets: ["latin"] }).fontFamily}, Georgia, serif`,
};
