/**
 * Zero-dependency checks for every icon in both finishes.
 *   node tools/check.js
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "../src/geometry.js";
import { GRID, iconNames, iconSVG, resolveSpec } from "../src/render.js";
import { ICONS, ICON_CATEGORIES, ICON_LABELS } from "../src/registry.js";

const here = dirname(fileURLToPath(import.meta.url));
const failures = [];
const fail = (msg) => failures.push(msg);

const names = iconNames();
if (names.length < 130) fail(`expected ≥130 icons, found ${names.length}`);
if (new Set(names).size !== names.length) fail("duplicate icon names");
const categorised = ICON_CATEGORIES.flatMap((c) => c.icons).sort();
if (JSON.stringify(categorised) !== JSON.stringify([...names].sort())) fail("every icon must sit in exactly one category");

const stripVars = (s) => {
  let prev;
  do {
    prev = s;
    s = s.replace(/var\((?:[^()]|\([^()]*\))*\)/g, "");
  } while (s !== prev);
  return s;
};

const points = (d) =>
  parse(d).flatMap(({ c, p }) => {
    if (c === "Z") return [];
    if (c === "A") return [[p[5], p[6]]];
    const out = [];
    for (let i = 0; i < p.length; i += 2) out.push([p[i], p[i + 1]]);
    return out;
  });

for (const name of names) {
  if (!ICON_LABELS[name]) fail(`${name}: missing label`);
  for (const finish of ["outline", "duo"]) {
    const svg = iconSVG(name, { finish, id: "t" });
    if (!svg.includes('viewBox="0 0 48 48"')) fail(`${name}/${finish}: wrong viewBox`);
    if (!/data-layer="(face|glyph)"/.test(svg)) fail(`${name}/${finish}: no glass layers`);
    const raw = stripVars(svg.replace(/style="[^"]*"/, "")).match(/#[0-9a-fA-F]{3,8}\b/g);
    if (raw) fail(`${name}/${finish}: raw colours ${raw.join(", ")}`);
    if (finish === "duo") {
      for (const tag of svg.match(/<path[^>]*fill="url\(#t-core\)"[^>]*>/g) ?? []) {
        if (!tag.includes("mask=")) fail(`${name}/duo: unmasked accent fill`);
      }
    }
  }
  // Live area: every point of every path stays within 7–41 (± half a unit).
  const o = resolveSpec(ICONS[name], "outline");
  const d = resolveSpec(ICONS[name], "duo");
  const all = [...o.paths, ...d.bodies, ...d.cuts, ...d.rods, ...d.frost, ...d.inlays, o.cut].filter(Boolean);
  for (const item of all) {
    const path = typeof item === "string" ? item : item.d;
    for (const [x, y] of points(path)) {
      if (x < GRID.live.min - 0.6 || x > GRID.live.max + 0.6 || y < GRID.live.min - 0.6 || y > GRID.live.max + 0.6) {
        fail(`${name}: point ${x},${y} outside the live area`);
        break;
      }
    }
  }
}

// Paint ids are namespaced per render.
const a = iconSVG("home");
const b = iconSVG("home");
if (a.match(/id="([^"]+)-face"/)[1] === b.match(/id="([^"]+)-face"/)[1]) fail("two renders share paint ids");
if (iconSVG("nope") !== "") fail("unknown names should render an empty string");
if (!iconSVG("bell", { label: "Alerts" }).includes('role="img"')) fail("label should set role=img");

// TypeScript name union matches the registry.
const dts = readFileSync(resolve(here, "../src/index.d.ts"), "utf8");
const union = dts.slice(dts.indexOf("export type IconName"), dts.indexOf(";", dts.indexOf("IconName =")));
const typed = [...union.matchAll(/"([a-zA-Z]+)"/g)].map((m) => m[1]).sort();
if (JSON.stringify(typed) !== JSON.stringify([...names].sort())) fail("src/index.d.ts IconName union is out of sync");

if (failures.length) {
  console.error(`✗ ${failures.length} problem(s):\n  ${failures.slice(0, 40).join("\n  ")}`);
  process.exit(1);
}
console.log(`✓ ${names.length} icons × 2 finishes pass`);
