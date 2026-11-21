import { imageSize } from "image-size";
import sharp from "sharp";

/** [width, height] of an image buffer. */
export function dimensions(bytes) {
  const { width, height } = imageSize(bytes);
  if (!width || !height) throw new Error("could not read image dimensions");
  return [width, height];
}

const WEBP_QUALITY = 78;

// Formats that a WebP copy would damage: GIFs (sharp keeps only the first frame) and SVGs (rasterised).
export const NO_WEBP = new Set(["gif", "svg"]);

/**
 * WebP copies of an image for srcset: one per configured width that is smaller than the original
 * (`<name>-<w>.webp`), plus one at the original width (`<name>.webp`) unless the original is already WebP
 * (that key is the original itself). Never upscales; honours EXIF orientation. GIF and SVG get none.
 * @returns {Promise<{file: string, width: number, bytes: Buffer}[]>}
 */
export async function webpVariants(bytes, name, widths, ext = "", quality = WEBP_QUALITY) {
  if (NO_WEBP.has(String(ext).toLowerCase())) return [];
  const upright = () => sharp(bytes).rotate(); // apply EXIF orientation, which WebP output would drop
  const { info } = await upright().toBuffer({ resolveWithObject: true });
  const original = info.width;
  const out = [];
  for (const w of [...widths].sort((a, b) => a - b)) {
    if (w >= original) continue;
    out.push({ file: `${name}-${w}.webp`, width: w, bytes: await upright().resize({ width: w }).webp({ quality }).toBuffer() });
  }
  if (String(ext).toLowerCase() !== "webp") {
    out.push({ file: `${name}.webp`, width: original, bytes: await upright().webp({ quality }).toBuffer() });
  }
  return out;
}

/** Size of a WeChat headline cover (≈2.35:1); the site's cover boxes use this ratio. */
export const WIDE = { width: 1280, height: 544 };

/** True for covers that would be cropped in a 2.35:1 box (WeChat's square secondary-article covers). */
export const needsWide = ([w, h]) => w / h < 2;

/**
 * A 1280×544 JPEG with the whole cover centred and the sides filled by a blurred, dimmed copy of it,
 * baked once so pages need no runtime blur or extra download.
 */
export async function wideCover(bytes) {
  const { width, height } = WIDE;
  const backdrop = await sharp(bytes).rotate().resize(width, height, { fit: "cover" }).blur(40).linear(0.42, 0).toBuffer();
  const front = await sharp(bytes).rotate().resize({ height, width: width - 64, fit: "inside" }).toBuffer();
  return sharp(backdrop).composite([{ input: front, gravity: "center" }]).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
}

/** A generated photo cropped (around its most salient region) to the site's 1280×544 cover. */
export async function siteCover(bytes) {
  return sharp(bytes).rotate().resize(WIDE.width, WIDE.height, { fit: "cover", position: sharp.strategy.attention }).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
}
