/**
 * Writes every icon as a standalone file: svg/outline/<name>.svg and svg/duo/<name>.svg.
 *   node tools/build-svg.js
 * Files paint with currentColor and fall back to the Soft Glass blue, so they work inline,
 * as <img>, or dropped into Figma / Sketch.
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { iconNames, iconSVG } from "../src/render.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "svg");
const kebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

for (const finish of ["outline", "duo"]) {
  const dir = resolve(root, finish);
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(dir)) if (f.endsWith(".svg")) rmSync(resolve(dir, f));
  for (const name of iconNames()) {
    const svg = iconSVG(name, { finish, size: 48, id: `sfi-${kebab(name)}-${finish}` });
    writeFileSync(resolve(dir, `${kebab(name)}.svg`), `${svg}\n`);
  }
}
console.log(`Wrote ${iconNames().length * 2} SVGs to svg/`);
