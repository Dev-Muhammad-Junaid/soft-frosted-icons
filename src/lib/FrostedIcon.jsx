import { useId } from "react";
import { FROSTED_CATEGORIES, FROSTED_LABELS } from "./frostedRegistry";
import { renderFrostedIcon } from "./renderFrostedIcon";

/**
 * Frosted SoftMark icon.
 *
 * @param {object} props
 * @param {string} props.name — registry key (`home`, `check`, `play`, …)
 * @param {"outline"|"duo"} [props.finish="outline"]
 * @param {number} [props.size=24]
 * @param {number} [props.intensity=1]
 * @param {boolean} [props.animate=false]
 * @param {string} [props.color] — overrides `currentColor` / `--accent`
 * @param {string} [props.title] — accessible name; defaults to the label
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
  const uid = useId().replace(/:/g, "");
  const node = renderFrostedIcon(name, {
    uid,
    size,
    plate: false,
    version: "bare",
    finish,
    color,
    title: title ?? FROSTED_LABELS[name] ?? name,
    className: ["soft-cx", "soft-cx--bare", animate ? "soft-cx--animate" : "", className]
      .filter(Boolean)
      .join(" "),
    style: {
      "--soft-cx-intensity": intensity,
      ...(color != null ? { color } : null),
      ...style,
    },
    ...props,
  });

  if (!node) {
    return (
      <span
        className={className}
        style={{ width: size, height: size, display: "inline-block" }}
        aria-hidden={!title}
      />
    );
  }

  return node;
}

export function FrostedIconSet({
  names,
  finish = "outline",
  size = 48,
  animate = false,
  intensity = 1,
  className,
}) {
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

export function FrostedCatalog({
  size = 48,
  animate = false,
  intensity = 1,
  finish = "outline",
  className,
  categories,
}) {
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
          <FrostedIconSet
            names={cat.icons}
            finish={finish}
            size={size}
            animate={animate}
            intensity={intensity}
          />
        </section>
      ))}
    </div>
  );
}
