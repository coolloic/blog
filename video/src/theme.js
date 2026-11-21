// Brand values come from data/tokens.yaml (passed in as props by bin/render.mjs); videos use the dark palette.
/** {bg: "#0C1321", ...} from the tokens' color map, dark variant. */
export const palette = (tokens) => Object.fromEntries(Object.entries(tokens.color).map(([k, v]) => [k, v.dark]));
