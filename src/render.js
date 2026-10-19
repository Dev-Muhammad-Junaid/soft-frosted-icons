/**
 * Soft Frosted Icons — the rendering engine.
 *
 * One icon spec feeds two finishes:
 *
 *   outline  every path is a frosted glass tube: offset shadow, frost face, accent core,
 *            specular rim. Each layer is drawn across ALL paths at once, so crossings fuse
 *            like one piece of glass.
 *
 *   duo      filled glass. Closed shapes are glass bodies with an accent core; glyph details
 *            are inlaid into the core; outside lines are glass rods in two tones.
 *
 * Output is a plain SVG string — no DOM, no framework — so it runs in browsers, Node,
 * web components and any UI library. Paints resolve from `currentColor` plus the
 * `--sfi-frost`, `--sfi-mark` and `--sfi-inlay` custom properties (see tokens.css),
 * with fallbacks that work without any CSS at all.
 */

import { ICONS } from "./registry.js";

/** Grid contract every icon is drawn against. */
export const GRID = {
  viewBox: "0 0 48 48",
  size: 48,
  /** Live area for stroke centrelines. Nothing is drawn outside 7–41. */
  live: { min: 7, max: 41 },
  /** Canonical stroke centreline width. */
  stroke: 3,
  /** Keyshapes (centreline) every silhouette is sized against. */
  keyshapes: {
    circle: { cx: 24, cy: 24, r: 15 },
    square: { x: 10, y: 10, w: 28, h: 28, r: 6 },
    landscape: { x: 8, y: 12, w: 32, h: 24, r: 5 },
    portrait: { x: 12, y: 8, w: 24, h: 32, r: 5 },
  },
  /** Minimum distance between parallel stroke centrelines so glass faces never weld. */
  minGap: 6,
  /** Duo accent core inset from the body edge. */
  coreInset: 2.9,
  /** Clear space either side of a knockout slash. */
  cutGap: 1.6,
};

const W = GRID.stroke;

/* Outline tube recipe (relative to stroke width w). */
const TUBE = {
  shadow: { pad: 1.8, dx: 0.8, dy: 1.1, opacity: 0.38 },
  face: { pad: 1.1 },
  core: { k: 0.62 },
  spec: { k: 0.3, opacity: 0.62 },
};

/* Duo recipe. Edge and rim widths are the visible band inside the body. */
const BODY = { dx: 1, dy: 1.3, shadowOpacity: 0.42, edge: 0.9, rim: 0.55 };
const INLAY = { k: 0.9, groove: 1, grooveOpacity: 0.3, dx: 0.45, dy: 0.65, margin: 2.2 };
const ROD = { pad: 1.9, edge: 0.65, core: 0.4, tint: 0.42, tintOpacity: 0.26, spec: 0.85, catch: [-0.55, -0.75] };
/** A cut is a little narrower than the stroke it replaces, so walls keep the line weight. */
const CUT_SHRINK = 0.2;

/** Default accent when neither `color` nor `--sfi-color` is set. */
export const DEFAULT_COLOR = "hsl(199 85% 48%)";

const FROST = "var(--sfi-frost, white)";
const MARK = "var(--sfi-mark, var(--sfi-frost, white))";
/* Inlay glyphs must stay light on the accent core in every theme (frost turns grey in dark ones). */
const INLAY_PAINT = "var(--sfi-inlay, white)";

/* ── tiny SVG writer ───────────────────────────────────── */

const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const n = (v) => (typeof v === "number" ? Math.round(v * 1000) / 1000 : v);

function attrs(o) {
  let s = "";
  for (const k in o) {
    const v = o[k];
    if (v === undefined || v === null || v === false) continue;
    s += ` ${k}="${esc(n(v))}"`;
  }
  return s;
}

function el(tag, a, ...kids) {
  const body = kids.flat(Infinity).filter(Boolean).join("");
  return body ? `<${tag}${attrs(a)}>${body}</${tag}>` : `<${tag}${attrs(a)}/>`;
}

const norm = (item) => (typeof item === "string" ? { d: item } : item);
const AREA = { maskUnits: "userSpaceOnUse", x: -4, y: -4, width: 56, height: 56 };

/* ── paints ────────────────────────────────────────────── */

function stops(list) {
  return list.map(([offset, color, opacity]) => el("stop", { offset, "stop-color": color, "stop-opacity": opacity }));
}

function defs(id) {
  const box = { gradientUnits: "userSpaceOnUse" };
  const { min, max } = GRID.live;
  const vertical = { ...box, x1: 24, y1: min, x2: 24, y2: max };
  const threshold = (fid, std, slope, intercept) =>
    el(
      "filter",
      { id: fid, filterUnits: "userSpaceOnUse", x: -4, y: -4, width: 56, height: 56, "color-interpolation-filters": "sRGB" },
      el("feGaussianBlur", { stdDeviation: std }),
      el(
        "feComponentTransfer",
        {},
        ["R", "G", "B"].map((c) => el(`feFunc${c}`, { type: "linear", slope, intercept }))
      )
    );
  return el(
    "defs",
    {},
    // Bounding-box paints: each duo body gets its own light.
    el("linearGradient", { id: `${id}-body`, x1: 0.15, y1: 0, x2: 0.85, y2: 1 }, stops([[0, "currentColor", 0.95], [0.45, "currentColor", 0.55], [1, FROST, 0.8]])),
    el("linearGradient", { id: `${id}-face`, x1: 0, y1: 0, x2: 0, y2: 1 }, stops([[0, FROST, 0.86], [0.45, "currentColor", 0.34], [1, MARK, 0.66]])),
    el("linearGradient", { id: `${id}-core`, x1: 0, y1: 0, x2: 0, y2: 1 }, stops([[0, "currentColor", 0.98], [1, "currentColor", 0.62]])),
    el("linearGradient", { id: `${id}-rim`, x1: 0, y1: 0, x2: 1, y2: 1 }, stops([[0, FROST, 0.95], [0.55, FROST, 0.3], [1, FROST, 0.05]])),
    // Grid-space paints for strokes: a horizontal line lights like a vertical one.
    el("linearGradient", { id: `${id}-s-body`, ...box, x1: min + 4, y1: min, x2: max - 4, y2: max }, stops([[0, "currentColor", 0.95], [0.45, "currentColor", 0.55], [1, FROST, 0.8]])),
    el("linearGradient", { id: `${id}-s-face`, ...vertical }, stops([[0, FROST, 0.9], [0.45, "currentColor", 0.32], [1, MARK, 0.7]])),
    el("linearGradient", { id: `${id}-s-core`, ...vertical }, stops([[0, "currentColor", 1], [1, "currentColor", 0.68]])),
    el("linearGradient", { id: `${id}-s-edge`, ...vertical }, stops([[0, "currentColor", 0.42], [1, "currentColor", 0.78]])),
    el("linearGradient", { id: `${id}-s-inlay`, ...vertical }, stops([[0, INLAY_PAINT, 1], [1, INLAY_PAINT, 0.86]])),
    el("linearGradient", { id: `${id}-s-rim`, ...box, x1: min, y1: min, x2: max, y2: max }, stops([[0, FROST, 0.95], [0.55, FROST, 0.32], [1, FROST, 0]])),
    // Blur + threshold: rounds the corners a core inset or a cut would otherwise leave sharp.
    threshold(`${id}-round`, 0.9, 5, -2),
    threshold(`${id}-soften`, 0.75, 8, -3.5)
  );
}

/* ── shared pieces ─────────────────────────────────────── */

function strokeLayer(items, layer, stroke, width, opacity, transform) {
  return el(
    "g",
    { "data-layer": layer, stroke, opacity, transform },
    items.map((it) => el("path", { d: it.d, "stroke-width": width(it.w ?? W) }))
  );
}

/** Knockout for slashed marks (eye-off): everything under the slash is masked away. */
function cutMask(id, cut) {
  return el(
    "mask",
    { id: `${id}-cut`, ...AREA },
    el("rect", { x: -4, y: -4, width: 56, height: 56, fill: "white" }),
    el("path", { d: cut, stroke: "black", "stroke-width": W + TUBE.face.pad + 2 * GRID.cutGap, "stroke-linecap": "round", fill: "none" })
  );
}

/* ── outline finish ────────────────────────────────────── */

function outline(id, paths, cut) {
  if (cut) {
    return el("g", {}, cutMask(id, cut), el("g", { mask: `url(#${id}-cut)` }, outline(id, paths)), outline(id, [cut]));
  }
  const items = paths.map(norm);
  const t = TUBE;
  return el(
    "g",
    { "data-layer": "body", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
    strokeLayer(items, "extrude", `url(#${id}-s-body)`, (w) => w + t.shadow.pad, t.shadow.opacity, `translate(${t.shadow.dx} ${t.shadow.dy})`),
    strokeLayer(items, "face", `url(#${id}-s-face)`, (w) => w + t.face.pad),
    strokeLayer(items, "glyph", `url(#${id}-s-core)`, (w) => w * t.core.k),
    strokeLayer(items, "specular", `url(#${id}-s-rim)`, (w) => w * t.spec.k, t.spec.opacity)
  );
}

/* ── duo finish ────────────────────────────────────────── */

function body(id, item, index, cuts) {
  // hug: the core keeps its inset around structural cuts too, so every piece gets its own core.
  const { d, opacity = 1, core = true, fillRule, inset = GRID.coreInset, hug = true } = item;
  const shape = `${id}-b${index}`;
  const coreMask = `${id}-c${index}`;
  const rule = fillRule ? { "fill-rule": fillRule } : {};
  const cutStrokes = (extra, color) =>
    cuts.map((c) =>
      el("path", { d: c.d, fill: "none", stroke: color, "stroke-width": c.gap + extra, "stroke-linecap": "round", "stroke-linejoin": "round" })
    );
  return el(
    "g",
    { opacity: opacity === 1 ? undefined : opacity },
    el(
      "mask",
      { id: shape, ...AREA },
      el(
        "g",
        { filter: cuts.length ? `url(#${id}-soften)` : undefined },
        el("rect", { x: -4, y: -4, width: 56, height: 56, fill: "black" }),
        el("path", { d, ...rule, fill: "white" }),
        cutStrokes(0, "black")
      )
    ),
    el(
      "g",
      { transform: `translate(${BODY.dx} ${BODY.dy})` },
      el("path", { "data-layer": "extrude", d, ...rule, fill: `url(#${id}-body)`, opacity: BODY.shadowOpacity, mask: `url(#${shape})` })
    ),
    el(
      "g",
      { mask: `url(#${shape})` },
      el("path", { "data-layer": "face", d, ...rule, fill: `url(#${id}-face)` }),
      core
        ? [
            el(
              "mask",
              { id: coreMask, ...AREA },
              el(
                "g",
                { filter: `url(#${id}-round)` },
                el("rect", { x: -4, y: -4, width: 56, height: 56, fill: "black" }),
                el("path", { d, ...rule, fill: "white" }),
                el("path", { d, fill: "none", stroke: "black", "stroke-width": inset * 2, "stroke-linejoin": "round" }),
                hug ? cutStrokes(inset * 2, "black") : cutStrokes(BODY.edge * 2, "black")
              )
            ),
            el("path", { "data-layer": "glyph", d, ...rule, fill: `url(#${id}-core)`, mask: `url(#${coreMask})`, opacity: 0.94 }),
          ]
        : null,
      el(
        "g",
        { "data-layer": "edge", fill: "none", stroke: `url(#${id}-s-edge)`, "stroke-linejoin": "round" },
        el("path", { d, "stroke-width": BODY.edge * 2 }),
        cutStrokes(BODY.edge * 2, `url(#${id}-s-edge)`)
      ),
      el("path", { "data-layer": "specular", d, fill: "none", stroke: `url(#${id}-rim)`, "stroke-width": BODY.rim * 2, "stroke-linejoin": "round" })
    )
  );
}

/** Open line in body material. Primary rods carry an accent core; frost rods are clear glass. */
function rods(id, items, tone = "core") {
  const r = (w) => w + ROD.pad;
  return el(
    "g",
    { "data-layer": "body", "data-tone": tone, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
    strokeLayer(items, "extrude", `url(#${id}-s-body)`, r, BODY.shadowOpacity * (tone === "core" ? 1 : 0.7), `translate(${BODY.dx} ${BODY.dy})`),
    strokeLayer(items, "edge", `url(#${id}-s-edge)`, r),
    strokeLayer(items, "face", `url(#${id}-s-face)`, (w) => r(w) - ROD.edge * 2),
    strokeLayer(
      items,
      "glyph",
      `url(#${id}-s-core)`,
      (w) => r(w) * (tone === "core" ? ROD.core : ROD.tint),
      tone === "core" ? undefined : ROD.tintOpacity
    ),
    strokeLayer(items, "specular", `url(#${id}-s-rim)`, () => ROD.spec, 0.9, `translate(${ROD.catch[0]} ${ROD.catch[1]})`)
  );
}

/** Glyph set into the glass: crisp light strokes over the core, kept just inside the rim. */
function inlays(id, items, bodies) {
  const clip = `${id}-inlay`;
  return el(
    "g",
    { "data-layer": "inlay" },
    el(
      "mask",
      { id: clip, ...AREA },
      bodies.map((b) => el("path", { d: b.d, ...(b.fillRule ? { "fill-rule": b.fillRule } : {}), fill: "white" })),
      bodies.map((b) => el("path", { d: b.d, fill: "none", stroke: "black", "stroke-width": INLAY.margin * 2, "stroke-linejoin": "round" }))
    ),
    el(
      "g",
      { mask: `url(#${clip})`, fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
      strokeLayer(items, "extrude", "currentColor", (w) => w * INLAY.k + INLAY.groove, INLAY.grooveOpacity, `translate(${INLAY.dx} ${INLAY.dy})`),
      strokeLayer(items, "inlay", `url(#${id}-s-inlay)`, (w) => w * INLAY.k)
    )
  );
}

function duo(id, parts) {
  const { bodies = [], cuts = [], rods: primary = [], frost = [], inlays: glyphs = [], cut } = parts;
  if (cut) {
    return el(
      "g",
      {},
      cutMask(id, cut),
      el("g", { mask: `url(#${id}-cut)` }, duo(id, { bodies, cuts, rods: primary, frost, inlays: glyphs })),
      rods(id, [{ d: cut }])
    );
  }
  const gaps = cuts.map(norm).map((c) => ({ ...c, gap: c.gap ?? (c.w ?? W) - CUT_SHRINK }));
  const solid = bodies.map(norm);
  return el(
    "g",
    { "data-layer": "body" },
    frost.length ? rods(id, frost.map(norm), "frost") : null,
    solid.map((item, i) => body(id, item, i, gaps)),
    glyphs.length ? inlays(id, glyphs.map(norm), solid) : null,
    primary.length ? rods(id, primary.map(norm)) : null
  );
}

/* ── spec → finish ─────────────────────────────────────── */

/**
 * Resolve an icon spec to the path data for a finish.
 *
 *   shapes  closed silhouettes (outline: tubes · duo: glass bodies)
 *   lines   open strokes / details (outline: tubes · duo: cuts when the icon has bodies, else rods)
 *   outline full outline path list override
 *   duo     override { bodies, cuts, rods, frost, inlay, inset, hug }
 *           rods = primary lines (accent core) · frost = secondary lines (clear glass, behind bodies)
 *           inlay = glyph set into the glass (true = use the cuts, or an explicit list)
 *           Overriding bodies, rods or frost means cuts must be listed explicitly.
 *   cut     slash path drawn over a knocked-out gap (both finishes)
 */
export function resolveSpec(spec, finish) {
  const shapes = (spec.shapes ?? []).map(norm);
  const lines = (spec.lines ?? []).map(norm);
  if (finish === "duo") {
    const o = spec.duo ?? {};
    const bodies = (o.bodies ?? shapes)
      .map(norm)
      .map((b) => ({ ...(o.inset ? { inset: o.inset } : null), ...(o.hug === false ? { hug: false } : null), ...b }));
    const solid = bodies.length > 0;
    const derived = !o.bodies && !o.rods && !o.frost;
    const cutList = (o.cuts ?? (solid && derived ? lines : [])).map(norm);
    return {
      bodies,
      inlays: Array.isArray(o.inlay) ? o.inlay.map(norm) : o.inlay ? cutList : [],
      cuts: o.inlay === true ? [] : cutList,
      rods: (o.rods ?? (solid || o.frost ? [] : lines)).map(norm),
      frost: (o.frost ?? []).map(norm),
      cut: spec.cut,
    };
  }
  return { paths: spec.outline ?? [...shapes, ...lines], cut: spec.cut };
}

/* ── public API ────────────────────────────────────────── */

let counter = 0;
/** A fresh id prefix; every icon's gradients and masks are namespaced with it. */
export function nextId() {
  counter += 1;
  return `sfi${counter.toString(36)}`;
}

/**
 * Render an icon to an SVG string.
 *
 * @param {string} name   icon key (`home`, `bell`, …)
 * @param {object} [opts]
 * @param {"outline"|"duo"} [opts.finish="outline"]
 * @param {number|string} [opts.size=24]   px number or any CSS length
 * @param {string} [opts.color]            sets currentColor; defaults to var(--sfi-color, …)
 * @param {string} [opts.label]            accessible name; omit for decorative icons
 * @param {string} [opts.id]               id prefix for paints (stable output for SSR / tests)
 * @param {string} [opts.className]
 * @returns {string} SVG markup, or "" for an unknown name
 */
export function iconSVG(name, opts = {}) {
  const spec = ICONS[name];
  if (!spec) return "";
  const finish = opts.finish === "duo" ? "duo" : "outline";
  const id = opts.id ?? nextId();
  const size = opts.size ?? 24;
  const dim = typeof size === "number" ? size : String(size);
  const color = opts.color ?? `var(--sfi-color, ${DEFAULT_COLOR})`;
  const art = finish === "duo" ? duo(id, resolveSpec(spec, "duo")) : (() => {
    const r = resolveSpec(spec, "outline");
    return outline(id, r.paths, r.cut);
  })();
  return el(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: dim,
      height: dim,
      viewBox: GRID.viewBox,
      fill: "none",
      class: ["sfi", opts.className].filter(Boolean).join(" "),
      role: opts.label ? "img" : undefined,
      "aria-label": opts.label || undefined,
      "aria-hidden": opts.label ? undefined : "true",
      "data-icon": name,
      "data-finish": finish,
      style: `overflow:visible;color:${color}`,
    },
    opts.label ? el("title", {}, esc(opts.label)) : null,
    defs(id),
    art
  );
}

/** Names of every icon, in catalog order. */
export function iconNames() {
  return Object.keys(ICONS);
}
