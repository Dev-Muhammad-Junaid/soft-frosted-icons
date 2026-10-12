import { dot, poly, rect } from "../geometry.js";

const frame = rect(8, 9, 32, 30, 5);

export const navigation = {
  home: {
    label: "Home",
    shapes: [poly([[10, 21], [24, 9.5], [38, 21], [38, 40], [10, 40]], [2.5, 3, 2.5, 5, 5])],
    lines: ["M20 40v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8"],
    duo: { lines: [], accent: [rect(20, 28.5, 8, 8, 2.5)] },
  },
  dashboard: {
    label: "Dashboard",
    shapes: [rect(9, 9, 12, 15, 4), rect(27, 9, 12, 9, 4), rect(27, 24, 12, 15, 4), rect(9, 30, 12, 9, 4)],
    duo: {
      shapes: [
        rect(9, 9, 12, 15, 4),
        { d: rect(27, 9, 12, 9, 4), inset: 2.6 },
        rect(27, 24, 12, 15, 4),
        { d: rect(9, 30, 12, 9, 4), inset: 2.6 },
      ],
    },
  },
  grid: {
    label: "Grid",
    shapes: [rect(9, 9, 12, 12, 4), rect(27, 9, 12, 12, 4), rect(9, 27, 12, 12, 4), rect(27, 27, 12, 12, 4)],
  },
  layout: {
    label: "Layout",
    shapes: [frame],
    lines: ["M8 18.5h32", "M19 18.5V39"],
    duo: {
      shapes: [{ d: rect(8, 9, 32, 8, 3.5), core: true, inset: 2.3 }, rect(8, 20, 9, 19, 3.5), rect(20, 20, 20, 19, 3.5)],
      lines: [],
    },
  },
  sidebar: {
    label: "Sidebar",
    shapes: [frame],
    lines: ["M19 9v30"],
    duo: { shapes: [{ d: rect(8, 9, 9, 30, 3.5), core: true, inset: 2.3 }, rect(20, 9, 20, 30, 4)], lines: [] },
  },
  panels: {
    label: "Panels",
    shapes: [rect(8, 9, 13, 30, 4.5), rect(27, 9, 13, 30, 4.5)],
  },
  table: {
    label: "Table",
    shapes: [frame],
    lines: ["M8 18.5h32", "M8 28.5h32", "M19.5 18.5V39"],
    duo: {
      shapes: [
        { d: rect(8, 9, 32, 8, 3.5), core: true, inset: 2.3 },
        rect(8, 20, 9.5, 8.5, 3),
        rect(20.5, 20, 19.5, 8.5, 3),
        rect(8, 30.5, 9.5, 8.5, 3),
        rect(20.5, 30.5, 19.5, 8.5, 3),
      ],
      lines: [],
    },
  },
  list: {
    label: "List",
    lines: [
      { d: dot(10.5, 14), w: 4 },
      { d: dot(10.5, 24), w: 4 },
      { d: dot(10.5, 34), w: 4 },
      "M18 14h21",
      "M18 24h21",
      "M18 34h21",
    ],
  },
  columns: {
    label: "Columns",
    shapes: [frame],
    lines: ["M18.7 9v30", "M29.3 9v30"],
    duo: {
      shapes: [rect(8, 9, 8.7, 30, 3), { d: rect(19.65, 9, 8.7, 30, 3), core: true, inset: 2.3 }, rect(31.3, 9, 8.7, 30, 3)],
      lines: [],
    },
  },
  menu: {
    label: "Menu",
    lines: ["M10 14h28", "M10 24h28", "M10 34h28"],
  },
};
