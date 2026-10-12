import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  FROSTED_CATEGORIES,
  FROSTED_GRID,
  FROSTED_ICON_KEYS,
  FROSTED_LABELS,
  FrostedIcon,
  renderFrostedIcon,
} from "../src/index.js";
import { parse } from "../src/lib/geometry.js";
import { resolveSpec } from "../src/lib/material.jsx";
import { ICONS } from "../src/lib/registry.js";

const FINISHES = ["outline", "duo"];

function render(name, finish) {
  const node = renderFrostedIcon(name, { uid: `t-${name}-${finish}`, size: 48, finish, title: name });
  expect(node, `${name}/${finish} should render`).toBeTruthy();
  return renderToStaticMarkup(node);
}

function stripCssVars(html) {
  let prev;
  let out = html;
  do {
    prev = out;
    out = out.replace(/var\((?:[^()]|\([^()]*\))*\)/g, "");
  } while (out !== prev);
  return out;
}

/** Every absolute point of every path in a spec, for both finishes. */
function specPaths(name) {
  const out = resolveSpec(ICONS[name], "outline");
  const duo = resolveSpec(ICONS[name], "duo");
  const items = [...out.paths, ...duo.bodies, ...duo.cuts, ...duo.rods, out.cut].filter(Boolean);
  return items.map((it) => (typeof it === "string" ? it : it.d));
}

function points(d) {
  return parse(d).flatMap(({ c, p }) => {
    if (c === "Z") return [];
    if (c === "A") return [[p[5], p[6]]];
    const pts = [];
    for (let i = 0; i < p.length; i += 2) pts.push([p[i], p[i + 1]]);
    return pts;
  });
}

describe("registry", () => {
  it("has a complete, unique key list", () => {
    expect(FROSTED_ICON_KEYS.length).toBeGreaterThanOrEqual(130);
    expect(new Set(FROSTED_ICON_KEYS).size).toBe(FROSTED_ICON_KEYS.length);
  });

  it("labels every icon", () => {
    for (const k of FROSTED_ICON_KEYS) expect(FROSTED_LABELS[k], k).toBeTruthy();
  });

  it("places every icon in exactly one category", () => {
    const all = FROSTED_CATEGORIES.flatMap((c) => c.icons);
    expect(all.sort()).toEqual([...FROSTED_ICON_KEYS].sort());
  });

  it("keeps the TypeScript name union in sync", () => {
    const dts = readFileSync(resolve(process.cwd(), "src/index.d.ts"), "utf8");
    const union = dts.slice(dts.indexOf("export type FrostedIconName"), dts.indexOf(";", dts.indexOf("FrostedIconName =")));
    const typed = [...union.matchAll(/"([a-zA-Z]+)"/g)].map((m) => m[1]);
    expect(typed.sort()).toEqual([...FROSTED_ICON_KEYS].sort());
  });

  it("exposes the grid contract", () => {
    expect(FROSTED_GRID.viewBox).toBe("0 0 48 48");
    expect(FROSTED_GRID.stroke).toBe(3);
  });
});

describe.each(FROSTED_ICON_KEYS)("%s", (name) => {
  it.each(FINISHES)("renders %s glass on the 48 grid", (finish) => {
    const html = render(name, finish);
    expect(html).toContain('viewBox="0 0 48 48"');
    expect(html).toContain(`data-soft-finish="${finish}"`);
    expect(html).toMatch(/data-soft-layer="(face|glyph)"/);
  });

  it.each(FINISHES)("%s uses theme paints only (no raw hex)", (finish) => {
    const raw = stripCssVars(render(name, finish)).match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    expect(raw).toEqual([]);
  });

  it("builds duo from one glass material (no flat accent fills)", () => {
    const html = render(name, "duo");
    const cores = html.match(/<path[^>]*fill="url\(#[^"]*-core\)"[^>]*>/g) ?? [];
    for (const tag of cores) expect(tag, `${name} unmasked core`).toContain("mask=");
  });

  it("keeps every point inside the live area", () => {
    const { min, max } = FROSTED_GRID.live;
    for (const d of specPaths(name)) {
      for (const [x, y] of points(d)) {
        expect(x, `${name} x in ${d}`).toBeGreaterThanOrEqual(min - 0.6);
        expect(x, `${name} x in ${d}`).toBeLessThanOrEqual(max + 0.6);
        expect(y, `${name} y in ${d}`).toBeGreaterThanOrEqual(min - 0.6);
        expect(y, `${name} y in ${d}`).toBeLessThanOrEqual(max + 0.6);
      }
    }
  });
});

describe("FrostedIcon", () => {
  it("renders a decorative icon hidden from assistive tech", () => {
    const html = renderToStaticMarkup(<FrostedIcon name="check" />);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('width="24"');
  });

  it("exposes a title as the accessible name", () => {
    const html = renderToStaticMarkup(<FrostedIcon name="bell" title="Notifications" finish="duo" />);
    expect(html).toContain('role="img"');
    expect(html).toContain("<title>Notifications</title>");
  });

  it("scopes paint ids per instance", () => {
    const html = renderToStaticMarkup(
      <>
        <FrostedIcon name="home" />
        <FrostedIcon name="home" />
      </>
    );
    const ids = [...html.matchAll(/ id="([^"]+)-edge"/g)].map((m) => m[1]);
    expect(ids).toHaveLength(2);
    expect(ids[0]).not.toBe(ids[1]);
  });

  it("renders an empty placeholder for an unknown name", () => {
    const html = renderToStaticMarkup(<FrostedIcon name="nope" size={20} />);
    expect(html).toContain("<span");
  });
});
