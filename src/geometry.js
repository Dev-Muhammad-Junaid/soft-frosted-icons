/**
 * Path helpers for the 48 × 48 SoftMark grid.
 *
 * Every helper returns an SVG path string so icon specs stay plain data.
 * Numbers are rounded to 2 decimals to keep markup small and stable.
 */

const n = (v) => Math.round(v * 100) / 100;

/** Rounded rectangle. */
export function rect(x, y, w, h, r = 0) {
  const cr = Math.min(r, w / 2, h / 2);
  if (cr <= 0) return `M${n(x)} ${n(y)}h${n(w)}v${n(h)}h${n(-w)}Z`;
  return (
    `M${n(x + cr)} ${n(y)}h${n(w - 2 * cr)}a${n(cr)} ${n(cr)} 0 0 1 ${n(cr)} ${n(cr)}` +
    `v${n(h - 2 * cr)}a${n(cr)} ${n(cr)} 0 0 1 ${n(-cr)} ${n(cr)}` +
    `h${n(-(w - 2 * cr))}a${n(cr)} ${n(cr)} 0 0 1 ${n(-cr)} ${n(-cr)}` +
    `v${n(-(h - 2 * cr))}a${n(cr)} ${n(cr)} 0 0 1 ${n(cr)} ${n(-cr)}Z`
  );
}

/** Full circle as two arcs (closed). */
export function circle(cx, cy, r) {
  return `M${n(cx - r)} ${n(cy)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0Z`;
}

/** Ellipse as two arcs (closed). */
export function ellipse(cx, cy, rx, ry) {
  return `M${n(cx - rx)} ${n(cy)}a${n(rx)} ${n(ry)} 0 1 0 ${n(2 * rx)} 0a${n(rx)} ${n(ry)} 0 1 0 ${n(-2 * rx)} 0Z`;
}

/** Round-capped dot: a zero-length subpath renders as a disc of the stroke width. */
export function dot(x, y) {
  return `M${n(x)} ${n(y)}h0.01`;
}

/** Straight segment. */
export function line(x1, y1, x2, y2) {
  return `M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`;
}

/** Point on a circle, angle in degrees (0 = 3 o'clock, clockwise in SVG space). */
export function polar(cx, cy, r, deg) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

/** Open circular arc from angle a0 to a1 (degrees, clockwise). */
export function arc(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const sweep = ((a1 - a0) % 360 + 360) % 360;
  const large = sweep > 180 ? 1 : 0;
  return `M${n(x0)} ${n(y0)}A${n(r)} ${n(r)} 0 ${large} 1 ${n(x1)} ${n(y1)}`;
}

/**
 * Polygon / polyline with true circular corner radii.
 * `r` is a number or one radius per vertex. Open polylines keep sharp ends.
 */
export function poly(points, r = 0, closed = true) {
  const count = points.length;
  const radii = Array.isArray(r) ? r : points.map(() => r);
  const corners = points.map((p, i) => {
    const isEnd = !closed && (i === 0 || i === count - 1);
    const rad = radii[i] ?? 0;
    if (isEnd || rad <= 0) return { p, a: p, b: p, r: 0 };
    const prev = points[(i - 1 + count) % count];
    const next = points[(i + 1) % count];
    const v1 = [prev[0] - p[0], prev[1] - p[1]];
    const v2 = [next[0] - p[0], next[1] - p[1]];
    const l1 = Math.hypot(...v1);
    const l2 = Math.hypot(...v2);
    const u1 = [v1[0] / l1, v1[1] / l1];
    const u2 = [v2[0] / l2, v2[1] / l2];
    const cos = Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]));
    const theta = Math.acos(cos);
    if (theta < 1e-3 || Math.PI - theta < 1e-3) return { p, a: p, b: p, r: 0 };
    let t = rad / Math.tan(theta / 2);
    const maxT = Math.min(l1, l2) / 2;
    let rr = rad;
    if (t > maxT) {
      t = maxT;
      rr = t * Math.tan(theta / 2);
    }
    const cross = u1[0] * u2[1] - u1[1] * u2[0];
    return {
      p,
      a: [p[0] + u1[0] * t, p[1] + u1[1] * t],
      b: [p[0] + u2[0] * t, p[1] + u2[1] * t],
      r: rr,
      sweep: cross < 0 ? 1 : 0,
    };
  });
  let d = "";
  corners.forEach((c, i) => {
    const cmd = i === 0 ? "M" : "L";
    d += `${cmd}${n(c.a[0])} ${n(c.a[1])}`;
    if (c.r > 0) d += `A${n(c.r)} ${n(c.r)} 0 0 ${c.sweep} ${n(c.b[0])} ${n(c.b[1])}`;
  });
  return closed ? `${d}Z` : d;
}

/** Join several path strings into one compound path. */
export function join(...parts) {
  return parts.flat().filter(Boolean).join("");
}

/* ── Path transforms ─────────────────────────────────── */

const ARITY = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

/** Parse any SVG path into absolute M/L/C/Q/A/Z commands. */
export function parse(d) {
  const tokens = d.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g) ?? [];
  const out = [];
  let i = 0;
  let cmd = "";
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  let lastCtrl = null;
  const num = () => Number(tokens[i++]);
  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) cmd = tokens[i++];
    const up = cmd.toUpperCase();
    const rel = cmd !== up;
    if (up === "Z") {
      out.push({ c: "Z" });
      x = sx;
      y = sy;
      lastCtrl = null;
      continue;
    }
    if (i >= tokens.length) break;
    const ox = rel ? x : 0;
    const oy = rel ? y : 0;
    if (up === "M" || up === "L" || up === "T") {
      const px = num() + ox;
      const py = num() + oy;
      if (up === "T") {
        const c = lastCtrl?.q ? [2 * x - lastCtrl.x, 2 * y - lastCtrl.y] : [x, y];
        out.push({ c: "Q", p: [c[0], c[1], px, py] });
        lastCtrl = { x: c[0], y: c[1], q: true };
      } else {
        out.push({ c: up, p: [px, py] });
        lastCtrl = null;
      }
      if (up === "M") {
        sx = px;
        sy = py;
        cmd = rel ? "l" : "L";
      }
      x = px;
      y = py;
    } else if (up === "H" || up === "V") {
      const v = num();
      if (up === "H") x = v + (rel ? x : 0);
      else y = v + (rel ? y : 0);
      out.push({ c: "L", p: [x, y] });
      lastCtrl = null;
    } else if (up === "C" || up === "S") {
      let c1;
      if (up === "S") c1 = lastCtrl && !lastCtrl.q ? [2 * x - lastCtrl.x, 2 * y - lastCtrl.y] : [x, y];
      else c1 = [num() + ox, num() + oy];
      const c2 = [num() + ox, num() + oy];
      const p = [num() + ox, num() + oy];
      out.push({ c: "C", p: [...c1, ...c2, ...p] });
      lastCtrl = { x: c2[0], y: c2[1] };
      x = p[0];
      y = p[1];
    } else if (up === "Q") {
      const c1 = [num() + ox, num() + oy];
      const p = [num() + ox, num() + oy];
      out.push({ c: "Q", p: [...c1, ...p] });
      lastCtrl = { x: c1[0], y: c1[1], q: true };
      x = p[0];
      y = p[1];
    } else if (up === "A") {
      const rx = num();
      const ry = num();
      const rot = num();
      const large = num();
      const sweep = num();
      const p = [num() + ox, num() + oy];
      out.push({ c: "A", p: [rx, ry, rot, large, sweep, ...p] });
      lastCtrl = null;
      x = p[0];
      y = p[1];
    } else {
      i += ARITY[up] || 1;
    }
  }
  return out;
}

/** Apply an affine matrix [a b c d e f] (x' = ax + cy + e, y' = bx + dy + f) to a path. */
export function affine(d, [a, b, c, dd, e, f]) {
  const pt = (x, y) => [a * x + c * y + e, b * x + dd * y + f];
  const det = a * dd - b * c;
  const scale = Math.sqrt(Math.abs(det));
  const rotDeg = (Math.atan2(b, a) * 180) / Math.PI;
  return parse(d)
    .map(({ c: cmd, p }) => {
      if (cmd === "Z") return "Z";
      if (cmd === "A") {
        const [rx, ry, rot, large, sweep, x, y] = p;
        const [nx, ny] = pt(x, y);
        const nrot = det < 0 ? -rot + rotDeg : rot + rotDeg;
        return `A${n(rx * scale)} ${n(ry * scale)} ${n(nrot)} ${large} ${det < 0 ? 1 - sweep : sweep} ${n(nx)} ${n(ny)}`;
      }
      const pts = [];
      for (let k = 0; k < p.length; k += 2) pts.push(...pt(p[k], p[k + 1]).map(n));
      return `${cmd}${pts.join(" ")}`;
    })
    .join("");
}

/** Rotate a path by `deg` (clockwise on screen) around (cx, cy). */
export function rotate(d, deg, cx = 24, cy = 24) {
  const r = (deg * Math.PI) / 180;
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  return affine(d, [cos, sin, -sin, cos, cx - cx * cos + cy * sin, cy - cx * sin - cy * cos]);
}

/** Mirror left ↔ right around x = cx. */
export function flipX(d, cx = 24) {
  return affine(d, [-1, 0, 0, 1, 2 * cx, 0]);
}

/** Mirror top ↔ bottom around y = cy. */
export function flipY(d, cy = 24) {
  return affine(d, [1, 0, 0, -1, 0, 2 * cy]);
}

/** Translate a path. */
export function move(d, dx, dy) {
  return affine(d, [1, 0, 0, 1, dx, dy]);
}
