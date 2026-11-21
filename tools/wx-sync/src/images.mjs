import { imageSize } from "image-size";
import sharp from "sharp";

/** [width, height] of an image buffer. */
export function dimensions(bytes) {
  const { width, height } = imageSize(bytes);
  if (!width || !height) throw new Error("could not read image dimensions");
  return [width, height];
}

const WEBP_QUALITY = 78;

/**
 * WebP copies of an image for srcset: one per configured width that is smaller than the original
 * (`<name>-<w>.webp`), plus one at the original width (`<name>.webp`). Never upscales.
 * @returns {Promise<{file: string, width: number, bytes: Buffer}[]>}
 */
export async function webpVariants(bytes, name, widths) {
  const { width: original } = await sharp(bytes).metadata();
  const out = [];
  for (const w of [...widths].sort((a, b) => a - b)) {
    if (w >= original) continue;
    out.push({ file: `${name}-${w}.webp`, width: w, bytes: await sharp(bytes).resize({ width: w }).webp({ quality: WEBP_QUALITY }).toBuffer() });
  }
  out.push({ file: `${name}.webp`, width: original, bytes: await sharp(bytes).webp({ quality: WEBP_QUALITY }).toBuffer() });
  return out;
}
