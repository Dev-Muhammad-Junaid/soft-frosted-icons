/* Soft Frosted Icons promo — one paused, seekable GSAP timeline (HyperFrames contract). */
(function () {
  const P = window.__PROMO;
  const V = P.format === "vertical";
  const W = P.W;
  const H = P.H;
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const tl = gsap.timeline({ paused: true });

  /* ——— Beat grid: 120 BPM → one beat every 0.5s ——— */
  const T = {
    wall: 2.5,
    themes: 6.0,
    themeStep: 0.8,
    lab: 10.0,
    slides: 15.0,
    slide: 0.5,
    catalog: 20.0,
    uses: 22.5,
    sizes: 26.5,
    outro: 28.9,
    end: P.duration,
  };

  /* ——— Helpers ——— */

  // Discrete state change that stays correct when the playhead seeks either way.
  function state(t, apply) {
    const proxy = { v: 0 };
    tl.to(proxy, { v: 1, duration: 0.04, ease: "none", onUpdate: () => apply(proxy.v > 0.5) }, t);
  }

  function drift(scene, start, dur) {
    tl.fromTo(
      qa(".blob", scene),
      { x: 0, y: 0, scale: 1 },
      {
        x: (i) => [60, -70, 50, -40][i % 4],
        y: (i) => [40, 50, -60, -30][i % 4],
        scale: (i) => [1.18, 1.1, 1.22, 1.12][i % 4],
        duration: dur,
        ease: "none",
      },
      start,
    );
  }

  function zoomThrough(oldEl, newEl, t, d = 0.42) {
    tl.to(oldEl, { scale: 2.4, opacity: 0, filter: "blur(10px)", duration: d, ease: "power3.in" }, t);
    tl.set(oldEl, { display: "none" }, t + d);
    tl.fromTo(
      newEl,
      { display: "block", opacity: 0, scale: 1.35, filter: "blur(12px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: d + 0.1, ease: "power3.out", immediateRender: false },
      t + 0.08,
    );
    tl.set(newEl, { clearProps: "filter" }, t + d + 0.2);
  }

  function whip(oldEl, newEl, t, dir = 1, d = 0.26) {
    const axis = V ? "yPercent" : "xPercent";
    tl.to(oldEl, { [axis]: -55 * dir, opacity: 0, filter: "blur(14px)", duration: d, ease: "power4.in" }, t);
    tl.set(oldEl, { display: "none" }, t + d);
    tl.fromTo(
      newEl,
      { display: "block", opacity: 0, [axis]: 55 * dir, filter: "blur(14px)" },
      { opacity: 1, [axis]: 0, filter: "blur(0px)", duration: d, ease: "power4.out", immediateRender: false },
      t + d * 0.45,
    );
  }

  function push(oldEl, newEl, t, d = 0.45) {
    const axis = V ? "xPercent" : "yPercent";
    tl.to(oldEl, { [axis]: -100, duration: d, ease: "power3.inOut" }, t);
    tl.set(oldEl, { display: "none" }, t + d);
    tl.fromTo(
      newEl,
      { display: "block", opacity: 1, [axis]: 100 },
      { [axis]: 0, duration: d, ease: "power3.inOut", immediateRender: false },
      t,
    );
  }

  function iris(oldEl, newEl, t, x, y, d = 0.5) {
    const R = Math.hypot(W, H) * 1.1;
    tl.set(newEl, { display: "block", opacity: 1, clipPath: `circle(0px at ${x}px ${y}px)` }, t);
    tl.to(newEl, { clipPath: `circle(${R}px at ${x}px ${y}px)`, duration: d, ease: "power3.inOut" }, t);
    tl.set(newEl, { clipPath: "none" }, t + d);
    if (oldEl) tl.set(oldEl, { display: "none" }, t + d);
  }

  function counter(el, from, to, t, d, fmt = (v) => String(Math.round(v))) {
    const proxy = { v: from };
    tl.to(proxy, { v: to, duration: d, ease: "power2.out", onUpdate: () => (el.textContent = fmt(proxy.v)) }, t);
  }

  // Cross-fade outline ↔ duo-tone inside .pair slots; `stagger` sweeps it across the set.
  function finish(pairs, toDuo, t, d = 0.3, stagger = 0) {
    const outs = pairs.map((p) => q(".f-out", p));
    const duos = pairs.map((p) => q(".f-duo", p));
    tl.to(outs, { opacity: toDuo ? 0 : 1, duration: d, ease: "power2.inOut", stagger }, t);
    tl.to(duos, { opacity: toDuo ? 1 : 0, duration: d, ease: "power2.inOut", stagger }, t);
    tl.fromTo(pairs, { scale: 1 }, { scale: 1.12, duration: d / 2, ease: "power2.out", yoyo: true, repeat: 1, stagger }, t);
  }

  /* ════════ 1 · Intro ════════ */
  const intro = q("#s-intro");
  drift(intro, 0, T.wall + 0.5);
  tl.fromTo(
    q(".intro__logo", intro),
    { scale: 0, rotation: -140 },
    { scale: 1, rotation: 0, duration: 0.75, ease: "back.out(1.9)" },
    0.1,
  );
  tl.fromTo(q(".intro__pulse", intro), { scale: 0.5, opacity: 0.9 }, { scale: 3, opacity: 0, duration: 1, ease: "power2.out" }, 0.38);
  tl.fromTo(
    qa(".intro__title .ch", intro),
    { y: 90, opacity: 0, rotationX: -90, filter: "blur(8px)" },
    { y: 0, opacity: 1, rotationX: 0, filter: "blur(0px)", duration: 0.6, ease: "expo.out", stagger: 0.035 },
    0.5,
  );
  tl.fromTo(
    qa(".intro__chips .chip", intro),
    { scale: 0.4, opacity: 0, y: 20 },
    { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(2)", stagger: 0.08 },
    1.2,
  );
  tl.fromTo(q(".intro", intro), { scale: 1 }, { scale: 1.07, duration: 1.0, ease: "power1.in" }, 1.5);

  /* ════════ 2 · Icon wall ════════ */
  const wallScene = q("#s-wall");
  zoomThrough(intro, wallScene, T.wall);
  drift(wallScene, T.wall, 3.9);
  const wall = q(".wall", wallScene);
  tl.fromTo(
    wall,
    { rotationX: V ? 22 : 30, rotationZ: V ? -8 : -12, scale: V ? 1.2 : 1.3, y: 50 },
    { rotationX: 6, rotationZ: -2, scale: 1.0, y: 0, duration: 3.5, ease: "power2.out" },
    T.wall,
  );
  const tiles = qa(".w-tile", wall);
  const mid = (tiles.length - 1) / 2;
  tl.fromTo(
    tiles,
    { opacity: 0, scale: 0.3, y: 120, rotationX: -70 },
    { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.6, ease: "back.out(1.4)", stagger: (i) => Math.abs(i - mid) * 0.032 },
    T.wall + 0.05,
  );
  const stat = q(".big-stat", wallScene);
  tl.fromTo(stat, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, T.wall + 0.35);
  counter(q(".count", wallScene), 0, 136, T.wall + 0.4, 1.1);
  tl.fromTo(q(".finish-tag", wallScene), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, T.wall + 0.5);

  // Finish flips on the beat: duo sweeps in, back to outline, then duo again.
  const wallPairs = qa(".pair", wall);
  const cols = V ? 4 : 8;
  const sweep = wallPairs.map((p, i) => ({ p, k: (i % cols) + Math.floor(i / cols) }));
  sweep.sort((a, b) => a.k - b.k);
  const sweptPairs = sweep.map((s) => s.p);
  const ftOut = q(".ft-out", wallScene);
  const ftDuo = q(".ft-duo", wallScene);
  const tag = (duo) => {
    ftOut.classList.toggle("is-on", !duo);
    ftDuo.classList.toggle("is-on", duo);
  };
  finish(sweptPairs, true, T.wall + 1.0, 0.3, 0.025);
  state(T.wall + 1.0, (on) => tag(on));
  finish(sweptPairs, false, T.wall + 2.0, 0.3, 0.02);
  state(T.wall + 2.0, (on) => tag(!on));
  finish(sweptPairs, true, T.wall + 2.75, 0.25, 0.015);
  state(T.wall + 2.75, (on) => tag(on));

  /* ════════ 3 · Themes ════════ */
  const layers = qa(".theme-layer");
  zoomThrough(wallScene, layers[0], T.themes);
  layers.forEach((layer) => drift(layer, T.themes, 4.2));
  tl.fromTo(qa(".hero-board", document), { scale: 1, y: 8 }, { scale: 1.035, y: -8, duration: 4.4, ease: "none" }, T.themes);
  tl.fromTo(
    qa(".hero-ic", layers[0]),
    { opacity: 0, y: 40, scale: 0.8 },
    { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)", stagger: 0.03 },
    T.themes + 0.1,
  );
  tl.fromTo(q(".tswitch", layers[0]), { y: -70 }, { y: 0, duration: 0.5, ease: "back.out(2)" }, T.themes + 0.15);
  tl.fromTo(q(".hero-code", layers[0]), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, T.themes + 0.3);
  // Alternate finishes between surfaces so both read on every theme.
  layers.forEach((layer, i) => {
    if (i % 2) tl.set(qa(".f-out", layer), { opacity: 0 }, 0), tl.set(qa(".f-duo", layer), { opacity: 1 }, 0);
  });

  // Iris from the active theme dot (constants match .tswitch layout in promo.css).
  const pillLeft = W / 2 - 150;
  const pillTop = V ? 150 : 24;
  for (let i = 1; i < layers.length; i += 1) {
    const t = T.themes + T.themeStep * i;
    const dotX = pillLeft + 16 + 10 + i * 28;
    const dotY = pillTop + 23;
    iris(layers[i - 1], layers[i], t, dotX, dotY, 0.55);
    const dot = qa(".tdot", layers[i])[i];
    tl.fromTo(dot, { scale: 0.6 }, { scale: 1, duration: 0.4, ease: "back.out(4)" }, t + 0.1);
    tl.fromTo(q(".tname", layers[i]), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, t + 0.15);
    tl.fromTo(
      qa(".hero-ic .pair", layers[i]),
      { scale: 0.7, rotation: -12 },
      { scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2.2)", stagger: 0.015 },
      t + 0.1,
    );
  }

  /* ════════ 4 · One colour, two finishes ════════ */
  const lab = q("#s-lab");
  push(layers[layers.length - 1], lab, T.lab);
  drift(lab, T.lab, 5.3);
  tl.fromTo(
    q(".lab-panel", lab),
    { x: V ? 0 : -60, y: V ? 60 : 0, opacity: 0 },
    { x: 0, y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
    T.lab + 0.25,
  );
  tl.fromTo(
    qa(".lab-ic", lab),
    { y: 40, opacity: 0, scale: 0.8 },
    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)", stagger: 0.04 },
    T.lab + 0.3,
  );
  tl.fromTo(
    q(".lab-board", lab),
    { rotationY: V ? 0 : -8, rotationX: V ? 6 : 0 },
    { rotationY: V ? 0 : 6, rotationX: V ? -4 : 0, duration: 4.8, ease: "sine.inOut" },
    T.lab + 0.2,
  );

  // Preset callouts, one per beat-and-a-bit.
  const PRESETS = [0.85, 1.55, 2.25, 2.95, 3.55, 4.15];
  qa(".preset", lab).forEach((el, i) => {
    const at = T.lab + PRESETS[i];
    tl.fromTo(el, { opacity: 0, scale: 0.6, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 0.28, ease: "back.out(2.6)" }, at);
    const out = i < PRESETS.length - 1 ? T.lab + PRESETS[i + 1] - 0.08 : T.lab + 4.85;
    tl.to(el, { opacity: 0, y: -12, duration: 0.12, ease: "power2.in" }, out);
  });

  const labPairs = qa(".lab-ic .pair", lab);
  const bOut = q(".b-out", lab);
  const bDuo = q(".b-duo", lab);
  const lcFin = q(".lc-fin", lab);
  const lcCol = q(".lc-col", lab);
  const swatches = qa(".sw", lab);

  // Outline: a pulse across the set.
  tl.fromTo(labPairs, { scale: 1 }, { scale: 1.14, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 1, stagger: 0.03 }, T.lab + 0.8);
  // Duo-tone.
  finish(labPairs, true, T.lab + 1.5, 0.3, 0.03);
  state(T.lab + 1.5, (on) => {
    bOut.setAttribute("aria-pressed", String(!on));
    bDuo.setAttribute("aria-pressed", String(on));
    lcFin.textContent = on ? ' finish="duo"' : "";
  });

  // One colour drives every icon: a single --sfi-color on the scene.
  const col = { h: 199, s: 85, l: 48 };
  const applyCol = () => {
    const c = `hsl(${Math.round(col.h) % 360} ${Math.round(col.s)}% ${Math.round(col.l)}%)`;
    lab.style.setProperty("--sfi-color", c);
  };
  const colourStep = (at, to, sw, label, d = 0.35, ease = "power3.inOut") => {
    tl.to(col, { ...to, duration: d, ease, onUpdate: applyCol }, T.lab + at);
    state(T.lab + at, (on) => {
      swatches.forEach((s, i) => s.setAttribute("aria-pressed", String(i === (on ? sw : prevSw[at]))));
      lcCol.textContent = on ? label : prevLabel[at];
    });
  };
  const prevSw = { 2.2: 0, 2.9: 1, 3.5: 2, 4.1: 3 };
  const prevLabel = { 2.2: "", 2.9: ' color="rose"', 3.5: ' color="emerald"', 4.1: ' color="amber"' };
  colourStep(2.2, { h: 345, s: 80, l: 56 }, 1, ' color="rose"'); // Rose
  colourStep(2.9, { h: 155 + 360, s: 65, l: 40 }, 2, ' color="emerald"'); // Emerald
  colourStep(3.5, { h: 38 + 720, s: 92, l: 48 }, 3, ' color="amber"'); // Amber
  colourStep(4.1, { h: 38 + 1080, s: 75, l: 52 }, -1, ' color="any"', 0.75, "power1.inOut"); // Any colour

  /* ════════ 5 · Icons, one per beat ════════ */
  const slides = qa(".islide");
  slides.forEach((slide, i) => {
    const t = T.slides + i * T.slide;
    const prev = i === 0 ? lab : slides[i - 1];
    whip(prev, slide, t, 1, i === 0 ? 0.32 : 0.24);
    drift(slide, t, 0.9);
    tl.fromTo(
      q(".islide__word", slide),
      { x: V ? 0 : 140, y: V ? 120 : 0 },
      { x: V ? 0 : -140, y: V ? -120 : 0, duration: 0.8, ease: "none" },
      t,
    );
    tl.fromTo(
      q(".islide__art", slide),
      { scale: 0.7, rotation: i % 2 ? 14 : -14 },
      { scale: 1, rotation: 0, duration: 0.45, ease: "back.out(2)" },
      t + 0.05,
    );
    tl.fromTo(q(".islide__code", slide), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, t + 0.1);
    tl.fromTo(q(".islide__count", slide), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, t + 0.1);
  });

  /* ════════ 6 · The whole catalog ════════ */
  const catScene = q("#s-catalog");
  const lastSlide = slides[slides.length - 1];
  tl.set(lastSlide, { zIndex: 10 }, T.catalog);
  tl.to(lastSlide, { scale: 0.25, opacity: 0, rotation: -8, duration: 0.4, ease: "power3.in" }, T.catalog);
  tl.set(lastSlide, { display: "none", zIndex: "auto" }, T.catalog + 0.4);
  tl.fromTo(catScene, { display: "block", opacity: 0 }, { opacity: 1, duration: 0.25, immediateRender: false }, T.catalog);
  drift(catScene, T.catalog, 2.7);
  const cells = qa(".cat", catScene);
  const cCols = V ? 8 : 17;
  const cRows = Math.ceil(cells.length / cCols);
  tl.fromTo(
    cells,
    {
      opacity: 0,
      x: (i) => ((i % cCols) - (cCols - 1) / 2) * 40,
      y: (i) => (Math.floor(i / cCols) - (cRows - 1) / 2) * 40,
      z: -900,
      rotationY: (i) => ((i % cCols) - (cCols - 1) / 2) * 8,
      rotationX: (i) => (Math.floor(i / cCols) - (cRows - 1) / 2) * -8,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      z: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "expo.out",
      stagger: (i) => ((i % cCols) + Math.floor(i / cCols)) * 0.022,
    },
    T.catalog + 0.1,
  );
  tl.to(
    cells,
    { scale: 1.18, duration: 0.18, ease: "sine.inOut", yoyo: true, repeat: 1, stagger: (i) => ((i % cCols) + Math.floor(i / cCols)) * 0.018 },
    T.catalog + 1.5,
  );
  tl.fromTo(
    q(".catalog", catScene),
    { scale: 1.12, rotationX: 10 },
    { scale: 1, rotationX: 0, duration: 2.6, ease: "power2.out" },
    T.catalog,
  );
  tl.fromTo(q(".big-stat--cat", catScene), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, T.catalog + 0.9);

  /* ════════ 7 · Use cases coverflow ════════ */
  const useScene = q("#s-uses");
  zoomThrough(catScene, useScene, T.uses);
  drift(useScene, T.uses, 4.3);
  const frames = qa(".uframe", useScene);
  const flow = { p: -0.6 };
  const layout = () => {
    frames.forEach((el, i) => {
      const d = i - flow.p;
      const a = Math.min(Math.abs(d), 3);
      gsap.set(el, V
        ? { x: 0, y: d * 470, z: -a * 420, rotationX: -d * 26, rotationY: 0, scale: 0.82, opacity: 1 - Math.max(0, a - 1.6) }
        : { x: d * 640, y: 0, z: -a * 460, rotationY: -d * 34, rotationX: 0, scale: 0.8, opacity: 1 - Math.max(0, a - 1.8) });
    });
  };
  tl.to(flow, { p: 0, duration: 0.5, ease: "power3.out", onUpdate: layout }, T.uses);
  [0, 1, 2, 3].forEach((n) =>
    tl.to(flow, { p: n + 1, duration: 0.55, ease: "power3.inOut", onUpdate: layout }, T.uses + 0.8 + n * 0.75),
  );
  tl.to(flow, { p: 4.3, duration: 0.6, ease: "power1.in", onUpdate: layout }, T.uses + 3.6);
  const ustat = q(".big-stat--uses", useScene);
  tl.fromTo(ustat, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, T.uses + 0.4);

  /* ════════ 8 · Sizes 16 → 96 px ════════ */
  const sizeScene = q("#s-sizes");
  iris(useScene, sizeScene, T.sizes, W / 2, H / 2, 0.5);
  drift(sizeScene, T.sizes, 2.6);
  const figs = qa(".sz", sizeScene);
  tl.fromTo(
    figs,
    { scale: 0, opacity: 0, y: 40 },
    { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(2.2)", stagger: 0.12 },
    T.sizes + 0.15,
  );
  tl.fromTo(q(".sizes-x__head", sizeScene), { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" }, T.sizes + 0.1);
  counter(q(".sz-to", sizeScene), 16, 96, T.sizes + 0.15, 0.95);
  tl.to(
    figs,
    { y: -14, duration: 0.25, ease: "sine.inOut", yoyo: true, repeat: 1, stagger: 0.05 },
    T.sizes + 1.4,
  );
  tl.to(
    figs,
    {
      x: (i) => (V ? 0 : (3 - i) * 90),
      scale: 0.2,
      opacity: 0,
      rotation: 120,
      duration: 0.45,
      ease: "power3.in",
      stagger: 0.03,
    },
    T.outro - 0.45,
  );
  tl.to(q(".sizes-x__head", sizeScene), { opacity: 0, scale: 0.6, duration: 0.35, ease: "power3.in" }, T.outro - 0.4);

  /* ════════ 9 · Outro ════════ */
  const outro = q("#s-outro");
  tl.fromTo(outro, { display: "block", opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, T.outro - 0.1);
  tl.set(sizeScene, { display: "none" }, T.outro + 0.2);
  drift(outro, T.outro - 0.1, T.end - T.outro + 0.1);
  tl.fromTo(
    q(".outro__logo", outro),
    { scale: 0, rotation: -180 },
    { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(2)" },
    T.outro,
  );
  tl.fromTo(
    qa(".outro__title .ch", outro),
    { y: 70, opacity: 0, filter: "blur(8px)" },
    { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.55, ease: "expo.out", stagger: 0.03 },
    T.outro + 0.25,
  );
  tl.fromTo(
    q(".outro__npm", outro),
    { scale: 0.6, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" },
    T.outro + 0.8,
  );
  tl.fromTo(
    q(".outro__npm .cmd", outro),
    { clipPath: "inset(0 100% 0 0)" },
    { clipPath: "inset(0 0% 0 0)", duration: 0.95, ease: "steps(24)" },
    T.outro + 1.0,
  );
  tl.fromTo(
    q(".caret", outro),
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: "steps(1)", yoyo: true, repeat: 5 },
    T.outro + 1.95,
  );
  tl.fromTo(
    qa(".outro__stats .stat", outro),
    { y: 30, opacity: 0, scale: 0.8 },
    { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)", stagger: 0.1 },
    T.outro + 1.5,
  );
  tl.fromTo(q(".outro", outro), { scale: 1 }, { scale: 1.04, duration: T.end - T.outro - 1.5, ease: "none" }, T.outro + 1.5);
  tl.to(q(".outro", outro), { opacity: 0, duration: 0.5, ease: "power2.in" }, T.end - 0.5);

  window.__timelines["main"] = tl;
})();
