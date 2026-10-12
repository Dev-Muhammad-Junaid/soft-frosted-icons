import { arc, circle, dot, flipX, flipY, join, line, move, polar, poly, rect, rotate } from "../geometry.js";

const playTri = poly([[15.5, 9.5], [38.5, 24], [15.5, 38.5]], [4, 3.5, 4]);
const skipTri = poly([[11, 10], [31, 24], [11, 38]], [3.5, 3, 3.5]);
const speaker =
  "M24 10.7a1.2 1.2 0 0 0-2-.85l-5.6 5.6A2.4 2.4 0 0 1 14.7 16H10a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4.7a2.4 2.4 0 0 1 1.7.7l5.6 5.6a1.2 1.2 0 0 0 2-.85Z";
const thumbCuff = rect(8, 21, 7, 19, 3);
const thumbHand = "M15 23l6.4-12.4a3.4 3.4 0 0 1 6.3 2.3L26.5 21H36a3.5 3.5 0 0 1 3.4 4.3l-2.9 11.7A4 4 0 0 1 32.6 40H15Z";
const horn = poly([[9, 20.5], [38, 11], [38, 37], [9, 27.5]], [2.5, 3, 3, 2.5]);
const crescent = "M24 9a11 11 0 0 0 15 15A15 15 0 1 1 24 9Z";
const rays = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
  const [x0, y0] = polar(24, 24, 12.5, deg);
  const [x1, y1] = polar(24, 24, 16.5, deg);
  return line(x0, y0, x1, y1);
});
const clip = move(rotate("M29 16V31A6 6 0 0 1 17 31V13A3 3 0 0 1 23 13V29", 45, 23, 23.5), 1, 0.5);

export const media = {
  play: {
    label: "Play",
    shapes: [playTri],
  },
  pause: {
    label: "Pause",
    shapes: [rect(13, 10, 8, 28, 3.5), rect(27, 10, 8, 28, 3.5)],
    duo: { bodies: [rect(13, 10, 8, 28, 3.5), rect(27, 10, 8, 28, 3.5)].map((d) => ({ d, inset: 2.4 })) },
  },
  stop: {
    label: "Stop",
    shapes: [rect(10, 10, 28, 28, 6)],
  },
  skipNext: {
    label: "Skip next",
    shapes: [skipTri],
    lines: ["M37 10v28"],
    duo: { cuts: [], rods: ["M37 10v28"] },
  },
  skipPrev: {
    label: "Skip previous",
    shapes: [flipX(skipTri)],
    lines: ["M11 10v28"],
    duo: { cuts: [], rods: ["M11 10v28"] },
  },
  volume: {
    label: "Volume",
    shapes: [speaker],
    lines: [arc(26, 24, 7, -50, 50), arc(26, 24, 14, -50, 50)],
    duo: { cuts: [], rods: [arc(26, 24, 7, -50, 50), arc(26, 24, 14, -50, 50)] },
  },
  mic: {
    label: "Mic",
    shapes: [rect(17, 7, 14, 20, 7)],
    lines: ["M11 22a13 13 0 0 0 26 0", "M24 35v6"],
    duo: { cuts: [], rods: ["M11 22a13 13 0 0 0 26 0", "M24 35v6"] },
  },
  wifi: {
    label: "Wifi",
    lines: [arc(24, 35, 8, -135, -45), arc(24, 35, 16, -135, -45), arc(24, 35, 24, -135, -45), { d: dot(24, 35), w: 4.4 }],
  },
  hash: {
    label: "Hash",
    lines: ["M10 18.5h29", "M9 29.5h29", "M21 8l-3.5 32", "M31 8l-3.5 32"],
  },
  expand: {
    label: "Expand",
    lines: [
      "M17 9h-5a3 3 0 0 0-3 3v5",
      "M39 17v-5a3 3 0 0 0-3-3h-5",
      "M9 31v5a3 3 0 0 0 3 3h5",
      "M31 39h5a3 3 0 0 0 3-3v-5",
    ],
  },
  paperclip: {
    label: "Paperclip",
    lines: [clip],
  },
  scissors: {
    label: "Scissors",
    shapes: [circle(13, 13, 5), circle(13, 35, 5)],
    lines: ["M16.5 31.5 40 8", "M16.5 16.5 20.5 20.5", "M27.5 27.5 40 40"],
    duo: { bodies: [[13, 13], [13, 35]].map(([x, y]) => ({ d: join(circle(x, y, 5.5), circle(x, y, 2)), fillRule: "evenodd", inset: 1.2 })), cuts: [], rods: ["M17.2 30.8 40 8", "M17.2 17.2 20.5 20.5", "M27.5 27.5 40 40"] },
  },
  repeat: {
    label: "Repeat",
    lines: ["M33 7l6 6-6 6", "M9 23v-3a7 7 0 0 1 7-7h23", "M15 41l-6-6 6-6", "M39 25v3a7 7 0 0 1-7 7H9"],
  },
  shuffle: {
    label: "Shuffle",
    lines: [
      "M8 34h3.5a6 6 0 0 0 5-2.8l9-14.4a6 6 0 0 1 5-2.8H40",
      "M8 14h3.5a6 6 0 0 1 5 2.7l1.3 2",
      "M40 34h-9.5a6 6 0 0 1-5-2.7l-1.3-2",
      "M34 8l6 6-6 6",
      "M34 28l6 6-6 6",
    ],
  },
  thumbsUp: {
    label: "Thumbs up",
    shapes: [thumbCuff, thumbHand],
    duo: { bodies: [{ d: thumbCuff, inset: 2 }, thumbHand] },
  },
  thumbsDown: {
    label: "Thumbs down",
    shapes: [flipY(thumbCuff), flipY(thumbHand)],
    duo: { bodies: [{ d: flipY(thumbCuff), inset: 2 }, flipY(thumbHand)] },
  },
  megaphone: {
    label: "Megaphone",
    shapes: [horn],
    lines: ["M23 32.1a6 6 0 1 1-11-3.6"],
    duo: { cuts: [], rods: ["M23 32.1a6 6 0 1 1-11-3.6"] },
  },
  bluetooth: {
    label: "Bluetooth",
    lines: ["M14 15l20 18-10 8V7l10 8-20 18"],
  },
  sun: {
    label: "Sun",
    shapes: [circle(24, 24, 6.5)],
    lines: rays,
    duo: { cuts: [], rods: rays },
  },
  moon: {
    label: "Moon",
    shapes: [crescent],
  },
};
