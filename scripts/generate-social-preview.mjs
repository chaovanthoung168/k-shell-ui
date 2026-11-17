import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

// Reuse Next's image tooling and the original brand artwork.
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const logoSource = await readFile(new URL("../public/kshell-logo.png", import.meta.url));
const wave = await readFile(new URL("../public/particle-wave-static.svg", import.meta.url));
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="79" viewBox="228 288 1088 476">
  <defs><mask id="artwork" maskUnits="userSpaceOnUse" x="0" y="0" width="1536" height="1024" style="mask-type:luminance">
    <image href="data:image/png;base64,${logoSource.toString("base64")}" width="1536" height="1024"/>
  </mask></defs>
  <rect x="228" y="288" width="1088" height="476" fill="#f5f5f5" mask="url(#artwork)"/>
</svg>`;
const logo = await sharp(Buffer.from(logoSvg)).png().toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="shade" x2="0" y2="1">
      <stop stop-color="#080808" stop-opacity=".2"/>
      <stop offset=".58" stop-color="#080808" stop-opacity=".88"/>
      <stop offset="1" stop-color="#080808" stop-opacity=".1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#080808"/>
  <image href="data:image/svg+xml;base64,${wave.toString("base64")}" width="1200" height="840" y="-50"/>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <image href="data:image/png;base64,${logo.toString("base64")}" x="510" y="42" width="180" height="79"/>
  <g font-family="Segoe UI, Arial, sans-serif" text-anchor="middle">
    <text x="600" y="232" fill="#f5f5f5" font-size="82" font-weight="600" letter-spacing="-3">Windows,</text>
    <text x="600" y="324" fill="#f5f5f5" font-size="82" font-weight="600" letter-spacing="-3">at your command</text>
    <text x="600" y="388" fill="#bababa" font-size="25">Familiar commands. Your installed tools.</text>
    <text x="600" y="426" fill="#bababa" font-size="25">One native shell that feels at home on Windows.</text>
    <text x="600" y="565" fill="#eeeeee" font-size="20">Windows 10 / 11  ·  Built with Rust  ·  Open source</text>
  </g>
</svg>`;

const output = new URL("../public/social-preview.png", import.meta.url);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(fileURLToPath(output));
console.log("Generated public/social-preview.png (1200 × 630).");
