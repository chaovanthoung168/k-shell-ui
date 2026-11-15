import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

// Use Next's existing image tooling; no additional dependency is needed.
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const sharp = nextRequire("sharp");
const source = await readFile(new URL("../public/kshell-logo.png", import.meta.url));
const image = `data:image/png;base64,${source.toString("base64")}`;
// The clipping polygon isolates the K without trimming its lightning tip or
// including the adjacent Shell lettering. All coordinates refer to the source.
const silhouette = "M228 288H704V313L509 504L632 668H481L408 574L228 761Z";
const artwork = `<defs><mask id="artwork" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024" style="mask-type:luminance"><image href="${image}" width="1536" height="1024"/></mask><clipPath id="symbol"><path d="${silhouette}"/></clipPath></defs><rect class="mark" x="228" y="288" width="476" height="476" mask="url(#artwork)" clip-path="url(#symbol)"/>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="204 264 524 524"><style>.mark{fill:#161616}@media(prefers-color-scheme:dark){.mark{fill:#f5f5f5}}</style>${artwork}</svg>\n`;
for (const file of ["kshell-icon.svg", "icon.svg", "kshell-mark.svg"]) {
  await writeFile(new URL(`../public/${file}`, import.meta.url), svg);
}

// PNG-backed ICO entries cover both legacy browser tabs and high-DPI surfaces.
// An opaque neutral tile keeps this fallback readable against any browser UI.
const icoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="204 264 524 524"><rect x="204" y="264" width="524" height="524" rx="72" fill="#161616"/><style>.mark{fill:white}</style>${artwork}</svg>`;
const sizes = [16, 32, 48, 64, 128, 256];
const pngs = await Promise.all(sizes.map((size) => sharp(Buffer.from(icoSvg)).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, index) => {
  const entry = 6 + index * 16;
  header[entry] = size === 256 ? 0 : size;
  header[entry + 1] = size === 256 ? 0 : size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(pngs[index].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += pngs[index].length;
});
await writeFile(new URL("../app/favicon.ico", import.meta.url), Buffer.concat([header, ...pngs]));
console.log("Updated SVG brand assets and six ICO sizes from the supplied artwork.");
