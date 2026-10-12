import { useId } from "react";
import { DuoGlyph, GlassDefs, OutlineGlyph, SoftSvg, resolveSpec } from "./material.jsx";
import { FROSTED_CATEGORIES, FROSTED_LABELS, ICONS } from "./registry.js";

/**
 * Render an icon by name without hooks (SSR, static export, custom wrappers).
 * `uid` must be unique per rendered SVG on the page — it namespaces the gradients.
 */
export function renderFrostedIcon(name, { uid, finish = "outline", size = 24, title, className, style, color, ...props } = {}) {
  const spec = ICONS[name];
  if (!spec) return null;
  const key = finish === "duo" ? "duo" : "outline";
  const resolved = resolveSpec(spec, key);
  const id = uid ?? `sfi-${name}-${key}`;
  return (
    <SoftSvg
      size={size}
      title={title}
      className={className}
      style={style}
      color={color}
      finish={key}
      data-soft-icon={name}
      {...props}
    >
      <GlassDefs uid={id} />
      {key === "duo" ? <DuoGlyph uid={id} {...resolved} /> : <OutlineGlyph uid={id} {...resolved} />}
    </SoftSvg>
  );
}

/**
 * Frosted SoftMark icon.
 *
 * @param {object} props
 * @param {string} props.name — registry key (`home`, `check`, `play`, …)
 * @param {"outline"|"duo"} [props.finish="outline"]
 * @param {number|string} [props.size=24]
 * @param {number} [props.intensity=1] — specular strength, 0–1
 * @param {boolean} [props.animate=false] — idle specular pulse
 * @param {string} [props.color] — overrides `currentColor` / `--accent`
 * @param {string} [props.title] — accessible name; omit for decorative icons
 */
export function FrostedIcon({
  name = "check",
  finish = "outline",
  size = 24,
  intensity = 1,
  animate = false,
  className,
  title,
  style,
  color,
  ...props
}) {
  const uid = `sfi${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const node = renderFrostedIcon(name, {
    uid,
    size,
    finish,
    color,
    title,
    className: ["soft-cx", animate ? "soft-cx--animate" : "", className].filter(Boolean).join(" "),
    style: { "--soft-cx-intensity": intensity, ...style },
    ...props,
  });
  if (!node) {
    return <span className={className} style={{ width: size, height: size, display: "inline-block" }} aria-hidden />;
  }
  return node;
}

export function FrostedIconSet({ names, finish = "outline", size = 48, animate = false, intensity = 1, className }) {
  return (
    <div className={["soft-cx-set", className].filter(Boolean).join(" ")} data-frosted-finish={finish}>
      {names.map((name) => (
        <figure key={`${finish}-${name}`} className="soft-cx-set__cell" data-frosted-name={name}>
          <FrostedIcon name={name} finish={finish} size={size} animate={animate} intensity={intensity} />
          <figcaption>{FROSTED_LABELS[name] ?? name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function FrostedCatalog({ size = 48, animate = false, intensity = 1, finish = "outline", className, categories }) {
  const cats = categories ?? FROSTED_CATEGORIES;
  return (
    <div className={["soft-frosted-catalog", className].filter(Boolean).join(" ")} data-frosted-finish={finish}>
      {cats.map((cat) => (
        <section key={cat.id} className="soft-frosted-catalog__section" id={`frosted-${cat.id}`}>
          <header className="soft-frosted-catalog__head">
            <h3>{cat.label}</h3>
            {cat.hint ? <p>{cat.hint}</p> : null}
            <span className="soft-frosted-catalog__count">{cat.icons.length}</span>
          </header>
          <FrostedIconSet names={cat.icons} finish={finish} size={size} animate={animate} intensity={intensity} />
        </section>
      ))}
    </div>
  );
}
