/**
 * Writes every icon as a standalone SVG: svg/outline/<name>.svg and svg/duo/<name>.svg.
 * Run with `npm run build:svg` (bundled by Vite first so JSX resolves).
 *
 * Files paint with `currentColor` and fall back to the Soft Glass accent, so they work
 * inline (inherit `color`), as <img>, or dropped into Figma / Sketch.
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { renderFrostedIcon } from "../src/lib/FrostedIcon.jsx";
import { FROSTED_ICON_KEYS } from "../src/lib/registry.js";

const root = resolve(process.argv[2] ?? "svg");
const kebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

for (const finish of ["outline", "duo"]) {
  const dir = resolve(root, finish);
  mkdirSync(dir, { recursive: true });
  for (const f of readdirSync(dir)) if (f.endsWith(".svg")) rmSync(resolve(dir, f));
  for (const name of FROSTED_ICON_KEYS) {
    const markup = renderToStaticMarkup(
      renderFrostedIcon(name, {
        uid: `sfi-${kebab(name)}-${finish}`,
        finish,
        size: 48,
        color: "var(--accent, hsl(199 85% 48%))",
      })
    );
    writeFileSync(resolve(dir, `${kebab(name)}.svg`), `${markup}\n`);
  }
}

console.log(`Wrote ${FROSTED_ICON_KEYS.length * 2} SVGs to ${root}`);
