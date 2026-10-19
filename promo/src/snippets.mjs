/**
 * Static HTML for every scene, rendered from the package itself: icons come from
 * `iconSVG()` in src/render.js and the use-case mocks are lifted straight out of
 * index.html, with each <frosted-icon> swapped for the SVG it would render.
 */
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { iconSVG, iconNames, ICON_CATEGORIES } from "../../src/index.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

// Same swatches as the demo lab.
export const COLOURS = {
  sky: "hsl(199 85% 48%)",
  indigo: "hsl(234 75% 58%)",
  violet: "hsl(270 70% 58%)",
  rose: "hsl(345 80% 56%)",
  coral: "hsl(14 85% 56%)",
  amber: "hsl(38 92% 48%)",
  emerald: "hsl(155 65% 40%)",
  teal: "hsl(178 70% 38%)",
  slate: "hsl(215 20% 45%)",
};

let uid = 0;
/** Deterministic ids keep every build byte-identical. */
export function icon(name, { finish = "outline", size = 48, color, cls = "" } = {}) {
  uid += 1;
  const svg = iconSVG(name, { finish, size, color, id: `p${uid}` });
  return cls ? svg.replace(/class="([^"]*)"/, `class="$1 ${cls}"`) : svg;
}

/** Outline + duo pair stacked in one slot; the timeline cross-fades between them. */
export function pair(name, { size = 48, color } = {}) {
  return `<span class="pair" style="width:${size}px;height:${size}px">${icon(name, { size, color, cls: "f-out" })}${icon(name, { finish: "duo", size, color, cls: "f-duo" })}</span>`;
}

/* ——— index.html use cases ——— */

function parseAttrs(s) {
  const out = {};
  for (const m of s.matchAll(/([a-z-]+)(?:="([^"]*)")?/g)) out[m[1]] = m[2] ?? "";
  return out;
}

function inlineIcons(html) {
  return html
    .replace(/<frosted-icon([^>]*)><\/frosted-icon>/g, (_, a) => {
      const at = parseAttrs(a);
      const size = /em$/.test(at.size) ? 20 : Number(at.size || 24);
      return icon(at.name, { finish: at.finish || "outline", size, color: at.color });
    })
    .replace(/<img src="svg\/(outline|duo)\/([a-z-]+)\.svg"[^>]*>/g, (_, finish, file) => {
      const name = iconNames().find((n) => n.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`) === file);
      return icon(name, { finish, size: 48 });
    })
    .replace(/ href="#uses"/g, "");
}

function useCases() {
  const page = readFileSync(join(ROOT, "index.html"), "utf8");
  const cards = [...page.matchAll(/<article class="use card">([\s\S]*?)<\/article>/g)].map((m) => {
    const demo = m[1].match(/<div class="use-demo">([\s\S]*?)<\/div>\s*<div class="use-body">/)[1];
    const title = m[1].match(/<h3>([^<]*)<\/h3>/)[1];
    return { title, html: inlineIcons(demo.trim()) };
  });
  return Object.fromEntries(cards.map((c) => [c.title, c.html]));
}

/* ——— scenes ——— */

const WALL_ICONS = [
  "bell", "calendar", "rocket", "chat", "folder", "shield", "heart", "settings",
  "camera", "sparkles", "home", "search", "wallet", "mail", "chart", "cloud",
  "lock", "star", "music", "globe", "gift", "zap", "user", "image",
  "coffee", "compass", "headphones", "map", "truck", "trendingUp", "database", "code",
];

const HERO_ICONS = ["home", "bell", "heart", "calendar", "camera", "rocket", "mail", "settings", "cloud", "shield", "chart", "sparkles"];

// Big single-icon slides: [name, finish, theme, colour or null]
export const ICON_SLIDES = [
  ["rocket", "duo", "soft-glass", null],
  ["bell", "outline", "dusk", null],
  ["heart", "duo", "aurora", "rose"],
  ["wallet", "duo", "midnight", null],
  ["calendar", "outline", "crystal", "indigo"],
  ["camera", "duo", "dusk", "teal"],
  ["shield", "outline", "soft-glass", "emerald"],
  ["sparkles", "duo", "midnight", "violet"],
  ["coffee", "duo", "soft-glass", "coral"],
  ["globe", "outline", "aurora", "sky"],
];

const label = (n) => n.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

export function renderSnippets() {
  const names = iconNames();
  const tints = Object.values(COLOURS);
  const uses = useCases();

  const wall = WALL_ICONS.filter((n) => names.includes(n))
    .slice(0, 24)
    .map((n, i) => `<div class="w-tile glass" data-i="${i}">${pair(n, { size: 46, color: i % 4 === 0 ? null : tints[i % tints.length] })}</div>`)
    .join("");

  const wallDark = WALL_ICONS.filter((n) => names.includes(n))
    .slice(0, 10)
    .map((n, i) => `<div class="th-mini">${icon(n, { finish: i % 2 ? "outline" : "duo", size: 40, color: tints[(i * 2) % tints.length] })}</div>`)
    .join("");

  // One render per theme layer: paint ids must be unique in the document.
  const hero = () => HERO_ICONS.map((n) => `<span class="hero-ic">${pair(n, { size: 56 })}</span>`).join("");
  const heroCode = `<frosted-icon name="bell" finish="duo"></frosted-icon>`;

  // "One colour" lab: big glyph grid driven by one --sfi-color.
  const labIcons = ["bell", "calendar", "rocket", "chat", "folder", "heart", "camera", "settings"]
    .map((n) => `<span class="lab-ic">${pair(n, { size: 62 })}</span>`)
    .join("");

  const slides = ICON_SLIDES.map(([n, finish, theme, colour]) => ({
    name: n,
    label: label(n),
    index: names.indexOf(n) + 1,
    finish,
    theme,
    colour: colour ? COLOURS[colour] : null,
    html: icon(n, { finish, size: 300, color: colour ? COLOURS[colour] : undefined }),
  }));

  // The whole catalog, in category order.
  const catalog = ICON_CATEGORIES.flatMap((g) => g.icons).map((n, i) =>
    `<span class="cat" data-i="${i}">${icon(n, { finish: i % 3 === 1 ? "outline" : "duo", size: 40, color: tints[Math.floor(i / 2) % tints.length] })}</span>`,
  );

  const sizes = [16, 20, 24, 32, 48, 64, 96].map(
    (s) => `<figure class="sz" data-s="${s}"><span class="sz-art">${icon("camera", { size: s })}${icon("camera", { finish: "duo", size: s })}</span><figcaption>${s}px</figcaption></figure>`,
  );

  const logo = icon("sparkles", { finish: "duo", size: 120 });
  const logoSmall = icon("sparkles", { finish: "duo", size: 96 });

  return {
    total: names.length,
    wall,
    wallDark,
    hero,
    heroCode,
    labIcons,
    slides,
    catalog,
    sizes,
    logo,
    logoSmall,
    uses,
    thumbIcon: (n, finish) => icon(names.includes(n) ? n : "heart", { finish, size: 54 }),
  };
}
