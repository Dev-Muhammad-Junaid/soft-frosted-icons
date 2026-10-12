/**
 * SoftMark material — the single rendering engine for every icon.
 *
 * One icon spec feeds two finishes:
 *
 *   outline — every path is a frosted glass tube: offset shadow, frost face,
 *             accent core, specular rim. Layers are drawn across ALL paths at once
 *             (all shadows, then all faces, …) so crossings fuse like one piece of
 *             glass instead of one stroke's halo painting over another's core.
 *
 *   duo     — filled glass. Closed shapes become glass bodies with an accent core;
 *             interior details are cut through them; outside lines become glass rods.
 *             Every part uses the same body material (see "Duo finish" below).
 *
 * Paints resolve from currentColor (--accent / color prop) and the theme tokens
 * --soft-cx-frost / --soft-cx-mark. No raw colours live in the artwork.
 */

/** Grid constants — the contract every icon is drawn against. */
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

/* Duo recipe. */
/* Duo recipe. Edge and rim widths are the visible band inside the body. */
const BODY = { dx: 1, dy: 1.3, shadowOpacity: 0.42, edge: 0.9, rim: 0.55 };
const ROD = { pad: 2.4, core: 0.5, spec: 0.16 };
/** A cut is a little narrower than the stroke it replaces, so walls keep the line weight. */
const CUT_SHRINK = 0.2;

function norm(item) {
  if (typeof item === "string") return { d: item };
  return item;
}

/* ── SVG frame ─────────────────────────────────────────── */

export function SoftSvg({ size = 24, className, title, children, style, color, finish, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={GRID.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      data-soft-finish={finish}
      style={{ overflow: "visible", color: color ?? "var(--accent)", ...style }}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* ── Paint definitions ─────────────────────────────────── */

const FROST = "var(--soft-cx-frost, white)";
const MARK = "var(--soft-cx-mark, var(--soft-cx-frost, white))";

export function GlassDefs({ uid }) {
  const box = { gradientUnits: "userSpaceOnUse" };
  const { min, max } = GRID.live;
  return (
    <defs>
      {/* Bounding-box paints: each duo body gets its own light. */}
      <linearGradient id={`${uid}-body`} x1="0.15" y1="0" x2="0.85" y2="1">
        <stop offset="0" stopColor="currentColor" stopOpacity="0.95" />
        <stop offset="0.45" stopColor="currentColor" stopOpacity="0.55" />
        <stop offset="1" stopColor={FROST} stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id={`${uid}-face`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={FROST} stopOpacity="0.86" />
        <stop offset="0.45" stopColor="currentColor" stopOpacity="0.34" />
        <stop offset="1" stopColor={MARK} stopOpacity="0.66" />
      </linearGradient>
      <linearGradient id={`${uid}-core`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="currentColor" stopOpacity="0.98" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.62" />
      </linearGradient>
      <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={FROST} stopOpacity="0.95" />
        <stop offset="0.55" stopColor={FROST} stopOpacity="0.3" />
        <stop offset="1" stopColor={FROST} stopOpacity="0.05" />
      </linearGradient>
      {/* Grid-space paints for strokes: a horizontal line lights like a vertical one. */}
      <linearGradient id={`${uid}-s-body`} {...box} x1={min + 4} y1={min} x2={max - 4} y2={max}>
        <stop offset="0" stopColor="currentColor" stopOpacity="0.95" />
        <stop offset="0.45" stopColor="currentColor" stopOpacity="0.55" />
        <stop offset="1" stopColor={FROST} stopOpacity="0.8" />
      </linearGradient>
      <linearGradient id={`${uid}-s-face`} {...box} x1="24" y1={min} x2="24" y2={max}>
        <stop offset="0" stopColor={FROST} stopOpacity="0.9" />
        <stop offset="0.45" stopColor="currentColor" stopOpacity="0.32" />
        <stop offset="1" stopColor={MARK} stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id={`${uid}-s-core`} {...box} x1="24" y1={min} x2="24" y2={max}>
        <stop offset="0" stopColor="currentColor" stopOpacity="1" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.68" />
      </linearGradient>
      <linearGradient id={`${uid}-s-edge`} {...box} x1="24" y1={min} x2="24" y2={max}>
        <stop offset="0" stopColor="currentColor" stopOpacity="0.42" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.78" />
      </linearGradient>
      <linearGradient id={`${uid}-s-edge-rod`} {...box} x1="24" y1={min} x2="24" y2={max}>
        <stop offset="0" stopColor="currentColor" stopOpacity="0.55" />
        <stop offset="1" stopColor="currentColor" stopOpacity="0.85" />
      </linearGradient>
      {/* Smooths the duo core mask: blur + threshold rounds every corner the inset creates. */}
      <filter
        id={`${uid}-round`}
        filterUnits="userSpaceOnUse"
        x="-4"
        y="-4"
        width="56"
        height="56"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="0.9" />
        <feComponentTransfer>
          <feFuncR type="linear" slope="5" intercept="-2" />
          <feFuncG type="linear" slope="5" intercept="-2" />
          <feFuncB type="linear" slope="5" intercept="-2" />
        </feComponentTransfer>
      </filter>
      <linearGradient id={`${uid}-s-rim`} {...box} x1={min} y1={min} x2={max} y2={max}>
        <stop offset="0" stopColor={FROST} stopOpacity="0.95" />
        <stop offset="0.55" stopColor={FROST} stopOpacity="0.32" />
        <stop offset="1" stopColor={FROST} stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

/* ── Outline finish ────────────────────────────────────── */

function StrokeLayer({ items, layer, stroke, width, opacity, transform }) {
  return (
    <g data-soft-layer={layer} stroke={stroke} opacity={opacity} transform={transform}>
      {items.map((it, i) => (
        <path key={i} d={it.d} strokeWidth={width(it.w ?? W)} />
      ))}
    </g>
  );
}

/**
 * Knockout for slashed marks (eye-off …): everything under the slash is masked away
 * by a band wider than the glass face, then the slash is drawn on top.
 */
function CutMask({ uid, cut }) {
  return (
    <mask id={`${uid}-cut`} maskUnits="userSpaceOnUse" x="-4" y="-4" width="56" height="56">
      <rect x="-4" y="-4" width="56" height="56" fill="white" />
      <path d={cut} stroke="black" strokeWidth={W + TUBE.face.pad + 2 * GRID.cutGap} strokeLinecap="round" fill="none" />
    </mask>
  );
}

export function OutlineGlyph({ uid, paths, cut }) {
  if (cut) {
    return (
      <g>
        <CutMask uid={uid} cut={cut} />
        <g mask={`url(#${uid}-cut)`}>
          <OutlineGlyph uid={uid} paths={paths} />
        </g>
        <OutlineGlyph uid={uid} paths={[cut]} />
      </g>
    );
  }
  const items = paths.map(norm);
  const t = TUBE;
  return (
    <g data-soft-layer="body" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <StrokeLayer
        items={items}
        layer="extrude"
        stroke={`url(#${uid}-s-body)`}
        width={(w) => w + t.shadow.pad}
        opacity={t.shadow.opacity}
        transform={`translate(${t.shadow.dx} ${t.shadow.dy})`}
      />
      <StrokeLayer items={items} layer="face" stroke={`url(#${uid}-s-face)`} width={(w) => w + t.face.pad} />
      <StrokeLayer items={items} layer="glyph" stroke={`url(#${uid}-s-core)`} width={(w) => w * t.core.k} />
      <StrokeLayer
        items={items}
        layer="specular"
        stroke={`url(#${uid}-s-rim)`}
        width={(w) => w * t.spec.k}
        opacity={t.spec.opacity}
      />
    </g>
  );
}

/* ── Duo finish ────────────────────────────────────────── */

/*
 * Duo is "filled glass": one material for every part of every icon.
 *
 *   body  closed glass piece — shadow, frost face, accent edge, white rim and an
 *         accent core inset by a uniform distance (corners rounded by a smoothing pass)
 *   cut   a detail line knocked THROUGH the bodies; the gap gets glass walls and every
 *         piece it creates gets its own core (package faces, mail flap, clock hands …)
 *   rod   an open line outside the bodies, built from the same layers as a body
 *
 * No flat ink or flat accent fills — that mix is what made duo read inconsistent.
 */

function Body({ uid, item, index, cuts }) {
  const { d, opacity = 1, core = true, fillRule, inset = GRID.coreInset } = item;
  const shape = `${uid}-b${index}`;
  const coreMask = `${uid}-c${index}`;
  const cutStrokes = (extra, color) =>
    cuts.map((c, k) => (
      <path key={k} d={c.d} fill="none" stroke={color} strokeWidth={c.gap + extra} strokeLinecap="round" strokeLinejoin="round" />
    ));
  return (
    <g opacity={opacity === 1 ? undefined : opacity}>
      <mask id={shape} maskUnits="userSpaceOnUse" x="-4" y="-4" width="56" height="56">
        <path d={d} fillRule={fillRule} fill="white" />
        {cutStrokes(0, "black")}
      </mask>
      <g transform={`translate(${BODY.dx} ${BODY.dy})`}>
        <path
          data-soft-layer="extrude"
          d={d}
          fillRule={fillRule}
          fill={`url(#${uid}-body)`}
          opacity={BODY.shadowOpacity}
          mask={`url(#${shape})`}
        />
      </g>
      <g mask={`url(#${shape})`}>
        <path data-soft-layer="face" d={d} fillRule={fillRule} fill={`url(#${uid}-face)`} />
        {core ? (
          <>
            <mask id={coreMask} maskUnits="userSpaceOnUse" x="-4" y="-4" width="56" height="56">
              <g filter={`url(#${uid}-round)`}>
                <rect x="-4" y="-4" width="56" height="56" fill="black" />
                <path d={d} fillRule={fillRule} fill="white" />
                <path d={d} fill="none" stroke="black" strokeWidth={inset * 2} strokeLinejoin="round" />
                {cutStrokes(inset * 2, "black")}
              </g>
            </mask>
            <path
              data-soft-layer="glyph"
              d={d}
              fillRule={fillRule}
              fill={`url(#${uid}-core)`}
              mask={`url(#${coreMask})`}
              opacity={0.94}
            />
          </>
        ) : null}
        <g data-soft-layer="edge" fill="none" stroke={`url(#${uid}-s-edge)`} strokeLinejoin="round">
          <path d={d} strokeWidth={BODY.edge * 2} />
          {cutStrokes(BODY.edge * 2, `url(#${uid}-s-edge)`)}
        </g>
        <path
          data-soft-layer="specular"
          d={d}
          fill="none"
          stroke={`url(#${uid}-rim)`}
          strokeWidth={BODY.rim * 2}
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

/** Open line in body material: shadow, accent edge, frost face, accent core, highlight. */
function Rods({ uid, items }) {
  const r = (w) => w + ROD.pad;
  return (
    <g data-soft-layer="body" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <StrokeLayer
        items={items}
        layer="extrude"
        stroke={`url(#${uid}-s-body)`}
        width={(w) => r(w)}
        opacity={BODY.shadowOpacity}
        transform={`translate(${BODY.dx} ${BODY.dy})`}
      />
      <StrokeLayer items={items} layer="edge" stroke={`url(#${uid}-s-edge-rod)`} width={(w) => r(w)} />
      <StrokeLayer items={items} layer="face" stroke={`url(#${uid}-s-face)`} width={(w) => r(w) - BODY.edge * 2} />
      <StrokeLayer items={items} layer="glyph" stroke={`url(#${uid}-s-core)`} width={(w) => r(w) * ROD.core} />
      <StrokeLayer
        items={items}
        layer="specular"
        stroke={`url(#${uid}-s-rim)`}
        width={(w) => r(w) * ROD.spec}
        opacity={0.6}
      />
    </g>
  );
}

export function DuoGlyph({ uid, bodies = [], cuts = [], rods = [], cut }) {
  if (cut) {
    return (
      <g>
        <CutMask uid={uid} cut={cut} />
        <g mask={`url(#${uid}-cut)`}>
          <DuoGlyph uid={uid} bodies={bodies} cuts={cuts} rods={rods} />
        </g>
        <Rods uid={uid} items={[{ d: cut }]} />
      </g>
    );
  }
  const gaps = cuts.map(norm).map((c) => ({ ...c, gap: c.gap ?? (c.w ?? W) - CUT_SHRINK }));
  return (
    <g data-soft-layer="body">
      {bodies.map(norm).map((item, i) => (
        <Body key={i} uid={uid} item={item} index={i} cuts={gaps} />
      ))}
      {rods.length ? <Rods uid={uid} items={rods.map(norm)} /> : null}
    </g>
  );
}

/* ── Spec → finish ─────────────────────────────────────── */

/**
 * Resolve an icon spec to the path data for a finish.
 *
 * Spec fields:
 *   shapes  closed silhouettes (outline: tubes · duo: glass bodies)
 *   lines   open strokes / details (outline: tubes · duo: cuts when the icon has bodies, else rods)
 *   outline full outline path list override
 *   duo     override { bodies, cuts, rods, inset } — bodies take { d, inset, opacity, core, fillRule }.
 *           Overriding bodies or rods means cuts must be listed explicitly.
 *   cut     slash path drawn over a knocked-out gap (both finishes)
 */
export function resolveSpec(spec, finish) {
  const shapes = (spec.shapes ?? []).map(norm);
  const lines = (spec.lines ?? []).map(norm);
  if (finish === "duo") {
    const o = spec.duo ?? {};
    const bodies = (o.bodies ?? shapes).map(norm).map((b) => (o.inset ? { inset: o.inset, ...b } : b));
    const solid = bodies.length > 0;
    // Lines become cuts only when the override leaves the composition alone.
    const derived = !o.bodies && !o.rods;
    return {
      bodies,
      cuts: (o.cuts ?? (solid && derived ? lines : [])).map(norm),
      rods: (o.rods ?? (solid ? [] : lines)).map(norm),
      cut: spec.cut,
    };
  }
  return { paths: spec.outline ?? [...shapes, ...lines], cut: spec.cut };
}
