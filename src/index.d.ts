import type { CSSProperties, ReactNode } from "react";

export type FrostedFinish = "outline" | "duo";

export const FROSTED_VERSIONS: readonly ["bare"];

export const FROSTED_ICON_KEYS: string[];
export const FROSTED_LABELS: Record<string, string>;
export const LAB_SET2_KEYS: string[];
export const LAB_SET2_DUO_KEYS: string[];
export const LAB_SET2_LABELS: Record<string, string>;
export const FROSTED_CATALOG_OUTLINE_KEYS: string[];

export const FROSTED_CATEGORIES: Array<{
  id: string;
  label: string;
  hint?: string;
  icons: string[];
}>;

export const FROSTED_STANDARDS: {
  viewBox: string;
  tile: { x: number; y: number; w: number; h: number; rx: number };
  glyphInset: { min: number; max: number };
  strokeWidth: { min: number; max: number };
  bareGlyphScale: number;
  layers: string[];
  checklist: string[];
};

export function FrostedIcon(props: {
  name: string;
  finish?: FrostedFinish;
  size?: number;
  intensity?: number;
  animate?: boolean;
  color?: string;
  title?: string;
  className?: string;
  style?: CSSProperties;
}): ReactNode;

export function FrostedIconSet(props: {
  names: string[];
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

export function renderFrostedIcon(
  name: string,
  props: {
    uid: string;
    size?: number;
    finish?: FrostedFinish;
    plate?: boolean;
    version?: "bare";
    color?: string;
    title?: string;
    className?: string;
    style?: CSSProperties;
    optical?: number;
  }
): ReactNode;
