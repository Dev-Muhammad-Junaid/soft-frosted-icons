import { circle, dot, poly, rect, rotate } from "../geometry.js";

const bubble = "M8 13a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v15a5 5 0 0 1-5 5H18.6l-7.6 6.2A1.8 1.8 0 0 1 8 37.8Z";
const bellDome =
  "M24 8a10 10 0 0 0-10 10c0 7.2-2.3 9.8-4.6 12A1.7 1.7 0 0 0 10.6 33h26.8a1.7 1.7 0 0 0 1.2-3c-2.3-2.2-4.6-4.8-4.6-12A10 10 0 0 0 24 8Z";
const handset =
  "M12 8h6.7a3 3 0 0 1 2.9 2.2l1.6 5.7a3 3 0 0 1-.9 3l-2.9 2.5a22 22 0 0 0 7.2 7.2l2.5-2.9a3 3 0 0 1 3-.9l5.7 1.6a3 3 0 0 1 2.2 2.9V36a4 4 0 0 1-4 4C21 40 8 27 8 12a4 4 0 0 1 4-4Z";
const plane = poly([[40, 8], [28.5, 40], [22.5, 25.5], [8, 19.5]], [2, 2.5, 1, 2.5]);
const linkLoops = [
  rotate("M19 32H15A8 8 0 0 1 15 16H19", -45),
  rotate("M29 16H33A8 8 0 0 1 33 32H29", -45),
  rotate("M18.5 24H29.5", -45),
];
const nodes = [circle(34, 12, 5), circle(14, 24, 5), circle(34, 36, 5)];
const edges = ["M18.3 21.4 29.7 14.6", "M18.3 26.6 29.7 33.4"];

export const comms = {
  mail: {
    label: "Mail",
    shapes: [rect(8, 12, 32, 24, 5)],
    lines: ["M9.5 15.5 21.2 24.6a4.5 4.5 0 0 0 5.6 0L38.5 15.5"],
  },
  send: {
    label: "Send",
    shapes: [plane],
    lines: ["M22.5 25.5 33.5 14.5"],
    duo: { lines: [], accent: [poly([[40, 8], [28.5, 40], [22.5, 25.5]], [2, 2.5, 1])] },
  },
  inbox: {
    label: "Inbox",
    shapes: ["M15 9h18a3 3 0 0 1 2.8 1.9L40 23v12a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5V23l4.2-12.1A3 3 0 0 1 15 9Z"],
    lines: ["M8 23h8.5l3 5h9l3-5H40"],
  },
  chat: {
    label: "Chat",
    shapes: [bubble],
    lines: [{ d: dot(16, 20.5), w: 4 }, { d: dot(24, 20.5), w: 4 }, { d: dot(32, 20.5), w: 4 }],
  },
  bell: {
    label: "Bell",
    shapes: [bellDome],
    lines: ["M20.5 38.5a3.8 3.8 0 0 0 7 0"],
    core: true,
  },
  phone: {
    label: "Phone",
    shapes: [handset],
  },
  link: {
    label: "Link",
    lines: linkLoops,
  },
  share: {
    label: "Share",
    shapes: nodes,
    lines: edges,
    core: true,
  },
  at: {
    label: "Mention",
    shapes: [circle(24, 24, 6.5)],
    lines: ["M30.5 17.5v8a4.5 4.5 0 0 0 9 0V24A15.5 15.5 0 1 0 33 36.5"],
    core: true,
  },
};
