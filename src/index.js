/**
 * soft-frosted-icons — frosted SoftMark icon language.
 *
 * @example
 * import { FrostedIcon } from "soft-frosted-icons";
 * import "soft-frosted-icons/styles.css";
 *
 * <FrostedIcon name="home" finish="outline" size={24} />
 */

import "./styles.css";

export { FrostedIcon, FrostedIconSet, FrostedCatalog } from "./lib/FrostedIcon.jsx";
export { renderFrostedIcon } from "./lib/renderFrostedIcon.jsx";
export {
  FROSTED_CATEGORIES,
  FROSTED_ICON_KEYS,
  FROSTED_LABELS,
  FROSTED_STANDARDS,
  FROSTED_VERSIONS,
} from "./lib/frostedRegistry.js";
export { LAB_SET2_KEYS, LAB_SET2_DUO_KEYS, LAB_SET2_LABELS } from "./lib/frostedLabSet2.jsx";
export { FROSTED_CATALOG_OUTLINE_KEYS } from "./lib/frostedCatalogOutline.jsx";
