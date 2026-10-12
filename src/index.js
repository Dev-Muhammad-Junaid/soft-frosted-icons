/**
 * soft-frosted-icons — frosted SoftMark icons in two finishes.
 *
 * @example
 * import { FrostedIcon } from "soft-frosted-icons";
 * import "soft-frosted-icons/styles.css";
 *
 * <FrostedIcon name="home" finish="outline" size={24} />
 */

import "./styles.css";

export { FrostedIcon, FrostedIconSet, FrostedCatalog, renderFrostedIcon } from "./lib/FrostedIcon.jsx";
export { FROSTED_CATEGORIES, FROSTED_ICON_KEYS, FROSTED_LABELS } from "./lib/registry.js";
export { GRID as FROSTED_GRID } from "./lib/material.jsx";
