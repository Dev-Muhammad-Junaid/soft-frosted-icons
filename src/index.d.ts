import type { CSSProperties, ReactNode, SVGProps } from "react";

export type FrostedFinish = "outline" | "duo";

export type FrostedIconName =
  | "home" | "dashboard" | "grid" | "layout" | "sidebar" | "panels" | "table" | "list" | "columns" | "menu"
  | "search" | "filter" | "sort" | "more" | "close" | "check" | "plus" | "minus" | "edit" | "trash" | "copy"
  | "save" | "download" | "upload" | "refresh" | "externalLink" | "arrowLeft" | "arrowRight" | "arrowUp"
  | "arrowDown" | "chevronRight" | "chevronLeft" | "chevronUp" | "chevronDown"
  | "user" | "users" | "userPlus" | "lock" | "unlock" | "shield" | "key" | "eye" | "eyeOff" | "login" | "logout"
  | "mail" | "send" | "inbox" | "chat" | "bell" | "phone" | "link" | "share" | "at"
  | "chart" | "trendingUp" | "trendingDown" | "pieChart" | "activity" | "report" | "wallet" | "creditCard"
  | "dollar" | "cart" | "receipt" | "package"
  | "calendar" | "clock" | "folder" | "file" | "files" | "image" | "database" | "cloud" | "server" | "tag"
  | "bookmark" | "star" | "flag" | "mapPin" | "globe"
  | "settings" | "info" | "help" | "alert" | "warning" | "ban" | "sparkles" | "rocket" | "zap" | "layers"
  | "code" | "terminal" | "support" | "book" | "power"
  | "play" | "pause" | "stop" | "skipNext" | "skipPrev" | "volume" | "mic" | "wifi" | "hash" | "expand"
  | "paperclip" | "scissors" | "repeat" | "shuffle" | "thumbsUp" | "thumbsDown" | "megaphone" | "bluetooth"
  | "sun" | "moon"
  | "camera" | "video" | "printer" | "battery" | "gift" | "truck" | "store" | "briefcase" | "building"
  | "compass" | "coffee" | "umbrella" | "headphones" | "pin" | "paintBrush" | "heart" | "newspaper" | "map"
  | "film" | "cast";

export const FROSTED_ICON_KEYS: FrostedIconName[];
export const FROSTED_LABELS: Record<FrostedIconName, string>;

export const FROSTED_CATEGORIES: Array<{
  id: string;
  label: string;
  hint?: string;
  icons: FrostedIconName[];
}>;

/** The grid contract every icon is drawn against (48 × 48 viewBox). */
export const FROSTED_GRID: {
  viewBox: string;
  size: number;
  live: { min: number; max: number };
  stroke: number;
  keyshapes: Record<"circle" | "square" | "landscape" | "portrait", Record<string, number>>;
  minGap: number;
  coreInset: number;
  cutGap: number;
};

type SvgPassthrough = Omit<SVGProps<SVGSVGElement>, "name" | "color" | "title" | "style" | "className">;

export interface FrostedIconProps extends SvgPassthrough {
  name: FrostedIconName;
  finish?: FrostedFinish;
  size?: number | string;
  /** Specular strength, 0–1. */
  intensity?: number;
  /** Idle specular pulse. */
  animate?: boolean;
  /** Overrides `currentColor` / `--accent`. */
  color?: string;
  /** Accessible name. Omit for decorative icons (rendered aria-hidden). */
  title?: string;
  className?: string;
  style?: CSSProperties;
}

export function FrostedIcon(props: FrostedIconProps): ReactNode;

export function FrostedIconSet(props: {
  names: FrostedIconName[];
  finish?: FrostedFinish;
  size?: number;
  animate?: boolean;
  intensity?: number;
  className?: string;
}): ReactNode;

export function FrostedCatalog(props: {
  size?: number;
  animate?: boolean;
  intensity?: number;
  finish?: FrostedFinish;
  className?: string;
  categories?: typeof FROSTED_CATEGORIES;
}): ReactNode;

/** Hook-free render (SSR / static export). `uid` must be unique per SVG on the page. */
export function renderFrostedIcon(
  name: FrostedIconName,
  props?: {
    uid?: string;
    size?: number | string;
    finish?: FrostedFinish;
    color?: string;
    title?: string;
    className?: string;
    style?: CSSProperties;
  } & SvgPassthrough
): ReactNode;
