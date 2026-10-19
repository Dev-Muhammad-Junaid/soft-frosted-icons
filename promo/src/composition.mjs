/**
 * Assembles one HyperFrames composition (index.html) per output format from
 * the icon snippets, the demo page's stylesheet, and the shared timeline.
 */

export const FORMATS = {
  landscape: { width: 1920, height: 1080, stageW: 1280, stageH: 720 },
  vertical: { width: 1080, height: 1920, stageW: 720, stageH: 1280 },
  thumbnail: { width: 1280, height: 720, stageW: 1280, stageH: 720 },
};

export const DURATION = 32.5;

// Same surfaces as the demo's lab and large view.
export const THEMES = [
  { id: "soft-glass", name: "Soft Glass", dot: "#e6ebf3", bg: "radial-gradient(120% 90% at 50% 32%, #f7f9fc 0, #dde4ef 100%)", dark: false },
  { id: "crystal", name: "Crystal", dot: "#edf4fb", bg: "radial-gradient(120% 90% at 50% 32%, #ffffff 0, #e4edf8 100%)", dark: false },
  { id: "aurora", name: "Aurora", dot: "#ebe8f8", bg: "radial-gradient(120% 90% at 50% 32%, #f8f5fe 0, #e0d9f4 100%)", dark: false },
  { id: "dusk", name: "Dusk", dot: "#151a24", bg: "radial-gradient(120% 90% at 50% 32%, #263042 0, #0f131b 100%)", dark: true },
  { id: "midnight", name: "Midnight", dot: "#121010", bg: "radial-gradient(120% 90% at 50% 32%, #2a2420 0, #0c0a09 100%)", dark: true },
];
const THEME = Object.fromEntries(THEMES.map((t) => [t.id, t]));

// Use-case windows for the coverflow: [window title, page mode, demo titles from index.html]
const USE_FRAMES = [
  ["App navigation", "light", ["App navigation", "Toolbars and buttons"]],
  ["Status and feedback", "light", ["Status and feedback", "Inline with text"]],
  ["Dark mobile UI", "dark", ["Dark mobile UI"]],
  ["Dashboards", "light", ["Dashboards", "Files and lists"]],
  ["Empty states", "dark", ["Empty states", "Plain SVG files"]],
];

const blobs = () =>
  `<div class="bgfx" aria-hidden="true"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i><i class="blob b4"></i></div>`;

const sceneAttrs = (id) => `data-sfi-theme="${id}" data-mode="${THEME[id].dark ? "dark" : "light"}" style="--scene-bg:${THEME[id].bg}"`;

function themeSwitch(active) {
  const dots = THEMES.map(
    (t, i) => `<span class="tdot${i === active ? " is-on" : ""}" style="--dot:${t.dot}"></span>`,
  ).join("");
  return `<div class="tswitch glass"><div class="tdots">${dots}</div><span class="tname">${THEMES[active].name}</span></div>`;
}

const chars = (text) =>
  text
    .split("")
    .map((c) => `<span class="ch">${c === " " ? "&nbsp;" : c}</span>`)
    .join("");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function sceneHtml(s) {
  const title = chars("Soft Frosted Icons");

  const themeLayers = THEMES.map(
    (t, i) => `<section class="scene theme-layer" id="th-${i}" ${sceneAttrs(t.id)}>
      ${blobs()}
      ${themeSwitch(i)}
      <div class="hero-wrap">
        <div class="hero-board card">${s.hero()}</div>
        <pre class="hero-code"><span class="c-tag">&lt;div</span> <span class="c-at">data-sfi-theme</span>=<span class="c-str">"${t.id}"</span><span class="c-tag">&gt;</span></pre>
      </div>
    </section>`,
  ).join("");

  const slides = s.slides
    .map((sl, i) => {
      const attrs = [`name="${sl.name}"`];
      if (sl.finish === "duo") attrs.push(`finish="duo"`);
      const code = esc(`<frosted-icon ${attrs.join(" ")}>`);
      return `<section class="scene islide" id="is-${i}" ${sceneAttrs(sl.theme)}>
      ${blobs()}
      <div class="islide__word" aria-hidden="true">${sl.label}</div>
      <div class="islide__art">${sl.html}</div>
      <div class="islide__code">${code}</div>
      <div class="islide__count"><b>${String(sl.index).padStart(3, "0")}</b><span>/ ${s.total}</span></div>
    </section>`;
    })
    .join("");

  const frames = USE_FRAMES.map(
    ([name, mode, demos], i) => `<div class="uframe" data-u="${i}">
        <div class="uframe__win card" data-mode="${mode}"${mode === "dark" ? ' data-sfi-theme="dusk"' : ""}>
          <div class="uframe__bar"><i></i><i></i><i></i><span>${name}</span></div>
          <div class="uframe__body uframe__body--${demos.length}">${demos.map((d) => `<div class="uframe__demo">${s.uses[d]}</div>`).join("")}</div>
        </div>
      </div>`,
  ).join("");

  return `
  <section class="scene" id="s-intro" ${sceneAttrs("soft-glass")}>
    ${blobs()}
    <div class="intro">
      <div class="intro__pulse"></div>
      <div class="intro__logo">${s.logo}</div>
      <h1 class="intro__title">${title}</h1>
      <div class="intro__chips">
        <span class="chip glass">Outline</span>
        <span class="chip glass">Duo-tone</span>
        <span class="chip glass">48 px grid</span>
        <span class="chip glass">Zero deps</span>
      </div>
    </div>
  </section>

  <section class="scene" id="s-wall" ${sceneAttrs("soft-glass")}>
    ${blobs()}
    <div class="wall-cam"><div class="wall">${s.wall}</div></div>
    <div class="big-stat"><b class="count">0</b><span>frosted icons</span></div>
    <div class="finish-tag glass"><span class="ft ft-out is-on">Outline</span><span class="ft ft-duo">Duo-tone</span></div>
  </section>

  ${themeLayers}

  <section class="scene" id="s-lab" ${sceneAttrs("soft-glass")}>
    ${blobs()}
    <div class="lab-presets" aria-hidden="true">
      ${["Outline", "Duo-tone", "Rose", "Emerald", "Amber", "Any colour"].map((p) => `<span class="preset">${p}</span>`).join("")}
    </div>
    <div class="labx">
      <div class="lab-panel card">
        <div class="lab-row"><span class="lbl">Finish</span><div class="seg"><button class="b-out" aria-pressed="true">Outline</button><button class="b-duo" aria-pressed="false">Duo-tone</button></div></div>
        <div class="lab-row"><span class="lbl">Colour</span><div class="swatches">
          ${["hsl(199 85% 48%)", "hsl(345 80% 56%)", "hsl(155 65% 40%)", "hsl(38 92% 48%)", "hsl(270 70% 58%)"].map((c, i) => `<span class="sw" style="--c:${c}" data-sw="${i}" aria-pressed="${i === 0}"></span>`).join("")}
          <span class="custom"></span>
        </div></div>
        <pre class="lab-code">&lt;frosted-icon name="bell"<span class="lc-fin"></span><span class="lc-col"></span>&gt;</pre>
      </div>
      <div class="lab-board card">${s.labIcons}</div>
    </div>
  </section>

  ${slides}

  <section class="scene" id="s-catalog" ${sceneAttrs("dusk")}>
    ${blobs()}
    <div class="catalog-cam"><div class="catalog">${s.catalog.join("")}</div></div>
    <div class="big-stat big-stat--cat"><b>${s.total}</b><span>icons · one 48 px grid</span></div>
  </section>

  <section class="scene" id="s-uses" ${sceneAttrs("soft-glass")}>
    ${blobs()}
    <div class="use-cam">${frames}</div>
    <div class="big-stat big-stat--uses"><span>Made for</span><b>real interfaces</b></div>
  </section>

  <section class="scene" id="s-sizes" ${sceneAttrs("aurora")}>
    ${blobs()}
    <div class="sizes-x">
      <div class="sizes-x__head"><b class="sz-from">16</b><span>→</span><b class="sz-to">96</b><em>px</em></div>
      <div class="sizes-x__row">${s.sizes.join("")}</div>
    </div>
  </section>

  <section class="scene" id="s-outro" ${sceneAttrs("soft-glass")}>
    ${blobs()}
    <div class="outro">
      <div class="outro__logo">${s.logoSmall}</div>
      <h2 class="outro__title">${title}</h2>
      <div class="outro__npm pill"><span class="pr">$</span><span class="cmd">npm i soft-frosted-icons</span><span class="caret"></span></div>
      <div class="outro__stats">
        <span class="stat glass"><b>${s.total}</b> icons</span>
        <span class="stat glass"><b>2</b> finishes</span>
        <span class="stat glass"><b>5</b> themes</span>
      </div>
    </div>
  </section>`;
}

function thumbnailHtml(s) {
  const cards = [
    ["soft-glass", ["bell", "calendar", "rocket", "chat", "folder", "heart"], "duo"],
    ["dusk", ["home", "search", "wallet", "mail", "chart", "camera"], "outline"],
    ["aurora", ["sparkles", "gift", "star", "heart", "shield", "coffee"], "duo"],
    ["midnight", ["zap", "globe", "headphones", "settings", "lock", "map"], "duo"],
  ];
  const cardHtml = cards
    .map(
      ([theme, icons, finish], i) =>
        `<div class="th-card th-card--${i}" ${sceneAttrs(theme)}><div class="th-card__grid">${icons
          .map((n, k) => `<span>${s.thumbIcon(n, k % 2 ? (finish === "duo" ? "outline" : "duo") : finish)}</span>`)
          .join("")}</div><small>${THEME[theme].name}</small></div>`,
    )
    .join("");
  return `
  <section class="scene is-thumb" id="s-thumb" data-sfi-theme="dusk" data-mode="dark">
    ${blobs()}
    <div class="th-left">
      <div class="th-logo">${s.logo}</div>
      <h1 class="th-title"><span>SOFT FROSTED</span><span>ICONS</span></h1>
      <div class="th-tags">
        <span class="th-tag">${s.total} ICONS</span>
        <span class="th-tag">2 FINISHES</span>
        <span class="th-tag">5 THEMES</span>
      </div>
    </div>
    <div class="th-right">${cardHtml}</div>
  </section>`;
}

export function buildComposition({ format, snippets, kitCss, promoCss, timelineJs }) {
  const f = FORMATS[format];
  const isThumb = format === "thumbnail";
  const duration = isThumb ? 1 : DURATION;
  const body = isThumb ? thumbnailHtml(snippets) : sceneHtml(snippets);
  const audio = isThumb
    ? ""
    : `<audio id="soundtrack" src="assets/soundtrack.mp3" data-start="0" data-duration="${DURATION}" data-track-index="9" data-volume="1"></audio>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${f.width}, height=${f.height}" />
    <title>Soft Frosted Icons — ${format}</title>
    <script src="assets/gsap.min.js"></script>
    <style>
      @font-face {
        font-family: "Manrope";
        src: url("assets/manrope-latin-wght-normal.woff2") format("woff2");
        font-weight: 200 800;
        font-style: normal;
      }
      @font-face {
        font-family: "JetBrains Mono";
        src: url("assets/jetbrains-mono-latin-wght-normal.woff2") format("woff2");
        font-weight: 100 800;
        font-style: normal;
      }
    </style>
    <style>
${kitCss}
    </style>
    <style>
${promoCss}
    </style>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="${duration}"
      data-width="${f.width}"
      data-height="${f.height}"
    >
      <div class="pstage fmt-${format}" style="width:${f.stageW}px;height:${f.stageH}px">
${body}
      </div>
      ${audio}
    </div>
    <script>
      window.__PROMO = { format: "${format}", W: ${f.stageW}, H: ${f.stageH}, duration: ${duration} };
${timelineJs}
    </script>
  </body>
</html>
`;
}
