import { circle, dot, move, poly, rect, rotate } from "../geometry.js";

const cameraBody =
  "M8 18a5 5 0 0 1 5-5h3.5l2.4-3.6A3 3 0 0 1 21.4 8h5.2a3 3 0 0 1 2.5 1.4l2.4 3.6H35a5 5 0 0 1 5 5v17a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5Z";
const videoLens = "M31 21l7.6-4.4a1.6 1.6 0 0 1 2.4 1.4v12a1.6 1.6 0 0 1-2.4 1.4L31 27";
const printerBody = "M14 33h-2a4 4 0 0 1-4-4v-9a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-2";
const giftBox = "M38 24v12a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V24";
const truckCab = "M27 17h6.4a2 2 0 0 1 1.6.8l5.6 7a2 2 0 0 1 .4 1.2V32a2 2 0 0 1-2 2h-2.5";
const awning = "M7 17l3.4-6.8A4 4 0 0 1 14 8h20a4 4 0 0 1 3.6 2.2L41 17";
const scallops = "M7 17v2a5.67 5.67 0 0 0 11.33 0 5.67 5.67 0 0 0 11.34 0 5.67 5.67 0 0 0 11.33 0v-2";
const awningBody =
  "M7 17l3.4-6.8A4 4 0 0 1 14 8h20a4 4 0 0 1 3.6 2.2L41 17v2a5.67 5.67 0 0 1-11.33 0 5.67 5.67 0 0 1-11.34 0 5.67 5.67 0 0 1-11.33 0Z";
const cup = "M8 19.5A1.5 1.5 0 0 1 9.5 18h21a1.5 1.5 0 0 1 1.5 1.5V32a8 8 0 0 1-8 8h-8a8 8 0 0 1-8-8Z";
const canopy = "M41 24A17 17 0 0 0 7 24Z";
const cupL = "M8 26h5a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3Z";
const cupR = "M40 26h-5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3Z";
const pinHead =
  "M17 7h14a3 3 0 0 1 0 6h-2v6.2a3 3 0 0 0 1.7 2.7l3 1.5a3 3 0 0 1 1.7 2.7V28a3 3 0 0 1-3 3H15.6a3 3 0 0 1-3-3v-1.9a3 3 0 0 1 1.7-2.7l3-1.5a3 3 0 0 0 1.7-2.7V13h-2a3 3 0 0 1 0-6Z";
/* Brush drawn upright (handle → ferrule → bristles), then laid on the diagonal. */
const brushHandle = move(rotate("M24 4.5V17", 45), 0.5, -0.5);
const brushFerrule = move(rotate(rect(20, 18, 8, 8, 2), 45), 0.5, -0.5);
const brushTip = move(rotate("M18 33a6 6 0 0 1 12 0c0 4.4-2.8 7.9-6 10.5-3.2-2.6-6-6.1-6-10.5Z", 45), 0.5, -0.5);
const heart = "M24 39S8 29.5 8 18.5A8.5 8.5 0 0 1 24 14.6 8.5 8.5 0 0 1 40 18.5C40 29.5 24 39 24 39Z";
const sheet =
  "M13 40h22a5 5 0 0 0 5-5V12a4 4 0 0 0-4-4H20a4 4 0 0 0-4 4v24.5a3.5 3.5 0 0 1-7 0V24a3 3 0 0 1 3-3h4";
const mapShape = poly([[7, 12], [18, 7], [30, 12], [41, 7], [41, 36], [30, 41], [18, 36], [7, 41]], 2.5);
const screen = "M8 17v-4a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5h-8";
const windows = [
  [17.5, 15], [24, 15], [30.5, 15],
  [17.5, 21.5], [24, 21.5], [30.5, 21.5],
  [17.5, 28], [30.5, 28],
].map(([x, y]) => ({ d: dot(x, y), w: 3.4 }));

export const objects = {
  camera: {
    label: "Camera",
    shapes: [cameraBody],
    lines: [circle(24, 26, 6.5)],
    duo: { inlay: true },
  },
  video: {
    label: "Video",
    shapes: [rect(7, 13, 24, 22, 5)],
    lines: [videoLens],
    duo: { bodies: [rect(7, 13, 24, 22, 5), { d: `${videoLens}Z`, inset: 2.2 }], cuts: [] },
  },
  printer: {
    label: "Printer",
    shapes: [],
    lines: [printerBody, "M14 16V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7", rect(14, 26, 20, 15, 2.5)],
    duo: { bodies: [rect(8, 16, 32, 17, 4), { d: rect(14, 26, 20, 15, 2.5), inset: 2.6 }], cuts: [], frost: ["M14 17V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"] },
  },
  battery: {
    label: "Battery",
    shapes: [rect(7, 14, 29, 20, 5)],
    lines: ["M40.5 21v6", "M14 21v6", "M20 21v6"],
    duo: { cuts: ["M14 21v6", "M20 21v6"], frost: ["M40.5 21v6"], inlay: true },
  },
  gift: {
    label: "Gift",
    shapes: [rect(7, 16, 34, 8, 3)],
    lines: [giftBox, "M24 16v24", "M24 16c-2-4.5-5-8-8.5-8a4 4 0 0 0 0 8", "M24 16c2-4.5 5-8 8.5-8a4 4 0 0 1 0 8"],
    duo: { bodies: [`${giftBox}Z`, { d: rect(7, 16, 34, 8, 3), inset: 2.2 }], cuts: ["M24 16v24"], frost: ["M24 16c-2-4.5-5-8-8.5-8a4 4 0 0 0 0 8", "M24 16c2-4.5 5-8 8.5-8a4 4 0 0 1 0 8"], inlay: true },
  },
  truck: {
    label: "Truck",
    shapes: [circle(15, 34, 3.5), circle(33, 34, 3.5)],
    lines: ["M11.5 34H9a2 2 0 0 1-2-2V14a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v20", "M18.5 34h11", truckCab],
    duo: { bodies: [rect(7, 10, 20, 24, 4), "M27 17h6.4a2 2 0 0 1 1.6.8l5.6 7a2 2 0 0 1 .4 1.2V32a2 2 0 0 1-2 2H27Z", { d: circle(15, 34, 4.2), inset: 1.2 }, { d: circle(33, 34, 4.2), inset: 1.2 }], cuts: [] },
  },
  store: {
    label: "Store",
    shapes: [],
    lines: [awning, "M7 17h34", scallops, "M10 25v11a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V25", "M20 40v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6"],
    duo: { bodies: ["M10 23.6v12.4a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V23.6Z", { d: awningBody, inset: 2.4 }], cuts: [{ d: "M24 36V41", w: 7 }] },
  },
  briefcase: {
    label: "Briefcase",
    shapes: [rect(7, 15, 34, 25, 5)],
    lines: ["M18 15v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3", "M7 26h34"],
    duo: { cuts: ["M7 26h34"], frost: ["M18 16v-4a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v4"] },
  },
  building: {
    label: "Building",
    shapes: [rect(10, 7, 28, 34, 5)],
    lines: [...windows, "M20.5 41v-6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v6"],
    duo: { inlay: true },
  },
  compass: {
    label: "Compass",
    shapes: [circle(24, 24, 15)],
    lines: [poly([[30.5, 17.5], [26.8, 26.8], [17.5, 30.5], [21.2, 21.2]], [1.5, 2, 1.5, 2])],
    duo: { inlay: true },
  },
  coffee: {
    label: "Coffee",
    shapes: [cup],
    lines: ["M32 21h2.5a5.5 5.5 0 0 1 0 11H32", "M14 8v4.5", "M20 8v4.5", "M26 8v4.5"],
    duo: { cuts: [], frost: ["M32 21h2.5a5.5 5.5 0 0 1 0 11H32", "M14 8v4.5", "M20 8v4.5", "M26 8v4.5"] },
  },
  umbrella: {
    label: "Umbrella",
    shapes: [canopy],
    lines: ["M24 24v12a3.5 3.5 0 0 0 7 0"],
    duo: { cuts: [], frost: ["M24 24v12a3.5 3.5 0 0 0 7 0"] },
  },
  headphones: {
    label: "Headphones",
    shapes: [cupL, cupR],
    lines: ["M8 33V24a16 16 0 0 1 32 0v9"],
    duo: { bodies: [cupL, cupR].map((d) => ({ d, inset: 2.2 })), cuts: [], frost: ["M8 28v-4a16 16 0 0 1 32 0v4"] },
  },
  pin: {
    label: "Pin",
    shapes: [pinHead],
    lines: ["M24 31v10"],
    duo: { cuts: [], frost: ["M24 30v11"] },
  },
  paintBrush: {
    label: "Paint brush",
    shapes: [brushFerrule, brushTip],
    lines: [brushHandle],
    duo: { bodies: [{ d: brushFerrule, inset: 2.2 }, brushTip], cuts: [], frost: [brushHandle] },
  },
  heart: {
    label: "Heart",
    shapes: [heart],
  },
  newspaper: {
    label: "Newspaper",
    shapes: [],
    lines: [sheet, "M22 15h12", "M22 22h12", "M22 29h8"],
    duo: { bodies: [{ d: "M16 21h-4a3 3 0 0 0-3 3v12.5a3.5 3.5 0 0 0 7 0Z", opacity: 0.7, core: false }, "M16 12a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v23a5 5 0 0 1-5 5H12.5a3.5 3.5 0 0 0 3.5-3.5Z"], cuts: ["M22 15h12", "M22 22h12", "M22 29h8"], inlay: true },
  },
  map: {
    label: "Map",
    shapes: [mapShape],
    lines: ["M18 7v29", "M30 12v29"],
  },
  film: {
    label: "Film",
    shapes: [rect(8, 8, 32, 32, 5)],
    lines: ["M16 8v32", "M32 8v32", "M8 24h32", "M8 16h8", "M8 32h8", "M32 16h8", "M32 32h8"],
    duo: { cuts: ["M16 8v32", "M32 8v32", ...[12, 36].flatMap((x) => [15, 24, 33].map((y) => ({ d: dot(x, y), w: 3.4 })))], inlay: true },
  },
  cast: {
    label: "Cast",
    shapes: [],
    lines: [screen, "M8 23a13 13 0 0 1 13 13", "M8 29.5a6.5 6.5 0 0 1 6.5 6.5", { d: dot(8.5, 35.5), w: 3.6 }],
    duo: { bodies: ["M8 17v-4a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5h-8A19 19 0 0 0 8 17Z"], rods: [{ d: dot(8.5, 35.5), w: 3.6 }], frost: ["M8 23a13 13 0 0 1 13 13", "M8 29.5a6.5 6.5 0 0 1 6.5 6.5"] },
  },
};
