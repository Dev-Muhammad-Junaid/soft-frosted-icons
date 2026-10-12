import { circle, dot, flipX, flipY, poly, rect, rotate } from "../geometry.js";

/* Pencil drawn upright, then laid on the 45° diagonal. */
const pencilBody = rotate(poly([[24, 4.5], [28.2, 13], [28.2, 41.5], [19.8, 41.5], [19.8, 13]], [1.2, 0.5, 3, 3, 0.5]), -135);
const pencilBand = rotate("M19.8 35.5H28.2", -135);
const pencilCap = rotate(poly([[19.8, 35.5], [28.2, 35.5], [28.2, 41.5], [19.8, 41.5]], [0, 0, 3, 3]), -135);

const tray = "M8 29v6a5 5 0 0 0 5 5h22a5 5 0 0 0 5-5v-6";
const arrowRight = ["M10 24h28", "M27 13l11 11-11 11"];

export const actions = {
  search: {
    label: "Search",
    shapes: [circle(21.5, 21.5, 12.5)],
    lines: ["M30.6 30.6 39 39"],
    duo: { cuts: [], frost: ["M30.6 30.6 39 39"] },
  },
  filter: {
    label: "Filter",
    shapes: [poly([[8, 10], [40, 10], [28, 24], [28, 39], [20, 35], [20, 24]], [3, 3, 3, 1.5, 1.5, 3])],
  },
  sort: {
    label: "Sort",
    lines: ["M9 14h17", "M9 24h12", "M9 34h7", "M34 10v28", "M28 32l6 6 6-6"],
    duo: { rods: ["M34 10v28", "M28 32l6 6 6-6"], frost: ["M9 14h17", "M9 24h12", "M9 34h7"] },
  },
  more: {
    label: "More",
    lines: [{ d: dot(13, 24), w: 5 }, { d: dot(24, 24), w: 5 }, { d: dot(35, 24), w: 5 }],
    duo: { bodies: [circle(13, 24, 4), circle(24, 24, 4), circle(35, 24, 4)].map((d) => ({ d, inset: 1.15 })), cuts: [] },
  },
  close: {
    label: "Close",
    lines: ["M13.5 13.5 34.5 34.5", "M34.5 13.5 13.5 34.5"],
  },
  check: {
    label: "Check",
    lines: ["M10.5 24.5 19.5 33.5 37.5 15.5"],
  },
  plus: {
    label: "Plus",
    lines: ["M24 11v26", "M11 24h26"],
  },
  minus: {
    label: "Minus",
    lines: ["M11 24h26"],
  },
  edit: {
    label: "Edit",
    shapes: [pencilBody],
    lines: [pencilBand],
  },
  trash: {
    label: "Trash",
    shapes: [poly([[11.5, 13], [36.5, 13], [34.5, 40], [13.5, 40]], [0, 0, 4, 4])],
    lines: ["M8 13h32", "M18 13v-2.5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V13", "M20 20.5v12", "M28 20.5v12"],
    duo: { cuts: ["M20 20.5v12", "M28 20.5v12"], rods: ["M8 13h32"], frost: ["M18 13v-2.5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V13"], hug: false },
  },
  copy: {
    label: "Copy",
    shapes: [rect(17, 17, 23, 23, 5)],
    lines: ["M10.5 31A3.5 3.5 0 0 1 7 27.5V12a5 5 0 0 1 5-5h15.5a3.5 3.5 0 0 1 3.5 3.5"],
    duo: { bodies: [{ d: rect(7, 7, 24, 24, 5), opacity: 0.62, core: false }, rect(17, 17, 23, 23, 5)], cuts: [] },
  },
  save: {
    label: "Save",
    shapes: [poly([[8, 8], [32, 8], [40, 16], [40, 40], [8, 40]], [5, 2.5, 2.5, 5, 5])],
    lines: ["M15 40v-9.5a2.5 2.5 0 0 1 2.5-2.5h13a2.5 2.5 0 0 1 2.5 2.5V40", "M15 8v5.5a2.5 2.5 0 0 0 2.5 2.5H28"],
  },
  download: {
    label: "Download",
    lines: ["M24 8v20", "M16 20l8 8 8-8", tray],
    duo: { rods: ["M24 8v20", "M16 20l8 8 8-8"], frost: [tray] },
  },
  upload: {
    label: "Upload",
    lines: ["M24 28V8", "M16 16l8-8 8 8", tray],
    duo: { rods: ["M24 28V8", "M16 16l8-8 8 8"], frost: [tray] },
  },
  refresh: {
    label: "Refresh",
    lines: [
      "M10 24a14 14 0 0 1 14-14c3.9 0 7.6 1.6 10.3 4.3L38 18",
      "M38 9v9h-9",
      "M38 24a14 14 0 0 1-14 14c-3.9 0-7.6-1.6-10.3-4.3L10 30",
      "M10 39v-9h9",
    ],
    duo: { rods: ["M38 9v9h-9", "M10 39v-9h9"], frost: ["M10 24a14 14 0 0 1 14-14c3.9 0 7.6 1.6 10.3 4.3L38 18", "M38 24a14 14 0 0 1-14 14c-3.9 0-7.6-1.6-10.3-4.3L10 30"] },
  },
  externalLink: {
    label: "External link",
    shapes: [],
    lines: ["M34 27v8a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5V19a5 5 0 0 1 5-5h8", "M24 24 40 8", "M29 8h11v11"],
    duo: { rods: ["M24 24 40 8", "M29 8h11v11"], frost: ["M34 27v8a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5V19a5 5 0 0 1 5-5h8"] },
  },
  arrowLeft: {
    label: "Arrow left",
    lines: arrowRight.map((d) => flipX(d)),
    duo: { rods: [flipX(arrowRight[1])], frost: [flipX(arrowRight[0])] },
  },
  arrowRight: {
    label: "Arrow right",
    lines: arrowRight,
    duo: { rods: [arrowRight[1]], frost: [arrowRight[0]] },
  },
  arrowUp: {
    label: "Arrow up",
    lines: arrowRight.map((d) => rotate(d, -90)),
    duo: { rods: [rotate(arrowRight[1], -90)], frost: [rotate(arrowRight[0], -90)] },
  },
  arrowDown: {
    label: "Arrow down",
    lines: arrowRight.map((d) => rotate(d, 90)),
    duo: { rods: [rotate(arrowRight[1], 90)], frost: [rotate(arrowRight[0], 90)] },
  },
  chevronRight: { label: "Chevron right", lines: ["M19 11.5 31.5 24 19 36.5"] },
  chevronLeft: { label: "Chevron left", lines: [flipX("M19 11.5 31.5 24 19 36.5")] },
  chevronUp: { label: "Chevron up", lines: [rotate("M19 11.5 31.5 24 19 36.5", -90)] },
  chevronDown: { label: "Chevron down", lines: [flipY(rotate("M19 11.5 31.5 24 19 36.5", -90))] },
};
