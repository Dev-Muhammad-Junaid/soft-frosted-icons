/**
 * React wrapper. `react` is an optional peer dependency — only this entry imports it.
 *
 *   import { FrostedIcon } from "soft-frosted-icons/react";
 *   <FrostedIcon name="bell" finish="duo" size={24} />
 */
import { createElement, useId, useMemo } from "react";
import { iconSVG } from "./render.js";

export function FrostedIcon({ name, finish = "outline", size = 24, color, label, animate, className, style, ...rest }) {
  const id = `sfi${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const html = useMemo(
    () => iconSVG(name, { finish, size, color, label, id, className: animate ? "sfi-animate" : undefined }),
    [name, finish, size, color, label, id, animate]
  );
  return createElement("span", {
    ...rest,
    className: ["sfi-wrap", className].filter(Boolean).join(" "),
    style: { display: "inline-block", lineHeight: 0, verticalAlign: "middle", ...style },
    role: label ? undefined : "presentation",
    dangerouslySetInnerHTML: { __html: html },
  });
}

export { iconSVG, iconNames, GRID } from "./render.js";
export { ICON_CATEGORIES, ICON_LABELS } from "./registry.js";
