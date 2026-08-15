import { useEffect, useMemo, useState } from "react";
import { FrostedCatalog, FrostedIcon } from "../lib/FrostedIcon.jsx";
import { FROSTED_ICON_KEYS, FROSTED_LABELS } from "../lib/frostedRegistry.js";

const THEMES = [
  { id: "soft-glass", label: "Soft Glass" },
  { id: "crystal", label: "Crystal" },
  { id: "aurora", label: "Aurora" },
  { id: "dusk", label: "Dusk" },
  { id: "midnight", label: "Midnight" },
];

export function DemoApp() {
  const [finish, setFinish] = useState("outline");
  const [themeId, setThemeId] = useState("soft-glass");
  const [query, setQuery] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = themeId;
  }, [themeId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return FROSTED_ICON_KEYS.filter((name) => {
      const label = (FROSTED_LABELS[name] ?? name).toLowerCase();
      return name.toLowerCase().includes(q) || label.includes(q);
    });
  }, [query]);

  return (
    <div className="demo" data-theme={themeId}>
      <header className="demo__hero">
        <p className="demo__eyebrow">npm · GitHub Pages</p>
        <h1>soft-frosted-icons</h1>
        <p className="demo__lede">
          Frosted SoftMark icons for React. Outline and duo-tone finishes, themed
          through <code>currentColor</code> and <code>--accent</code>. Independent of{" "}
          <a href="https://github.com/Dev-Muhammad-Junaid/soft-ui-kit">soft-ui-kit</a>{" "}
          — the kit keeps Phosphor.
        </p>
        <pre className="demo__install">
          <code>npm install soft-frosted-icons</code>
        </pre>
        <pre className="demo__code">
          <code>{`import { FrostedIcon } from "soft-frosted-icons";
import "soft-frosted-icons/styles.css";

<FrostedIcon name="home" finish="${finish}" size={24} />`}</code>
        </pre>
      </header>

      <div className="demo__toolbar">
        <label className="demo__search">
          <span>Search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`${FROSTED_ICON_KEYS.length} marks`}
          />
        </label>
        <div className="demo__seg" role="group" aria-label="Finish">
          <span>Finish</span>
          <button type="button" className={finish === "outline" ? "is-on" : ""} onClick={() => setFinish("outline")}>
            Outline
          </button>
          <button type="button" className={finish === "duo" ? "is-on" : ""} onClick={() => setFinish("duo")}>
            Duo-tone
          </button>
        </div>
        <div className="demo__seg" role="group" aria-label="Theme">
          <span>Theme</span>
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={themeId === t.id ? "is-on" : ""}
              onClick={() => setThemeId(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <label className="demo__toggle">
          <input type="checkbox" checked={animate} onChange={(e) => setAnimate(e.target.checked)} />
          Idle FX
        </label>
      </div>

      <section className="demo__preview">
        <FrostedIcon name="home" finish={finish} size={64} animate={animate} />
        <FrostedIcon name="check" finish={finish} size={64} animate={animate} />
        <FrostedIcon name="bell" finish={finish} size={64} animate={animate} />
        <FrostedIcon name="play" finish={finish} size={64} animate={animate} />
      </section>

      {filtered ? (
        <section className="demo__results">
          <h2>{filtered.length} matches</h2>
          <div className="soft-cx-set">
            {filtered.map((name) => (
              <figure key={name} className="soft-cx-set__cell">
                <FrostedIcon name={name} finish={finish} size={48} animate={animate} />
                <figcaption>{FROSTED_LABELS[name] ?? name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : (
        <FrostedCatalog size={48} finish={finish} animate={animate} />
      )}

      <footer className="demo__foot">
        <a href="https://github.com/Dev-Muhammad-Junaid/soft-frosted-icons">GitHub</a>
        <a href="https://www.npmjs.com/package/soft-frosted-icons">npm</a>
        <a href="https://dev-muhammad-junaid.github.io/soft-ui-kit/">soft-ui-kit demo</a>
      </footer>
    </div>
  );
}
