import { FROSTED_BARE_ICON_MAP, BARE_OPTICAL } from "./frostedBareIcons";
import { FROSTED_CATALOG_OUTLINE } from "./frostedCatalogOutline";
import { LAB_SET2_DUO } from "./frostedLabSet2";
import { SHAPED_GOLD } from "./shapedGold";

/**
 * Render a Bare SoftMark by name.
 * finish "outline" (default) uses SoftStrokeMark peers; "duo" uses SoftMark bodies.
 * Line marks stay outline in both finishes.
 */
export function renderFrostedIcon(name, props) {
  const optical = BARE_OPTICAL[name] ?? 1;
  const next = optical === 1 ? props : { ...props, optical };
  if (props.finish === "duo") {
    const Duo = LAB_SET2_DUO[name] ?? SHAPED_GOLD[name];
    if (Duo) return <Duo {...next} plate={false} />;
  } else {
    const Outline = FROSTED_CATALOG_OUTLINE[name];
    if (Outline) return <Outline {...next} plate={false} />;
  }
  const Bare = FROSTED_BARE_ICON_MAP[name] ?? SHAPED_GOLD[name];
  if (Bare) return <Bare {...next} plate={false} />;
  return null;
}
