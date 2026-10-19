import type { CSSProperties, HTMLAttributes, ReactElement } from "react";
import type { Finish, IconName } from "./index.js";

export interface FrostedIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  name: IconName;
  finish?: Finish;
  size?: number | string;
  color?: string;
  /** Accessible name. Omit for decorative icons. */
  label?: string;
  /** Idle specular glint (needs tokens.css). */
  animate?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function FrostedIcon(props: FrostedIconProps): ReactElement;
export { iconSVG, iconNames, GRID, ICON_CATEGORIES, ICON_LABELS } from "./index.js";
