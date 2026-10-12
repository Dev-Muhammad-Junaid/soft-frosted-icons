import { arc, circle, dot, join, move, poly, rect } from "../geometry.js";

function gear(cx, cy, teeth, rTip, rRoot, tipHalf, rootHalf) {
  const pts = [];
  const step = 360 / teeth;
  for (let k = 0; k < teeth; k += 1) {
    const a = k * step - 90;
    for (const [deg, r] of [[a - rootHalf, rRoot], [a - tipHalf, rTip], [a + tipHalf, rTip], [a + rootHalf, rRoot]]) {
      const rad = (deg * Math.PI) / 180;
      pts.push([cx + r * Math.cos(rad), cy + r * Math.sin(rad)]);
    }
  }
  return poly(pts, pts.map((_, i) => (i % 4 === 1 || i % 4 === 2 ? 1.3 : 1.6)));
}

/** Four-point sparkle with soft concave sides. */
function sparkle(cx, cy, r, k = 0.16) {
  const c = r * k;
  return (
    `M${cx} ${cy - r}Q${cx + c} ${cy - c} ${cx + r} ${cy}` +
    `Q${cx + c} ${cy + c} ${cx} ${cy + r}Q${cx - c} ${cy + c} ${cx - r} ${cy}` +
    `Q${cx - c} ${cy - c} ${cx} ${cy - r}Z`
  );
}

const ring = circle(24, 24, 15);
const gearBody = gear(24, 24, 8, 16, 12, 7, 13.5);
const hub = circle(24, 24, 5);
const rocketBody = move("M24 7c5.6 4.1 8 10.6 8 17.5V31a1 1 0 0 1-1 1H17a1 1 0 0 1-1-1v-6.5c0-6.9 2.4-13.4 8-17.5Z", 0, 3);
const finL = move("M16 24.5l-4.4 3.8a2 2 0 0 0-.6 1.5v5.4a.8.8 0 0 0 1.3.6L16 33", 0, 3);
const finR = move("M32 24.5l4.4 3.8a2 2 0 0 1 .6 1.5v5.4a.8.8 0 0 1-1.3.6L32 33", 0, 3);
const rocketWindow = circle(24, 23, 3.4);
const pageL = "M24 17a7 7 0 0 0-7-7H9a1.5 1.5 0 0 0-1.5 1.5v22A1.5 1.5 0 0 0 9 35h10a5 5 0 0 1 5 5Z";
const pageR = "M24 17a7 7 0 0 1 7-7h8a1.5 1.5 0 0 1 1.5 1.5v22A1.5 1.5 0 0 1 39 35H29a5 5 0 0 0-5 5Z";
const cupL = "M9 25h4a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3Z";
const cupR = "M39 25h-4a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3Z";
const diamond = (y) => poly([[24, y], [40, y + 8], [24, y + 16], [8, y + 8]], 2.5);

export const system = {
  settings: {
    label: "Settings",
    shapes: [gearBody],
    lines: [hub],
    duo: { bodies: [{ d: join(gearBody, hub), fillRule: "evenodd", inset: 2.6 }], cuts: [] },
  },
  info: {
    label: "Info",
    shapes: [ring],
    lines: ["M24 22v9", { d: dot(24, 16.5), w: 3.6 }],
    duo: { hug: false },
  },
  help: {
    label: "Help",
    shapes: [ring],
    lines: ["M19.2 19.5a5 5 0 0 1 9.7 1.6c0 3.3-4.9 4.6-4.9 4.6v1", { d: dot(24, 32), w: 3.6 }],
    duo: { hug: false },
  },
  alert: {
    label: "Alert",
    shapes: [ring],
    lines: ["M24 15.5V26", { d: dot(24, 32), w: 3.6 }],
    duo: { hug: false },
  },
  warning: {
    label: "Warning",
    shapes: [poly([[24, 8.5], [41, 38.5], [7, 38.5]], [4, 3.5, 3.5])],
    lines: ["M24 20v8", { d: dot(24, 33), w: 3.6 }],
    duo: { hug: false },
  },
  ban: {
    label: "Ban",
    shapes: [ring],
    lines: ["M13.4 13.4 34.6 34.6"],
  },
  sparkles: {
    label: "Sparkles",
    shapes: [sparkle(20, 26, 13), sparkle(34, 13, 6)],
    lines: [{ d: dot(36, 34), w: 3.6 }],
    duo: { bodies: [sparkle(20, 26, 13), { d: sparkle(34, 13, 6), inset: 1.8 }, { d: circle(36, 34, 2.8), inset: 0.8 }], cuts: [] },
  },
  rocket: {
    label: "Rocket",
    shapes: [rocketBody],
    lines: [rocketWindow, finL, finR, "M21 40h6"],
    duo: { bodies: [{ d: `${finL}Z`, inset: 1.8 }, { d: `${finR}Z`, inset: 1.8 }, rocketBody], cuts: [{ d: "M24 23h0.01", w: 7.4 }], frost: ["M21 40h6"], hug: false },
  },
  zap: {
    label: "Zap",
    shapes: [poly([[27, 7], [10, 27], [23, 27], [21, 41], [38, 21], [25, 21]], [1.5, 1.5, 0.8, 1.5, 1.5, 0.8])],
    duo: { inset: 1.9 },
  },
  layers: {
    label: "Layers",
    shapes: [diamond(8)],
    lines: ["M8 24l16 8 16-8", "M8 32l16 8 16-8"],
    duo: { bodies: [{ d: diamond(24), opacity: 0.55 }, { d: diamond(16), opacity: 0.78 }, diamond(8)], cuts: [] },
  },
  code: {
    label: "Code",
    lines: ["M32 16l8 8-8 8", "M16 16l-8 8 8 8", "M27 11 21 37"],
    duo: { rods: ["M32 16l8 8-8 8", "M16 16l-8 8 8 8"], frost: ["M27 11 21 37"] },
  },
  terminal: {
    label: "Terminal",
    shapes: [rect(8, 10, 32, 28, 5)],
    lines: ["M15 19l5.5 5-5.5 5", "M24 30h9"],
    duo: { hug: false },
  },
  support: {
    label: "Support",
    shapes: [cupL, cupR],
    lines: ["M9 28v-5a15 15 0 0 1 30 0v5", "M39 34v1a5 5 0 0 1-5 5h-7"],
    duo: { bodies: [cupL, cupR].map((d) => ({ d, inset: 2.2 })), cuts: [], frost: ["M9 28v-5a15 15 0 0 1 30 0v5", "M39 34v1a5 5 0 0 1-5 5h-7"] },
  },
  book: {
    label: "Book",
    shapes: [],
    lines: [
      "M9 35a1.5 1.5 0 0 1-1.5-1.5v-22A1.5 1.5 0 0 1 9 10h8a7 7 0 0 1 7 7 7 7 0 0 1 7-7h8a1.5 1.5 0 0 1 1.5 1.5v22A1.5 1.5 0 0 1 39 35H29a5 5 0 0 0-5 5 5 5 0 0 0-5-5Z",
      "M24 17v23",
    ],
    duo: { bodies: [pageL, pageR], cuts: [] },
  },
  power: {
    label: "Power",
    lines: ["M24 7v15", arc(24, 25, 14, -52, 232)],
    duo: { rods: ["M24 7v15"], frost: [arc(24, 25, 14, -52, 232)] },
  },
};
