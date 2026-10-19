/**
 * soft-frosted-icons — frosted glass icons, outline and duo-tone, no dependencies.
 *
 *   import { iconSVG } from "soft-frosted-icons";
 *   el.innerHTML = iconSVG("bell", { finish: "duo", size: 24 });
 *
 *   import "soft-frosted-icons/define";      // <frosted-icon name="bell"></frosted-icon>
 *   import { FrostedIcon } from "soft-frosted-icons/react";
 */
export { iconSVG, iconNames, resolveSpec, GRID, DEFAULT_COLOR } from "./render.js";
export { ICONS, ICON_CATEGORIES, ICON_LABELS } from "./registry.js";
export { FrostedIconElement, defineFrostedIcon } from "./element.js";
