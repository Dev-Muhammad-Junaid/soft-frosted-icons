export type IconName =
  | "home" | "dashboard" | "grid" | "layout" | "sidebar" | "panels" | "table" | "list" | "columns" | "menu"
  | "search" | "filter" | "sort" | "more" | "close" | "check" | "plus" | "minus" | "edit" | "trash" | "copy"
  | "save" | "download" | "upload" | "refresh" | "externalLink" | "arrowLeft" | "arrowRight" | "arrowUp"
  | "arrowDown" | "chevronRight" | "chevronLeft" | "chevronUp" | "chevronDown" | "user" | "users"
  | "userPlus" | "lock" | "unlock" | "shield" | "key" | "eye" | "eyeOff" | "login" | "logout" | "mail"
  | "send" | "inbox" | "chat" | "bell" | "phone" | "link" | "share" | "at" | "chart" | "trendingUp"
  | "trendingDown" | "pieChart" | "activity" | "report" | "wallet" | "creditCard" | "dollar" | "cart"
  | "receipt" | "package" | "calendar" | "clock" | "folder" | "file" | "files" | "image" | "database"
  | "cloud" | "server" | "tag" | "bookmark" | "star" | "flag" | "mapPin" | "globe" | "settings" | "info"
  | "help" | "alert" | "warning" | "ban" | "sparkles" | "rocket" | "zap" | "layers" | "code" | "terminal"
  | "support" | "book" | "power" | "play" | "pause" | "stop" | "skipNext" | "skipPrev" | "volume" | "mic"
  | "wifi" | "hash" | "expand" | "paperclip" | "scissors" | "repeat" | "shuffle" | "thumbsUp" | "thumbsDown"
  | "megaphone" | "bluetooth" | "sun" | "moon" | "camera" | "video" | "printer" | "battery" | "gift"
  | "truck" | "store" | "briefcase" | "building" | "compass" | "coffee" | "umbrella" | "headphones" | "pin"
  | "paintBrush" | "heart" | "newspaper" | "map" | "film" | "cast";

export type Finish = "outline" | "duo";

export interface IconOptions {
  /** `"outline"` (default) glass tubes, or `"duo"` filled glass. */
  finish?: Finish;
  /** Width and height: a px number or any CSS length. Default 24. */
  size?: number | string;
  /** Sets currentColor. Defaults to `var(--sfi-color, hsl(199 85% 48%))`. */
  color?: string;
  /** Accessible name. Omit for decorative icons (rendered aria-hidden). */
  label?: string;
  /** Id prefix for gradients and masks. Pass one for stable SSR output. */
  id?: string;
  className?: string;
}

/** Render an icon to an SVG string. Returns "" for an unknown name. */
export function iconSVG(name: IconName, options?: IconOptions): string;
/** Every icon name, in catalog order. */
export function iconNames(): IconName[];

export const ICON_LABELS: Record<IconName, string>;
export const ICON_CATEGORIES: Array<{ id: string; label: string; hint: string; icons: IconName[] }>;
export const ICONS: Record<IconName, unknown>;
export const DEFAULT_COLOR: string;
export function resolveSpec(spec: unknown, finish: Finish): unknown;

/** The grid contract every icon is drawn against. */
export const GRID: {
  viewBox: string;
  size: number;
  live: { min: number; max: number };
  stroke: number;
  keyshapes: Record<"circle" | "square" | "landscape" | "portrait", Record<string, number>>;
  minGap: number;
  coreInset: number;
  cutGap: number;
};

/** The <frosted-icon> element class. Attributes: name, finish, size, color, label, animate. */
export class FrostedIconElement extends HTMLElement {
  name: IconName | null;
  finish: Finish;
  render(): void;
}
/** Register <frosted-icon> (or a custom tag name). Safe to call more than once. */
export function defineFrostedIcon(tag?: string): void;

declare global {
  interface HTMLElementTagNameMap {
    "frosted-icon": FrostedIconElement;
  }
}
