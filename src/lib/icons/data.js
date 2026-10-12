import { dot, poly, rect } from "../geometry.js";

const bars = [rect(8, 22, 6.5, 18, 3), rect(20.75, 9, 6.5, 31, 3), rect(33.5, 16, 6.5, 24, 3)];
const pie = "M35 27A14 14 0 1 1 21 13v11a3 3 0 0 0 3 3Z";
const wedge = "M27 7a14 14 0 0 1 14 14H30a3 3 0 0 1-3-3Z";
const cartBasket = poly([[12.5, 15], [39, 15], [35, 31], [16, 31]], [0, 1.5, 2.5, 2.5]);
const receiptBody = "M11 11a4 4 0 0 1 4-4h18a4 4 0 0 1 4 4v29l-4.33-2.5-4.34 2.5-4.33-2.5-4.33 2.5-4.34-2.5L11 40Z";
const box = poly([[24, 7], [39, 15.5], [39, 32.5], [24, 41], [9, 32.5], [9, 15.5]], 3);

export const data = {
  chart: {
    label: "Chart",
    shapes: bars,
    duo: { shapes: bars.map((d) => ({ d, inset: 2.1 })) },
  },
  trendingUp: {
    label: "Trending up",
    lines: ["M7 34 18 23l7 7L40 15", "M30 15h10v10"],
  },
  trendingDown: {
    label: "Trending down",
    lines: ["M7 14 18 25l7-7L40 33", "M30 33h10V23"],
  },
  pieChart: {
    label: "Pie chart",
    shapes: [pie, wedge],
    duo: { shapes: [{ d: pie, core: false }], accent: [wedge] },
  },
  activity: {
    label: "Activity",
    lines: [poly([[7, 24], [13, 24], [18, 10.5], [30, 37.5], [35, 24], [41, 24]], [0, 1.5, 1.5, 1.5, 1.5, 0], false)],
  },
  report: {
    label: "Report",
    shapes: [rect(10, 7, 28, 34, 5)],
    lines: ["M17 33v-5", "M24 33V18", "M31 33v-9"],
  },
  wallet: {
    label: "Wallet",
    shapes: [rect(8, 13, 32, 27, 5)],
    lines: ["M12.5 13 30.6 7.6a3 3 0 0 1 3.9 2.9V13", "M40 20h-8a6 6 0 0 0 0 12h8", { d: dot(32, 26), w: 3.4 }],
    duo: {
      lines: ["M12.5 13 30.6 7.6a3 3 0 0 1 3.9 2.9V13"],
      accent: ["M40 20h-8a6 6 0 0 0 0 12h8Z"],
    },
  },
  creditCard: {
    label: "Card",
    shapes: [rect(8, 12, 32, 24, 5)],
    lines: ["M8 20h32", "M14 29h7"],
    duo: { accent: [rect(8, 18, 32, 5)], lines: ["M14 29h7"] },
  },
  dollar: {
    label: "Dollar",
    lines: ["M24 7v34", "M32.5 13.5h-12a6 6 0 0 0 0 12h7a6 6 0 0 1 0 12h-13"],
  },
  cart: {
    label: "Cart",
    shapes: [],
    lines: [
      poly([[7, 8], [11, 8], [16, 31], [35, 31], [39, 15], [12.5, 15]], [0, 1.5, 2.5, 2.5, 1.5, 0], false),
      { d: dot(18.5, 38), w: 4.6 },
      { d: dot(32.5, 38), w: 4.6 },
    ],
    duo: {
      shapes: [{ d: cartBasket, core: true }],
      lines: ["M7 8h4l5 23", { d: dot(18.5, 38), w: 4.6 }, { d: dot(32.5, 38), w: 4.6 }],
    },
  },
  receipt: {
    label: "Receipt",
    shapes: [receiptBody],
    lines: ["M17 16h14", "M17 23h14", "M17 30h8"],
  },
  package: {
    label: "Package",
    shapes: [box],
    lines: ["M9.5 15.8 24 24l14.5-8.2", "M24 24v16.5", "M16.5 11.3l15 8.5"],
  },
};
