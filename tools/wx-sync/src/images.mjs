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
export async function webpVariants(bytes, name, widths, ext = "") {
  if (NO_WEBP.has(String(ext).toLowerCase())) return [];
  const upright = () => sharp(bytes).rotate(); // apply EXIF orientation, which WebP output would drop
  const { info } = await upright().toBuffer({ resolveWithObject: true });
  const original = info.width;
  const out = [];
  for (const w of [...widths].sort((a, b) => a - b)) {
    if (w >= original) continue;
    out.push({ file: `${name}-${w}.webp`, width: w, bytes: await upright().resize({ width: w }).webp({ quality: WEBP_QUALITY }).toBuffer() });
  }
  if (String(ext).toLowerCase() !== "webp") {
    out.push({ file: `${name}.webp`, width: original, bytes: await upright().webp({ quality: WEBP_QUALITY }).toBuffer() });
  }
  return out;
}
