// Regenerate the no-JavaScript/reduced-motion hero artwork with pnpm exec node.
import { writeFileSync } from "node:fs";
import { Euler, Matrix4, PerspectiveCamera, Vector3 } from "three";

const width = 1000, height = 700, time = 2.4;
const camera = new PerspectiveCamera(46, width / height, 0.1, 50);
camera.position.set(0, 4.6, 11.5);
camera.lookAt(0, 0, 0);
camera.updateMatrixWorld();
const rotation = new Matrix4().makeRotationFromEuler(new Euler(0, -0.12, -0.16));
const dots = [];
const palette = ["#ff9a45", "#ff6b62", "#f9fafc"];
const smoothstep = (a, b, value) => { const x = Math.max(0, Math.min(1, (value - a) / (b - a))); return x * x * (3 - 2 * x); };
for (let row = 0; row < 48; row++) {
  for (let col = 0; col < 90; col++) {
    const x = (col / 89 - 0.5) * 14;
    const z = (row / 47 - 0.5) * 8.8;
    const y = Math.sin(x * 0.63 + time) * 0.95 + Math.sin(z * 0.88 + x * 0.22 - time * 0.72) * 0.62 + Math.cos(x * 0.32 - z * 0.5 + time * 0.48) * 0.38;
    const point = new Vector3(x + Math.sin(z * 0.4 + time * 0.35) * 0.22, y, z).applyMatrix4(rotation).add(new Vector3(0, 0.15, 0));
    const depth = point.clone().applyMatrix4(camera.matrixWorldInverse).z;
    point.project(camera);
    const seed = Math.abs((Math.sin((row * 90 + col) * 127.1 + 311.7) * 43758.5453) % 1);
    const opacity = (1 - smoothstep(5.3, 7, Math.abs(x))) * (1 - smoothstep(3.1, 4.4, Math.abs(z))) * (0.38 + smoothstep(-4, 4, z) * 0.57);
    if (opacity < 0.02) continue;
    dots.push(`<circle cx="${((point.x + 1) * width / 2).toFixed(1)}" cy="${((1 - point.y) * height / 2).toFixed(1)}" r="${((2 + seed * 1.8) * 12 / -depth * 0.25).toFixed(2)}" fill="${palette[seed > 0.86 ? 2 : seed > 0.5 ? 1 : 0]}" opacity="${opacity.toFixed(2)}"/>`);
  }
}
writeFileSync(new URL("../public/particle-wave-static.svg", import.meta.url), `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${dots.join("")}</svg>\n`);
console.log(`Generated ${dots.length} static wave particles.`);
