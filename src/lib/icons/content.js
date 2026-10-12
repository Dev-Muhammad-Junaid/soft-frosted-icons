import { circle, dot, ellipse, join, poly, rect } from "../geometry.js";

const filePage = "M27 7H15a5 5 0 0 0-5 5v24a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V18Z";
const fileFold = "M27 7v7a4 4 0 0 0 4 4h7";
const frontPage = "M30 7h-9a5 5 0 0 0-5 5v17a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V17Z";
const frontFold = "M30 7v6a4 4 0 0 0 4 4h6";
const pinOuter = "M37.5 20.5c0 8.7-9.3 17.2-12.3 19.8a2 2 0 0 1-2.4 0C19.8 37.7 10.5 29.2 10.5 20.5a13.5 13.5 0 0 1 27 0Z";
const pinHole = circle(24, 20.5, 5);
const flagCloth =
  "M11 9.5c2-1.6 4.2-2.5 7-2.5 5 0 8.4 3.5 13 3.5 2.7 0 4.6-.6 6.2-1.6A1.2 1.2 0 0 1 39 10v16.6a1.6 1.6 0 0 1-.7 1.3c-1.8 1.2-4 1.9-7.3 1.9-4.6 0-8-3.5-13-3.5-2.8 0-5 .9-7 2.5";
const tagBody =
  "M8 12a4 4 0 0 1 4-4h11.3a4 4 0 0 1 2.8 1.2l13.7 13.7a4 4 0 0 1 0 5.6L28.5 39.8a4 4 0 0 1-5.6 0L9.2 26.1A4 4 0 0 1 8 23.3Z";
const cylinder = "M9 12a15 5 0 0 1 30 0v24a15 5 0 0 1-30 0Z";

function star(cx, cy, outer, inner) {
  const pts = [];
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? outer : inner;
    const a = ((-90 + i * 36) * Math.PI) / 180;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return poly(pts, pts.map((_, i) => (i % 2 === 0 ? 2.2 : 1.2)));
}

export const content = {
  calendar: {
    label: "Calendar",
    shapes: [rect(8, 11, 32, 29, 5)],
    lines: [
      "M8 20h32",
      "M16 7.5v7",
      "M32 7.5v7",
      { d: dot(16, 27.5), w: 3.6 },
      { d: dot(24, 27.5), w: 3.6 },
      { d: dot(32, 27.5), w: 3.6 },
      { d: dot(16, 33.5), w: 3.6 },
      { d: dot(24, 33.5), w: 3.6 },
    ],
    duo: { cuts: ["M8 20h32", { d: dot(16, 27.5), w: 3.6 }, { d: dot(24, 27.5), w: 3.6 }, { d: dot(32, 27.5), w: 3.6 }, { d: dot(16, 33.5), w: 3.6 }, { d: dot(24, 33.5), w: 3.6 }], rods: ["M16 7.5v7", "M32 7.5v7"] },
  },
  clock: {
    label: "Clock",
    shapes: [circle(24, 24, 15)],
    lines: ["M24 14.5V24l6.5 4"],
  },
  folder: {
    label: "Folder",
    shapes: ["M8 13a5 5 0 0 1 5-5h6.2a3 3 0 0 1 2.5 1.35l1.6 2.3a3 3 0 0 0 2.5 1.35H35a5 5 0 0 1 5 5V35a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5Z"],
  },
  file: {
    label: "File",
    shapes: [filePage],
    lines: [fileFold],
  },
  files: {
    label: "Files",
    shapes: [frontPage],
    lines: [frontFold, "M9 15.5V35a5 5 0 0 0 5 5h17"],
    duo: { bodies: [{ d: rect(9, 15, 24, 25, 5), opacity: 0.62, core: false }, frontPage], cuts: [frontFold] },
  },
  image: {
    label: "Image",
    shapes: [rect(8, 9, 32, 30, 5)],
    lines: [circle(18, 18.5, 3.5), "M40 30 33.1 23.1a3 3 0 0 0-4.2 0L13 39"],
  },
  database: {
    label: "Database",
    shapes: [ellipse(24, 12, 15, 5)],
    lines: ["M9 12v24a15 5 0 0 0 30 0V12", "M9 24a15 5 0 0 0 30 0"],
    duo: { bodies: [cylinder], cuts: ["M9 12a15 5 0 0 0 30 0", "M9 24a15 5 0 0 0 30 0"] },
  },
  cloud: {
    label: "Cloud",
    shapes: ["M32 36H19A11 11 0 1 1 29.25 21H32A7.5 7.5 0 1 1 32 36Z"],
  },
  server: {
    label: "Server",
    shapes: [rect(8, 8, 32, 13, 4), rect(8, 27, 32, 13, 4)],
    lines: [{ d: dot(15, 14.5), w: 3.6 }, { d: dot(15, 33.5), w: 3.6 }, "M22 14.5h11", "M22 33.5h11"],
  },
  tag: {
    label: "Tag",
    shapes: [tagBody],
    lines: [{ d: dot(16, 16), w: 4.2 }],
  },
  bookmark: {
    label: "Bookmark",
    shapes: ["M12 12a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v26.4a1.5 1.5 0 0 1-2.4 1.2L24 32l-9.6 7.6A1.5 1.5 0 0 1 12 38.4Z"],
  },
  star: {
    label: "Star",
    shapes: [star(24, 25.2, 17.5, 8.2)],
  },
  flag: {
    label: "Flag",
    shapes: [],
    lines: ["M11 41V9", flagCloth],
    duo: { bodies: [`${flagCloth}Z`], cuts: [], frost: ["M11 41V9"] },
  },
  mapPin: {
    label: "Map pin",
    shapes: [pinOuter],
    lines: [pinHole],
    duo: { bodies: [{ d: join(pinOuter, pinHole), fillRule: "evenodd" }], cuts: [] },
  },
  globe: {
    label: "Globe",
    shapes: [circle(24, 24, 15)],
    lines: ["M24 9a23 23 0 0 0 0 30 23 23 0 0 0 0-30", "M9 24h30"],
  },
};
