import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  FROSTED_CATALOG_OUTLINE_KEYS,
  FROSTED_ICON_KEYS,
  FROSTED_STANDARDS,
  FrostedIcon,
  LAB_SET2_DUO_KEYS,
  LAB_SET2_KEYS,
  renderFrostedIcon,
} from "../src/index.js";

function renderIcon(name, finish = "outline") {
  const node = renderFrostedIcon(name, {
    uid: `t-${name}-${finish}`,
    size: 48,
    plate: false,
    version: "bare",
    finish,
    title: name,
  });
  expect(node, `${name}/${finish} should render`).toBeTruthy();
  return renderToStaticMarkup(node);
}

describe("registry", () => {
  it("exports a complete key list", () => {
    expect(FROSTED_ICON_KEYS.length).toBeGreaterThan(100);
    expect(new Set(FROSTED_ICON_KEYS).size).toBe(FROSTED_ICON_KEYS.length);
  });

  it("encodes SoftMark language rules", () => {
    expect(FROSTED_STANDARDS.viewBox).toBe("0 0 48 48");
    expect(FROSTED_STANDARDS.checklist.some((c) => /No raw hex fills/i.test(c))).toBe(true);
  });
});

describe.each(FROSTED_ICON_KEYS)("icon %s", (name) => {
  it("renders outline Bare glass", () => {
    const html = renderIcon(name, "outline");
    expect(html).toContain('data-soft-plate="bare"');
    expect(html).toContain('viewBox="0 0 48 48"');
    const hasGlass =
      html.includes('data-soft-layer="face"') || html.includes('data-soft-layer="extrude"');
    expect(hasGlass).toBe(true);
  });
});

function stripCssVars(html) {
  let prev;
  let out = html;
  do {
    prev = out;
    out = out.replace(/var\((?:[^()]|\([^()]*\))*\)/g, "");
  } while (out !== prev);
  return out;
}

describe.each(FROSTED_ICON_KEYS)("theme paints %s", (name) => {
  it("has no raw hex fills/strokes", () => {
    const html = renderIcon(name, "outline");
    const raw = stripCssVars(html).match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    expect(raw, `${name} raw hex: ${raw.join(", ")}`).toEqual([]);
  });
});

describe("finishes", () => {
  it("duo map is a subset of lab set 2 keys", () => {
    expect(LAB_SET2_DUO_KEYS.every((k) => LAB_SET2_KEYS.includes(k))).toBe(true);
  });

  it.each(FROSTED_CATALOG_OUTLINE_KEYS)("%s outline uses stroke paints", (name) => {
    const html = renderIcon(name, "outline");
    expect(html).toContain('gradientUnits="userSpaceOnUse"');
    expect(html).toContain("-s-face");
  });

  it.each(LAB_SET2_DUO_KEYS)("%s duo-tone renders a filled face", (name) => {
    const html = renderIcon(name, "duo");
    expect(html).toContain('data-soft-layer="face"');
    expect(html.includes("-face") || html.includes("-core")).toBe(true);
  });

  it("FrostedIcon renders a named mark", () => {
    const html = renderToStaticMarkup(<FrostedIcon name="check" size={24} title="Check" />);
    expect(html).toContain('viewBox="0 0 48 48"');
    expect(html).toContain("Check");
  });
});
