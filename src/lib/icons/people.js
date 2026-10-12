import { circle, rect } from "../geometry.js";

/** Soft shoulder dome from (cx ± w/2, bottom) up to `top`. */
function shoulders(cx, w, top, bottom = 40, closed = false) {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const k = (bottom - top) * 0.32;
  if (closed) {
    // Body for the duo finish: same dome, soft bottom corners.
    const r = 3;
    return (
      `M${x0} ${bottom - r}C${x0} ${top + k} ${cx - w * 0.28} ${top} ${cx} ${top}` +
      `S${x1} ${top + k} ${x1} ${bottom - r}a${r} ${r} 0 0 1-${r} ${r}H${x0 + r}a${r} ${r} 0 0 1-${r}-${r}Z`
    );
  }
  return `M${x0} ${bottom}C${x0} ${top + k} ${cx - w * 0.28} ${top} ${cx} ${top}S${x1} ${top + k} ${x1} ${bottom}`;
}

const lockBody = rect(10, 21, 28, 19, 5);
const almond = "M7.6 24.7a1.6 1.6 0 0 1 0-1.4C10.6 16.2 16.9 11.5 24 11.5s13.4 4.7 16.4 11.8a1.6 1.6 0 0 1 0 1.4C37.4 31.8 31.1 36.5 24 36.5S10.6 31.8 7.6 24.7Z";
const shieldBody =
  "M24 8c3.3 2.6 7.6 3.9 12.5 4.1a1.5 1.5 0 0 1 1.5 1.5V23c0 8.6-5.9 13.7-13.3 16.3a2.1 2.1 0 0 1-1.4 0C15.9 36.7 10 31.6 10 23v-9.4a1.5 1.5 0 0 1 1.5-1.5C16.4 11.9 20.7 10.6 24 8Z";

export const people = {
  user: {
    label: "User",
    shapes: [circle(24, 15.5, 7.5)],
    lines: [shoulders(24, 28, 29)],
    duo: { bodies: [circle(24, 15.5, 7.5), shoulders(24, 28, 29, 40, true)], cuts: [] },
  },
  users: {
    label: "Users",
    shapes: [circle(19, 16, 6.5)],
    lines: [shoulders(19, 24, 29), "M30.5 9.8a6.5 6.5 0 0 1 0 12.4", "M35 30.2c3.5 1.6 6 4.9 6 9.8"],
    duo: { bodies: [{ d: circle(31, 16, 6.5), opacity: 0.62 }, { d: shoulders(32, 18, 29.5, 40, true), opacity: 0.62 }, circle(19, 16, 6.5), shoulders(19, 24, 29, 40, true)], cuts: [] },
  },
  userPlus: {
    label: "User plus",
    shapes: [circle(18, 16, 6.5)],
    lines: [shoulders(18, 22, 29), "M35 13v12", "M29 19h12"],
    duo: { bodies: [circle(18, 16, 6.5), shoulders(18, 22, 29, 40, true)], cuts: [], rods: ["M35 13v12", "M29 19h12"] },
  },
  lock: {
    label: "Lock",
    shapes: [lockBody],
    lines: ["M16 21v-5a8 8 0 0 1 16 0v5", "M24 28.5v4"],
    duo: { cuts: ["M24 28.5v4"], rods: ["M16 21v-5a8 8 0 0 1 16 0v5"] },
  },
  unlock: {
    label: "Unlock",
    shapes: [lockBody],
    lines: ["M16 21v-5a8 8 0 0 1 15.4-3", "M24 28.5v4"],
    duo: { cuts: ["M24 28.5v4"], rods: ["M16 21v-5a8 8 0 0 1 15.4-3"] },
  },
  shield: {
    label: "Shield",
    shapes: [shieldBody],
    lines: ["M18.5 24l4 4 7.5-7.5"],
  },
  key: {
    label: "Key",
    shapes: [circle(16.5, 31.5, 8)],
    lines: ["M22.2 25.8 39.5 8.5", "M34 14l4.5 4.5", "M28.5 19.5l3.5 3.5"],
    duo: { cuts: [{ d: "M16.5 31.5h0.01", w: 4.6 }], rods: ["M22.2 25.8 39.5 8.5", "M34 14l4.5 4.5", "M28.5 19.5l3.5 3.5"] },
  },
  eye: {
    label: "Eye",
    shapes: [almond],
    lines: [circle(24, 24, 5.5)],
  },
  eyeOff: {
    label: "Eye off",
    shapes: [almond],
    lines: [circle(24, 24, 5.5)],
    cut: "M9.5 9.5 38.5 38.5",
  },
  login: {
    label: "Login",
    lines: ["M28 8h7a5 5 0 0 1 5 5v22a5 5 0 0 1-5 5h-7", "M8 24h20", "M19.5 15.5 28 24l-8.5 8.5"],
  },
  logout: {
    label: "Logout",
    lines: ["M20 8h-7a5 5 0 0 0-5 5v22a5 5 0 0 0 5 5h7", "M20 24h20", "M31.5 15.5 40 24l-8.5 8.5"],
  },
};

export { shoulders };
