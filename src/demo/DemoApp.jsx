import { useEffect, useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FrostedIcon, renderFrostedIcon } from "../lib/FrostedIcon.jsx";
import { GRID } from "../lib/material.jsx";
import { FROSTED_CATEGORIES, FROSTED_ICON_KEYS, FROSTED_LABELS } from "../lib/registry.js";

const THEMES = [
  { id: "soft-glass", label: "Soft Glass" },
  { id: "crystal", label: "Crystal" },
  { id: "aurora", label: "Aurora" },
  { id: "dusk", label: "Dusk" },
  { id: "midnight", label: "Midnight" },
];
const FINISHES = [
  { id: "outline", label: "Outline" },
  { id: "duo", label: "Duo-tone" },
  { id: "both", label: "Side by side" },
];
const SIZES = [20, 24, 32, 48];

function Seg({ label, value, options, onChange }) {
  return (
    <div className="demo__seg" role="group" aria-label={label}>
      <span>{label}</span>
      {options.map((o) => (
        <button key={o.id} type="button" className={value === o.id ? "is-on" : ""} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Keyline overlay: live area, circle and square keyshapes on the 48 grid. */
function Keylines() {
  const { live, keyshapes: k } = GRID;
  return (
    <svg className="demo__keylines" viewBox="0 0 48 48" aria-hidden>
      {Array.from({ length: 49 }, (_, i) => (
        <g key={i} opacity={i % 8 === 0 ? 0.5 : 0.18}>
          <line x1={i} y1={0} x2={i} y2={48} />
          <line x1={0} y1={i} x2={48} y2={i} />
        </g>
      ))}
      <rect x={live.min} y={live.min} width={live.max - live.min} height={live.max - live.min} className="is-live" />
      <circle cx={k.circle.cx} cy={k.circle.cy} r={k.circle.r} className="is-key" />
      <rect x={k.square.x} y={k.square.y} width={k.square.w} height={k.square.h} rx={k.square.r} className="is-key" />
    </svg>
  );
}

function Inspector({ name, onClose, onCopy, themeId, onTheme }) {
  const jsx = (finish) => `<FrostedIcon name="${name}"${finish === "duo" ? ' finish="duo"' : ""} />`;
  const svg = (finish) =>
    renderToStaticMarkup(renderFrostedIcon(name, { uid: `sfi-${name}-${finish}`, finish, size: 24 }));
  return (
    <aside className="demo__inspector" aria-label={`${FROSTED_LABELS[name]} details`}>
      <header>
        <h2>{FROSTED_LABELS[name]}</h2>
        <code>{name}</code>
        <div className="demo__swatches" role="group" aria-label="Theme">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              data-theme={t.id}
              className={themeId === t.id ? "is-on" : ""}
              onClick={() => onTheme(t.id)}
              title={t.label}
              aria-label={`${t.label} theme`}
              aria-pressed={themeId === t.id}
            >
              <span />
            </button>
          ))}
        </div>
        <button type="button" className="demo__close" onClick={onClose} aria-label="Close">
          <FrostedIcon name="close" size={20} />
        </button>
      </header>
      <div className="demo__stage">
        {["outline", "duo"].map((finish) => (
          <figure key={finish}>
            <div className="demo__canvas">
              <Keylines />
              <FrostedIcon name={name} finish={finish} size={160} />
            </div>
            <figcaption>
              <span>{finish === "duo" ? "Duo-tone" : "Outline"}</span>
              <span className="demo__ramp">
                {[16, 20, 24, 32].map((s) => (
                  <FrostedIcon key={s} name={name} finish={finish} size={s} />
                ))}
              </span>
              <span className="demo__copy">
                <button type="button" onClick={() => onCopy(jsx(finish))}>
                  Copy JSX
                </button>
                <button type="button" onClick={() => onCopy(svg(finish))}>
                  Copy SVG
                </button>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </aside>
  );
}

export function DemoApp() {
  const [finish, setFinish] = useState("both");
  const [size, setSize] = useState(32);
  const [themeId, setThemeId] = useState("soft-glass");
  const [query, setQuery] = useState("");
  const [animate, setAnimate] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = themeId;
  }, [themeId]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(""), 1400);
    return () => clearTimeout(t);
  }, [toast]);

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FROSTED_CATEGORIES;
    const hits = FROSTED_ICON_KEYS.filter(
      (n) => n.toLowerCase().includes(q) || FROSTED_LABELS[n].toLowerCase().includes(q)
    );
    return [{ id: "results", label: `${hits.length} matches`, icons: hits }];
  }, [query]);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied");
    } catch {
      setToast("Copy blocked by the browser");
    }
  };

  const finishes = finish === "both" ? ["outline", "duo"] : [finish];

  return (
    <div className="demo">
      <header className="demo__hero">
        <p className="demo__eyebrow">
          {FROSTED_ICON_KEYS.length} icons · 2 finishes · 48 grid
        </p>
        <h1>soft-frosted-icons</h1>
        <p className="demo__lede">
          Frosted glass icons for React and plain SVG. One drawing per icon, two finishes: <b>outline</b> glass
          tubes and <b>duo-tone</b> frost bodies with an accent core. Every mark sits on the same 48 px grid,
          3-unit stroke and keyshapes, and paints from <code>currentColor</code>.
        </p>
        <pre className="demo__code">
          <code>{`npm install soft-frosted-icons

import { FrostedIcon } from "soft-frosted-icons";
import "soft-frosted-icons/styles.css";

<FrostedIcon name="bell" />                 // outline
<FrostedIcon name="bell" finish="duo" />    // duo-tone`}</code>
        </pre>
      </header>

      <div className="demo__toolbar">
        <label className="demo__search">
          <span>Search</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="bell, arrow, file…" />
        </label>
        <Seg label="Finish" value={finish} options={FINISHES} onChange={setFinish} />
        <Seg
          label="Size"
          value={size}
          options={SIZES.map((s) => ({ id: s, label: `${s}` }))}
          onChange={setSize}
        />
        <Seg label="Theme" value={themeId} options={THEMES} onChange={setThemeId} />
        <label className="demo__toggle">
          <input type="checkbox" checked={animate} onChange={(e) => setAnimate(e.target.checked)} />
          Idle FX
        </label>
      </div>

      {selected ? <Inspector
          name={selected}
          onClose={() => setSelected(null)}
          onCopy={copy}
          themeId={themeId}
          onTheme={setThemeId}
        /> : null}

      {sections.map((cat) => (
        <section key={cat.id} className="demo__section">
          <header>
            <h3>{cat.label}</h3>
            {cat.hint ? <p>{cat.hint}</p> : null}
          </header>
          <div className="demo__grid" style={{ "--cell": `${Math.max(88, size * finishes.length + 52)}px` }}>
            {cat.icons.map((name) => (
              <button
                key={name}
                type="button"
                className={`demo__cell${selected === name ? " is-on" : ""}`}
                onClick={() => setSelected(name)}
                title={`${FROSTED_LABELS[name]} — inspect`}
              >
                <span className="demo__pair">
                  {finishes.map((f) => (
                    <FrostedIcon key={f} name={name} finish={f} size={size} animate={animate} />
                  ))}
                </span>
                <span className="demo__name">{name}</span>
              </button>
            ))}
          </div>
        </section>
      ))}

      <footer className="demo__foot">
        <a href="https://github.com/Dev-Muhammad-Junaid/soft-frosted-icons">GitHub</a>
        <a href="https://www.npmjs.com/package/soft-frosted-icons">npm</a>
        <span>MIT</span>
      </footer>

      <div className={`demo__toast${toast ? " is-on" : ""}`} role="status">
        {toast}
      </div>
    </div>
  );
}
