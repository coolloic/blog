import { imageSize } from "image-size";

/** [width, height] of an image buffer. */
export function dimensions(bytes) {
  const { width, height } = imageSize(bytes);
  if (!width || !height) throw new Error("could not read image dimensions");
  return [width, height];
}
