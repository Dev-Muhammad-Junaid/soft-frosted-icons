/**
 * Bare SoftMark catalog — frosted shaped / stroke marks matching Arrow, User, Bell, Chart.
 * Parallel to Soft Complex tiled definitions in frostedIcons.jsx (do not mutate those).
 *
 * Rule: Bare = SoftMark language · Tiled = Soft Complex TileMark / shaped originals.
 * Theme paints: SoftMark gradients + --soft-cx-frost / --soft-cx-mark / --soft-cx-cut.
 */

import {
  CoreDisc,
  CoreInset,
  Frame,
  SoftCircleMark,
  SoftMark,
  SoftRects,
  SoftStrokeMark,
} from "./softMark";
import { LAB_SET2_BARE, LAB_SET2_OPTICAL } from "./frostedLabSet2";

const CX_FROST = "var(--soft-cx-frost)";
const CX_CUT = "var(--soft-cx-cut)";

/** Glyph that must read on a gold core — Map Pin / Shield punch, not ThemeStroke (blends). */
function CutStroke({ d, width = 2.4 }) {
  return (
    <path
      data-soft-layer="glyph"
      d={d}
      stroke={CX_CUT}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity={0.8}
    />
  );
}

/** Interior lines on a filled body — Arrow/Chevron `*-s-*` stack, not flat frost. */
function ThemeStroke({ uid, d, width = 2.4 }) {
  return (
    <>
      <path
        data-soft-layer="extrude"
        d={d}
        fill="none"
        stroke={`url(#${uid}-s-body)`}
        strokeWidth={width + 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.4}
        transform="translate(0.9 1.1)"
      />
      <path
        data-soft-layer="face"
        d={d}
        fill="none"
        stroke={`url(#${uid}-s-face)`}
        strokeWidth={width + 0.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.95}
      />
      <path
        data-soft-layer="glyph"
        d={d}
        fill="none"
        stroke={`url(#${uid}-s-core)`}
        strokeWidth={width * 0.62}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/* ── Navigation ── */

function Dashboard(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 9.5, y: 9.5, w: 13, h: 13, rx: 3.5, opacity: 0.88 },
        { x: 25.5, y: 9.5, w: 13, h: 8, rx: 3, opacity: 0.72 },
        { x: 25.5, y: 20.5, w: 13, h: 18, rx: 3.5, opacity: 0.8 },
        { x: 9.5, y: 25.5, w: 13, h: 13, rx: 3.5, opacity: 0.68 },
      ]}
    />
  );
}

function Grid(p) {
  const { uid, ...frame } = p;
  const cells = [0, 1].flatMap((r) =>
    [0, 1].map((c) => ({
      x: 10 + c * 14,
      y: 10 + r * 14,
      w: 12,
      h: 12,
      rx: 3.5,
      opacity: 0.78 - (r + c) * 0.08,
    }))
  );
  return <SoftRects uid={uid} {...frame} rects={cells} />;
}

function Layout(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 9.5, y: 9.5, w: 11, h: 29, rx: 3.5, opacity: 0.85 },
        { x: 23.5, y: 9.5, w: 15, h: 13, rx: 3.5, opacity: 0.72 },
        { x: 23.5, y: 25.5, w: 15, h: 13, rx: 3.5, opacity: 0.6 },
      ]}
    />
  );
}

function Sidebar(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 10, y: 10, w: 10, h: 28, rx: 3.2, opacity: 0.88 },
        { x: 23, y: 11.5, w: 15, h: 5.2, rx: 2.6, opacity: 0.78 },
        { x: 23, y: 21.4, w: 15, h: 5.2, rx: 2.6, opacity: 0.68 },
        { x: 23, y: 31.3, w: 15, h: 5.2, rx: 2.6, opacity: 0.58 },
      ]}
    />
  );
}

function Panels(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 9.5, y: 10, w: 13.5, h: 28, rx: 3.5, opacity: 0.82 },
        { x: 25.5, y: 10, w: 13.5, h: 28, rx: 3.5, opacity: 0.62 },
      ]}
    />
  );
}

function Table(p) {
  const { uid, ...frame } = p;
  // Header + 2×3 cells — a grid, not Menu's three full-width bars.
  const cells = [];
  for (let r = 0; r < 3; r += 1) {
    cells.push(
      { x: 11, y: 20.5 + r * 6.6, w: 12, h: 5.2, rx: 2.2, opacity: 0.72 - r * 0.08 },
      { x: 25, y: 20.5 + r * 6.6, w: 12, h: 5.2, rx: 2.2, opacity: 0.6 - r * 0.08 }
    );
  }
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[{ x: 11, y: 11, w: 26, h: 7, rx: 3, opacity: 0.9 }, ...cells]}
    />
  );
}

function List(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {[0, 1, 2].map((i) => {
          const y = 12 + i * 9;
          return (
            <g key={i}>
              <circle
                data-soft-layer="extrude"
                cx={14.2}
                cy={y + 1.4}
                r={2.6}
                fill={`url(#${uid}-body)`}
                opacity={0.45}
              />
              <circle
                data-soft-layer="face"
                cx={13}
                cy={y}
                r={2.6}
                fill={`url(#${uid}-face)`}
                stroke={`url(#${uid}-rim)`}
                strokeWidth={1}
              />
              <CoreDisc uid={uid} cx={13} cy={y} r={2.6} />
              <rect
                data-soft-layer="extrude"
                x={19.2}
                y={y - 1.2}
                width={18}
                height={5.2}
                rx={2.4}
                fill={`url(#${uid}-body)`}
                opacity={0.4}
              />
              <rect
                data-soft-layer="face"
                x={18}
                y={y - 2.6}
                width={18}
                height={5.2}
                rx={2.4}
                fill={`url(#${uid}-face)`}
                stroke={`url(#${uid}-rim)`}
                strokeWidth={1}
              />
              <rect
                data-soft-layer="glyph"
                x={19.4}
                y={y - 1.5}
                width={15.2}
                height={3}
                rx={1.2}
                fill={`url(#${uid}-core)`}
                opacity={0.85}
              />
            </g>
          );
        })}
      </g>
    </Frame>
  );
}

function Columns(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[0, 1, 2].map((i) => ({
        x: 10 + i * 11,
        y: 10,
        w: 9,
        h: 28,
        rx: 3,
        opacity: 0.78 - i * 0.1,
      }))}
    />
  );
}

function Search(p) {
  const { uid, ...frame } = p;
  // Optical center: lens slightly NW so handle balances the mark
  const cx = 21.6;
  const cy = 21.2;
  const r = 11.4;
  const handle = "M29.6 29.2L37.4 37";
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={cx + 1.2} cy={cy + 1.4} r={r} fill={`url(#${uid}-body)`} opacity={0.48} />
        <circle
          data-soft-layer="face"
          cx={cx}
          cy={cy}
          r={r}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.2}
        />
        <circle
          data-soft-layer="glyph"
          cx={cx}
          cy={cy}
          r={6.6}
          fill="none"
          stroke={`url(#${uid}-s-core)`}
          strokeWidth={3.4}
        />
        <circle cx={cx} cy={cy} r={4.8} fill={CX_CUT} opacity={0.55} data-soft-layer="glyph" />
        <path
          data-soft-layer="extrude"
          d={handle}
          stroke={`url(#${uid}-s-body)`}
          strokeWidth={6.4}
          strokeLinecap="round"
          opacity={0.42}
          transform="translate(1 1.2)"
        />
        <path
          data-soft-layer="face"
          d={handle}
          stroke={`url(#${uid}-s-face)`}
          strokeWidth={5.1}
          strokeLinecap="round"
          opacity={0.95}
        />
        <path
          data-soft-layer="glyph"
          d={handle}
          stroke={`url(#${uid}-s-core)`}
          strokeWidth={3.3}
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

function Menu(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[0, 1, 2].map((i) => ({
        x: 11,
        y: 13 + i * 8,
        w: 26,
        h: 5.2,
        rx: 2.6,
        opacity: 0.85 - i * 0.1,
      }))}
    />
  );
}

/* ── Actions ── */

function Filter(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M12 14.5h24l-8 10v8.5l-8-4v-4.5L12 14.5Z"
    />
  );
}

function Sort(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.4}
      paths={["M13 15h22M13 24h15M13 33h10M34 18l4 5-4 5"]}
    />
  );
}

function More(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {[16, 24, 32].map((x) => (
          <g key={x}>
            <circle
              data-soft-layer="extrude"
              cx={x + 1.1}
              cy={25.4}
              r={3.4}
              fill={`url(#${uid}-body)`}
              opacity={0.45}
            />
            <circle
              data-soft-layer="face"
              cx={x}
              cy={24}
              r={3.4}
              fill={`url(#${uid}-face)`}
              stroke={`url(#${uid}-rim)`}
              strokeWidth={1.1}
            />
            <CoreDisc uid={uid} cx={x} cy={24} r={3.4} />
          </g>
        ))}
      </g>
    </Frame>
  );
}

function Close(p) {
  return <SoftStrokeMark {...p} width={3.8} paths={["M15 15l18 18M33 15L15 33"]} />;
}

function Check(p) {
  return <SoftStrokeMark {...p} width={4} d="M14 24.5l6 6L35 15.5" />;
}

function Plus(p) {
  return <SoftStrokeMark {...p} width={3.9} d="M24 14v20M14 24h20" />;
}

function Minus(p) {
  return <SoftStrokeMark {...p} width={3.9} d="M14 24h20" />;
}

function Edit(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M14.5 33.5h6.2L36 18.2l-6.2-6.2L14.5 27.3v6.2Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M28.5 13.5l6 6" />
    </SoftMark>
  );
}

function Copy(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <rect
          data-soft-layer="extrude"
          x={18.5}
          y={12.5}
          width={16}
          height={18}
          rx={3.5}
          fill={`url(#${uid}-body)`}
          opacity={0.4}
        />
        <rect
          data-soft-layer="face"
          x={17}
          y={11}
          width={16}
          height={18}
          rx={3.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
          opacity={0.75}
        />
        <rect
          data-soft-layer="glyph"
          x={19.2}
          y={15.6}
          width={11.6}
          height={10}
          rx={1.6}
          fill={`url(#${uid}-core)`}
          opacity={0.62}
        />
        <rect
          data-soft-layer="extrude"
          x={13.2}
          y={17.5}
          width={16}
          height={18}
          rx={3.5}
          fill={`url(#${uid}-body)`}
          opacity={0.48}
        />
        <rect
          data-soft-layer="face"
          x={11.5}
          y={16}
          width={16}
          height={18}
          rx={3.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <rect
          data-soft-layer="glyph"
          x={13.7}
          y={20.6}
          width={11.6}
          height={10}
          rx={1.6}
          fill={`url(#${uid}-core)`}
          opacity={0.86}
        />
      </g>
    </Frame>
  );
}

function Save(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M12 11h18l6 6v18a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M18 15h9M20 31.5h8" />
    </SoftMark>
  );
}

function Download(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.4}
      paths={["M24 12v18M16.5 23.5L24 31l7.5-7.5M14 36h20"]}
    />
  );
}

function Upload(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.4}
      paths={["M24 36V18M16.5 24.5L24 17l7.5 7.5M14 12h20"]}
    />
  );
}

function Refresh(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.3}
      paths={[
        "M15.5 20.5A9 9 0 0 1 33 19.5M33 13.5v6.5h-6.5",
        "M32.5 27.5A9 9 0 0 1 15 28.5M15 34.5V28h6.5",
      ]}
    />
  );
}

function ExternalLink(p) {
  // Arrow-square-out: open box + arrow with air between them (arrow must not start in the box).
  return (
    <SoftStrokeMark
      {...p}
      width={3.2}
      paths={[
        "M26.5 25.5v7a3 3 0 0 1-3 3H14.5a3 3 0 0 1-3-3V22.5a3 3 0 0 1 3-3H22",
        "M29.5 18.5L37.5 10.5M31.2 10.5h6.3v6.3",
      ]}
    />
  );
}

function Chevron(dir, p) {
  const d = dir === "left" ? "M29 14L19 24l10 10" : "M19 14l10 10-10 10";
  return <SoftStrokeMark {...p} width={4} d={d} />;
}

function Arrow(dir, p) {
  // Same SoftStrokeMark recipe as Download / Upload (shaft + open head, no filled block).
  const d = {
    down: "M24 12v18M16.5 23.5L24 31l7.5-7.5",
    up: "M24 36V18M16.5 24.5L24 17l7.5 7.5",
    right: "M12 24h18M23.5 16.5L31 24l-7.5 7.5",
    left: "M36 24H18M24.5 16.5L17 24l7.5 7.5",
  }[dir];
  return <SoftStrokeMark {...p} width={3.4} d={d} />;
}

/* ── People ── */

function Users(p) {
  const { uid, ...frame } = p;
  const backBody = "M22.5 36.2c1.2-4.2 3.6-6.4 8-6.4 4.2 0 6.8 2 8 5.6";
  const frontBody = "M7.5 36.8c1.7-5.8 5-8.8 11-8.8s9.2 3 11 8.8";
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {/* Back figure — smaller, same SoftMark language as User */}
        <circle data-soft-layer="extrude" cx={31.3} cy={18.4} r={5.2} fill={`url(#${uid}-body)`} opacity={0.38} />
        <circle
          data-soft-layer="face"
          cx={30}
          cy={17}
          r={5.2}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.82}
        />
        <path
          data-soft-layer="face"
          d={backBody}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.78}
        />
        <CoreDisc uid={uid} cx={30} cy={17} r={5.2} scale={0.62} opacity={0.78} />
        <CoreInset uid={uid} d={backBody} cx={30.5} cy={33} scale={0.64} opacity={0.78} />
        {/* Front figure — User proportions, optically centered pair */}
        <circle data-soft-layer="extrude" cx={19.4} cy={17.8} r={6.2} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle
          data-soft-layer="face"
          cx={18}
          cy={16.2}
          r={6.2}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <path
          data-soft-layer="face"
          d={frontBody}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <CoreDisc uid={uid} cx={18} cy={16.2} r={6.2} />
        <CoreInset uid={uid} d={frontBody} cx={18.5} cy={32.2} scale={0.64} />
        <ellipse cx={15.8} cy={13.8} rx={2.8} ry={1.35} fill={CX_FROST} opacity={0.4} data-soft-layer="specular" />
      </g>
    </Frame>
  );
}

function UserPlus(p) {
  const { uid, ...frame } = p;
  const body = "M8.5 36.5c1.8-6.5 5.4-9.8 11.5-9.8s9.7 3.3 11.5 9.8";
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={19.5} cy={17.5} r={5.8} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle data-soft-layer="face" cx={18} cy={16} r={5.8} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.1} />
        <path
          data-soft-layer="face"
          d={body}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <CoreDisc uid={uid} cx={18} cy={16} r={5.8} />
        <CoreInset uid={uid} d={body} cx={20} cy={31.6} scale={0.64} />
        <path
          data-soft-layer="extrude"
          d="M33 15v10M28 20h10"
          stroke={`url(#${uid}-s-body)`}
          strokeWidth={5.4}
          strokeLinecap="round"
          opacity={0.42}
          transform="translate(1 1.2)"
        />
        <path
          data-soft-layer="face"
          d="M33 15v10M28 20h10"
          stroke={`url(#${uid}-s-face)`}
          strokeWidth={4.2}
          strokeLinecap="round"
        />
        <path
          data-soft-layer="glyph"
          d="M33 15v10M28 20h10"
          stroke={`url(#${uid}-s-core)`}
          strokeWidth={2.6}
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

function LockBody({ uid, shackle, ...frame }) {
  const body = "M16 22h16a3.5 3.5 0 0 1 3.5 3.5v10A3.5 3.5 0 0 1 32 39H16a3.5 3.5 0 0 1-3.5-3.5v-10A3.5 3.5 0 0 1 16 22Z";
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d={body}
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1.1 1.3)"
        />
        <path
          data-soft-layer="face"
          d={body}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        {/* Core follows the body, not viewBox center — SoftMark 24,24 drifts into the shackle. */}
        <CoreInset uid={uid} d={body} cx={24} cy={30.5} scale={0.64} />
        <ThemeStroke uid={uid} width={3.2} d={shackle} />
        <circle cx={24} cy={30.5} r={2} fill={CX_CUT} opacity={0.72} data-soft-layer="glyph" />
      </g>
    </Frame>
  );
}

function Lock(p) {
  const { uid, ...frame } = p;
  return <LockBody uid={uid} {...frame} shackle="M19 26.5V14a5 5 0 0 1 10 0V26.5" />;
}

function Unlock(p) {
  const { uid, ...frame } = p;
  return <LockBody uid={uid} {...frame} shackle="M19 26.5V14a5 5 0 0 1 10 0" />;
}

function Shield(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M24 9.5l12 4.5v9.5c0 7.2-5 11.8-12 14-7-2.2-12-6.8-12-14V14L24 9.5Z"
    >
      <ThemeStroke uid={uid} width={2.8} d="M19 24.5l3.2 3.2L29.5 20" />
    </SoftMark>
  );
}

function Key(p) {
  const { uid, ...frame } = p;
  const shaft = "M22 24h14.5l-.2 4.2h-3.2l-.3 3.2h-3.4V28.2H26.5";
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={17.5} cy={25.5} r={7.2} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle
          data-soft-layer="face"
          cx={16}
          cy={24}
          r={7.2}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <CoreDisc uid={uid} cx={16} cy={24} r={7.2} />
        <path
          data-soft-layer="face"
          d={shaft}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <CoreInset uid={uid} d={shaft} cx={29} cy={26.5} scale={0.68} />
      </g>
    </Frame>
  );
}

function Eye(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M12 24c3.2-6.2 7.6-9.2 12-9.2S32.8 17.8 36 24c-3.2 6.2-7.6 9.2-12 9.2S15.2 30.2 12 24Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M28.4 24a4.4 4.4 0 1 1-8.8 0a4.4 4.4 0 1 1 8.8 0" />
    </SoftMark>
  );
}

function EyeOff(p) {
  const { uid, ...frame } = p;
  // Same almond as Eye SoftMark + Close-weight slash on top
  const eye =
    "M12 24c3.2-6.2 7.6-9.2 12-9.2S32.8 17.8 36 24c-3.2 6.2-7.6 9.2-12 9.2S15.2 30.2 12 24Z";
  const slash = "M15.5 32.2L32.5 15.8";
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d={eye}
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1.2 1.5)"
        />
        <path
          data-soft-layer="face"
          d={eye}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <ThemeStroke uid={uid} width={2.6} d="M28.4 24a4.4 4.4 0 1 1-8.8 0a4.4 4.4 0 1 1 8.8 0" />
        <path
          data-soft-layer="extrude"
          d={slash}
          stroke={`url(#${uid}-s-body)`}
          strokeWidth={6.8}
          strokeLinecap="round"
          opacity={0.45}
          transform="translate(1.15 1.35)"
        />
        <path
          data-soft-layer="face"
          d={slash}
          stroke={`url(#${uid}-s-face)`}
          strokeWidth={5.2}
          strokeLinecap="round"
          opacity={0.95}
        />
        <path
          data-soft-layer="glyph"
          d={slash}
          stroke={`url(#${uid}-s-core)`}
          strokeWidth={3.4}
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

function Login(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.3}
      paths={["M20 12h-6a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h6M24 24h14M32 17l7 7-7 7"]}
    />
  );
}

function Logout(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.3}
      paths={["M28 12h6a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3h-6M24 24H10M16 17l-7 7 7 7"]}
    />
  );
}

/* ── Comms ── */

function Mail(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M13.5 17h21a2.6 2.6 0 0 1 2.6 2.6v10.8a2.6 2.6 0 0 1-2.6 2.6h-21a2.6 2.6 0 0 1-2.6-2.6V19.6A2.6 2.6 0 0 1 13.5 17Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M13.8 18.6L24 26.2 34.2 18.6" />
    </SoftMark>
  );
}

function Send(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M10 22.5L38 12l-8.5 24-5.5-9.5L10 22.5Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M24 26.5L29.5 36" />
    </SoftMark>
  );
}

function Inbox(p) {
  const { uid, ...frame } = p;
  // Tray in the Download optical box (~13–35), not a full-width bin.
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M15.2 16h17.6l2 7.6V34.6a2.5 2.5 0 0 1-2.5 2.5H15.7a2.5 2.5 0 0 1-2.5-2.5V23.6L15.2 16Z"
    >
      <ThemeStroke uid={uid} width={2.8} d="M12.7 23.6h6a5.3 5.3 0 0 0 10.6 0h6" />
    </SoftMark>
  );
}

function Phone(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M17 10h14a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M20.5 14.5h7M25.8 33a1.8 1.8 0 1 1-3.6 0a1.8 1.8 0 1 1 3.6 0" />
    </SoftMark>
  );
}

function Chat(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M11 13h24a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H21l-7 6v-6h-3a4 4 0 0 1-4-4V17a4 4 0 0 1 4-4Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M19.8 22a1.8 1.8 0 1 1-3.6 0a1.8 1.8 0 1 1 3.6 0M25.8 22a1.8 1.8 0 1 1-3.6 0a1.8 1.8 0 1 1 3.6 0M31.8 22a1.8 1.8 0 1 1-3.6 0a1.8 1.8 0 1 1 3.6 0" />
    </SoftMark>
  );
}

function Bell(p) {
  const { uid, ...frame } = p;
  const dome =
    "M14.2 18.5a9.8 9.8 0 0 1 19.6 0c0 5.8 2 8.1 3 9.5a1.5 1.5 0 0 1-1.25 2.35H12.45a1.5 1.5 0 0 1-1.25-2.35c1-1.4 3-3.7 3-9.5Z";
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d={dome}>
      <ThemeStroke uid={uid} width={2.6} d="M20.6 34.4a3.4 3.4 0 0 0 6.8 0M25.6 12.2a1.6 1.6 0 1 1-3.2 0a1.6 1.6 0 1 1 3.2 0" />
    </SoftMark>
  );
}

function Link(p) {
  // Two chain loops pulled apart on the diagonal so the glass halo does not weld.
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={2.6}
      paths={[
        "M13.8 29.2a5.8 5.8 0 0 1 0-8.2l5.8-5.8a5.8 5.8 0 0 1 8.2 8.2L24.4 26.8",
        "M34.2 18.8a5.8 5.8 0 0 1 0 8.2l-5.8 5.8a5.8 5.8 0 0 1-8.2-8.2L23.6 21.2",
      ]}
    />
  );
}

function Share(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {[
          { x: 31, y: 15 },
          { x: 15, y: 24 },
          { x: 31, y: 33 },
        ].map(({ x, y }) => (
          <g key={`${x}-${y}`}>
            <circle data-soft-layer="extrude" cx={x + 1} cy={y + 1.2} r={3.6} fill={`url(#${uid}-body)`} opacity={0.45} />
            <circle
              data-soft-layer="face"
              cx={x}
              cy={y}
              r={3.6}
              fill={`url(#${uid}-face)`}
              stroke={`url(#${uid}-rim)`}
              strokeWidth={1.1}
            />
            <CoreDisc uid={uid} cx={x} cy={y} r={3.6} />
          </g>
        ))}
        <path
          data-soft-layer="extrude"
          d="M18 22.4l10-5.2M18 25.6l10 5.2"
          stroke={`url(#${uid}-s-body)`}
          strokeWidth={5.2}
          strokeLinecap="round"
          opacity={0.42}
          transform="translate(1 1.2)"
        />
        <path
          data-soft-layer="face"
          d="M18 22.4l10-5.2M18 25.6l10 5.2"
          stroke={`url(#${uid}-s-face)`}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <path
          data-soft-layer="glyph"
          d="M18 22.4l10-5.2M18 25.6l10 5.2"
          stroke={`url(#${uid}-s-core)`}
          strokeWidth={2.6}
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

function At(p) {
  // Open @ — one continuous spiral. Generous ring gap + tight halo so it
  // reads as Close-family stroke, not a filled disc with a letter on it.
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={2.6}
      d="M30.2 24a7.4 7.4 0 1 1-14.8 0 7.4 7.4 0 1 1 14.8 0v5a4.8 4.8 0 0 0 9.6 0V24a15.2 15.2 0 1 0-11.2 14.4"
    />
  );
}

/* ── Data ── */

function TrendingUp(p) {
  return <SoftStrokeMark {...p} width={3.4} paths={["M13 31l8.5-9 5.5 4.5 9-12M30 14.5h8v8"]} />;
}

function TrendingDown(p) {
  return <SoftStrokeMark {...p} width={3.4} paths={["M13 17l8.5 9 5.5-4.5 9 12M30 33.5h8v-8"]} />;
}

function PieChart(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={25.2} cy={25.5} r={13.8} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle
          data-soft-layer="face"
          cx={24}
          cy={24}
          r={13.8}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        {/* Wedges are Chart cores on frost face — no extra disc glow */}
        <path
          data-soft-layer="glyph"
          d="M24 24V10.2A13.8 13.8 0 0 1 37.8 24H24Z"
          fill={`url(#${uid}-core)`}
          opacity={0.92}
        />
        <path
          data-soft-layer="glyph"
          d="M24 24l11.6 7.4A13.8 13.8 0 0 1 24 37.8V24Z"
          fill={`url(#${uid}-core)`}
          opacity={0.7}
        />
          <ThemeStroke uid={uid} width={2.6} d="M24 10.2V37.8M24 24H37.8" />
      </g>
    </Frame>
  );
}

function Activity(p) {
  return <SoftStrokeMark {...p} width={3.3} d="M12 24h4.5l3.5-10 5 20 4.5-12 3.5 5H36" />;
}

function Report(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M13 10h22a3.5 3.5 0 0 1 3.5 3.5v21A3.5 3.5 0 0 1 35 38H13a3.5 3.5 0 0 1-3.5-3.5v-21A3.5 3.5 0 0 1 13 10Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M17 19.5h14M17 25.5h12M17 31.5h10" />
    </SoftMark>
  );
}

function CreditCard(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M13 17h22a2.6 2.6 0 0 1 2.6 2.6v10.8a2.6 2.6 0 0 1-2.6 2.6H13a2.6 2.6 0 0 1-2.6-2.6V19.6A2.6 2.6 0 0 1 13 17Z"
    >
      <ThemeStroke uid={uid} width={3.2} d="M13.5 23.3h21" />
      <ThemeStroke uid={uid} width={2.8} d="M16 29.2h7" />
    </SoftMark>
  );
}

function Dollar(p) {
  // Stem + S-curve (the variation that read as $). Two paths so the S does not weld to the stem.
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M24 11.5v25",
        "M32 16.4c-1.2-2.6-3.5-4.2-7.2-4.2-4 0-6.8 2.2-6.8 5.2 0 7.2 13.2 3.4 13.2 10.6 0 3.2-3.2 5.4-7 5.4-3.8 0-6.5-1.8-7.6-4.6",
      ]}
    />
  );
}

function Cart(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M11 14h4l3.5 15h15l3-10.5H18"
          fill="none"
          stroke={`url(#${uid}-s-body)`}
          strokeWidth={5.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.42}
          transform="translate(1 1.2)"
        />
        <path
          data-soft-layer="face"
          d="M11 14h4l3.5 15h15l3-10.5H18"
          fill="none"
          stroke={`url(#${uid}-s-face)`}
          strokeWidth={4.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          data-soft-layer="glyph"
          d="M11 14h4l3.5 15h15l3-10.5H18"
          fill="none"
          stroke={`url(#${uid}-s-core)`}
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle data-soft-layer="extrude" cx={22} cy={35.6} r={2.4} fill={`url(#${uid}-body)`} opacity={0.42} />
        <circle cx={21} cy={34.5} r={2.4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1} data-soft-layer="face" />
        <CoreDisc uid={uid} cx={21} cy={34.5} r={2.4} />
        <circle data-soft-layer="extrude" cx={32} cy={35.6} r={2.4} fill={`url(#${uid}-body)`} opacity={0.42} />
        <circle cx={31} cy={34.5} r={2.4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1} data-soft-layer="face" />
        <CoreDisc uid={uid} cx={31} cy={34.5} r={2.4} />
      </g>
    </Frame>
  );
}

function Receipt(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M14 10h20v28l-3.2-2-3.3 2-3.3-2-3.3 2-3.3-2-3.6 2V10Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M18 17.3h12M18 23.2h9" />
    </SoftMark>
  );
}

function Package(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M12 18.5L24 12l12 6.5v13L24 38 12 31.5v-13Z"
    >
      <ThemeStroke uid={uid} width={2.8} d="M12 18.5l12 6.5 12-6.5M24 25v13" />
    </SoftMark>
  );
}

/* ── Content ── */

function Calendar(p) {
  const { uid, ...frame } = p;
  // Binder rings sit above the header but inside viewBox inset (≥10), not flush/scalloped
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <rect data-soft-layer="extrude" x={11.6} y={16} width={27} height={24} rx={6.5} fill={`url(#${uid}-body)`} opacity={0.48} />
        <rect
          data-soft-layer="face"
          x={10}
          y={14}
          width={28}
          height={24}
          rx={6.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <rect x={10} y={14} width={28} height={8.5} rx={6.5} fill={`url(#${uid}-core)`} opacity={0.9} data-soft-layer="glyph" />
        <rect x={10} y={19} width={28} height={3.5} fill={`url(#${uid}-core)`} opacity={0.9} data-soft-layer="glyph" />
        {[16.5, 24, 31.5].map((x) => (
          <g key={x} data-soft-layer="glyph">
            <rect x={x - 1.25} y={10.4} width={2.5} height={6.2} rx={1.25} fill={`url(#${uid}-core)`} />
          </g>
        ))}
        <ThemeStroke
          uid={uid}
          width={2.6}
          d="M16.4 27.1h4.4M22.8 27.1h4.4M29.2 27.1h4.4M16.4 31.2h4.4M22.8 31.2h4.4M29.2 31.2h4.4"
        />
      </g>
    </Frame>
  );
}

function Clock(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={14} coreInset={false}>
      <ThemeStroke uid={uid} width={2.8} d="M24 15v10l6.5 3.5" />
    </SoftCircleMark>
  );
}

function File(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M14 10h12l8 8v18a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M26 10v8h8" />
    </SoftMark>
  );
}

function Files(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <rect data-soft-layer="extrude" x={19} y={11} width={16} height={20} rx={3.5} fill={`url(#${uid}-body)`} opacity={0.4} />
        <rect
          data-soft-layer="face"
          x={17.5}
          y={9.5}
          width={16}
          height={20}
          rx={3.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.75}
        />
        <rect
          data-soft-layer="glyph"
          x={19.7}
          y={14.8}
          width={11.6}
          height={10.4}
          rx={1.6}
          fill={`url(#${uid}-core)`}
          opacity={0.72}
        />
        <rect data-soft-layer="extrude" x={13.2} y={15} width={16} height={20} rx={3.5} fill={`url(#${uid}-body)`} opacity={0.48} />
        <rect
          data-soft-layer="face"
          x={11.5}
          y={13.5}
          width={16}
          height={20}
          rx={3.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <rect
          data-soft-layer="glyph"
          x={13.7}
          y={18.8}
          width={11.6}
          height={10.4}
          rx={1.6}
          fill={`url(#${uid}-core)`}
          opacity={0.85}
        />
      </g>
    </Frame>
  );
}

function Image(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M13.5 14.5h21a2.8 2.8 0 0 1 2.8 2.8v13.4a2.8 2.8 0 0 1-2.8 2.8h-21a2.8 2.8 0 0 1-2.8-2.8V17.3a2.8 2.8 0 0 1 2.8-2.8Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M21 20.8a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0" />
      <ThemeStroke uid={uid} width={2.6} d="M13.6 31.2l6.4-6.2 4.4 4.2 3.6-3.6 7.2 5.6" />
    </SoftMark>
  );
}

function Database(p) {
  const { uid, ...frame } = p;
  // SoftMark cylinder: identical rx/ry lids + two body bands (no broken cubic stack)
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M12 14v18c0 2.2 5.4 4 12 4s12-1.8 12-4V14"
          fill={`url(#${uid}-body)`}
          opacity={0.4}
          transform="translate(1.1 1.3)"
        />
        <path
          data-soft-layer="face"
          d="M12 22v10c0 2.2 5.4 4 12 4s12-1.8 12-4V22"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.7}
        />
        <path
          data-soft-layer="face"
          d="M12 14v10c0 2.2 5.4 4 12 4s12-1.8 12-4V14"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
          opacity={0.85}
        />
        <ellipse data-soft-layer="face" cx={24} cy={32} rx={12} ry={4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1} opacity={0.65} />
        <ellipse cx={24} cy={32} rx={8} ry={2.4} fill={`url(#${uid}-core)`} opacity={0.7} data-soft-layer="glyph" />
        <ellipse data-soft-layer="face" cx={24} cy={24} rx={12} ry={4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.05} opacity={0.8} />
        <ellipse cx={24} cy={24} rx={8} ry={2.4} fill={`url(#${uid}-core)`} opacity={0.8} data-soft-layer="glyph" />
        <ellipse data-soft-layer="extrude" cx={25.2} cy={15.5} rx={12} ry={4} fill={`url(#${uid}-body)`} opacity={0.42} />
        <ellipse data-soft-layer="face" cx={24} cy={14} rx={12} ry={4} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={1.15} />
        <ellipse cx={24} cy={14} rx={8} ry={2.4} fill={`url(#${uid}-core)`} opacity={0.88} data-soft-layer="glyph" />
      </g>
    </Frame>
  );
}

function Cloud(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M14 30h18a7 7 0 0 0 1-14 9.2 9.2 0 0 0-17.8 3.2A6.2 6.2 0 0 0 14 30Z"
    />
  );
}

function Server(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[0, 1, 2].map((i) => ({
        x: 11,
        y: 10 + i * 11,
        w: 26,
        h: 9,
        rx: 3,
        opacity: 0.8 - i * 0.1,
        coreY: 0.28,
        coreH: 0.56,
      }))}
    >
      <ThemeStroke
        uid={uid}
        width={2.4}
        d="M17.5 14.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 1 1 3 0M17.5 25.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 1 1 3 0M17.5 36.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 1 1 3 0"
      />
    </SoftRects>
  );
}

function Tag(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M12.5 24l9-9h13a3.5 3.5 0 0 1 3.5 3.5v11A3.5 3.5 0 0 1 34.5 33H21.5L12.5 24Z"
    >
      <circle cx={31} cy={24} r={2.2} fill={CX_CUT} opacity={0.7} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Bookmark(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M14 9h20v30l-10-6.5L14 39V9Z"
    />
  );
}

function Star(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M24 9.5l4.2 8.5 9.4 1.4-6.8 6.6 1.6 9.4L24 30.8l-8.4 4.6 1.6-9.4-6.8-6.6 9.4-1.4L24 9.5Z"
    />
  );
}

function Flag(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M17 14h16l-3.2 6 3.2 6H17V14Z"
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1.1 1.3)"
        />
        <path
          data-soft-layer="face"
          d="M16 12.5h16l-3.2 6 3.2 6H16V12.5Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <CoreInset uid={uid} d="M16 12.5h16l-3.2 6 3.2 6H16V12.5Z" cx={24} cy={18.5} scale={0.64} />
        <path
          data-soft-layer="extrude"
          d="M16 12v26"
          stroke={`url(#${uid}-s-body)`}
          strokeWidth={5.2}
          strokeLinecap="round"
          opacity={0.42}
          transform="translate(1 1.2)"
        />
        <path
          data-soft-layer="face"
          d="M16 12v26"
          stroke={`url(#${uid}-s-face)`}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <path
          data-soft-layer="glyph"
          d="M16 12v26"
          stroke={`url(#${uid}-s-core)`}
          strokeWidth={2.6}
          strokeLinecap="round"
        />
      </g>
    </Frame>
  );
}

function MapPin(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M24 12.5c5.2 0 9.2 4 9.2 8.8 0 6.6-9.2 15.2-9.2 15.2S14.8 27.9 14.8 21.3C14.8 16.5 18.8 12.5 24 12.5Z"
    >
      <circle cx={24} cy={20.6} r={3.2} fill={CX_CUT} opacity={0.7} data-soft-layer="glyph" />
    </SoftMark>
  );
}

function Globe(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={13.5} coreInset={false}>
      <ThemeStroke uid={uid} width={2.6} d="M24 10.5A5.5 13.5 0 0 1 24 37.5A5.5 13.5 0 0 1 24 10.5" />
      <ThemeStroke uid={uid} width={2.6} d="M11 24h26M12.5 18.5h23M12.5 29.5h23" />
    </SoftCircleMark>
  );
}

/* ── System ── */

function Settings(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={8.5} coreInset={false}>
      <g data-soft-layer="glyph" transform="translate(24 24)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            x={-2}
            y={-14}
            width={4}
            height={8.5}
            rx={1.4}
            fill={`url(#${uid}-face)`}
            stroke={`url(#${uid}-rim)`}
            strokeWidth={0.8}
            transform={`rotate(${deg})`}
          />
        ))}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={`core-${deg}`}
            x={-1.55}
            y={-13.6}
            width={3.1}
            height={7.6}
            rx={1.1}
            fill={`url(#${uid}-core)`}
            opacity={0.88}
            transform={`rotate(${deg})`}
          />
        ))}
      </g>
      <circle cx={24} cy={24} r={5.2} fill={`url(#${uid}-face)`} stroke={`url(#${uid}-rim)`} strokeWidth={0.8} data-soft-layer="face" />
      <circle cx={24} cy={24} r={3.2} fill={`url(#${uid}-core)`} data-soft-layer="glyph" />
      <circle cx={24} cy={24} r={1.55} fill={CX_CUT} opacity={0.7} data-soft-layer="glyph" />
    </SoftCircleMark>
  );
}

function Info(p) {
  // Power/Download-weight circle + i — stroke mark, not a filled badge disc.
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.4}
      d="M35 24a11 11 0 1 1-22 0 11 11 0 1 1 22 0M24 21.6v8.2M24 16.2v1.5"
    />
  );
}

function Help(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.4}
      d="M35 24a11 11 0 1 1-22 0 11 11 0 1 1 22 0M19.8 20.4c0-2.4 1.8-4.1 4.2-4.1s4.2 1.7 4.2 4.1c0 2.4-2 3.4-4.2 4.8v2.2M24 31.6v1.5"
    />
  );
}

function Alert(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.4}
      d="M35 24a11 11 0 1 1-22 0 11 11 0 1 1 22 0M24 16.6v10.4M24 31.6v1.5"
    />
  );
}

function Warning(p) {
  // Info/Help/Alert peer: stroke triangle + bang (same paints), not a filled body with a cut !.
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.4}
      paths={["M24 11.5L38 37H10L24 11.5Z", "M24 21v9M24 33.2v1.6"]}
    />
  );
}

function Ban(p) {
  // Same circle + interior stroke as Info; slash instead of i.
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.4}
      d="M35 24a11 11 0 1 1-22 0 11 11 0 1 1 22 0M16.5 31.5L31.5 16.5"
    />
  );
}

function Sparkles(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M24 11l2.2 6 6 2.2-6 2.2L24 27.4l-2.2-6-6-2.2 6-2.2L24 11Z"
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1.1 1.3)"
        />
        <path
          data-soft-layer="face"
          d="M24 11l2.2 6 6 2.2-6 2.2L24 27.4l-2.2-6-6-2.2 6-2.2L24 11Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <CoreInset uid={uid} d="M24 11l2.2 6 6 2.2-6 2.2L24 27.4l-2.2-6-6-2.2 6-2.2L24 11Z" cx={24} cy={19.2} scale={0.64} />
        <path
          data-soft-layer="face"
          d="M34 26l1.2 3.2 3.2 1.2-3.2 1.2L34 34.8l-1.2-3.2-3.2-1.2 3.2-1.2L34 26Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1}
          opacity={0.85}
        />
        <CoreInset uid={uid} d="M34 26l1.2 3.2 3.2 1.2-3.2 1.2L34 34.8l-1.2-3.2-3.2-1.2 3.2-1.2L34 26Z" cx={34} cy={30.4} scale={0.68} opacity={0.82} />
        <path
          data-soft-layer="face"
          d="M14 28l1 2.6 2.6 1-2.6 1L14 35.2l-1-2.6-2.6-1 2.6-1L14 28Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1}
          opacity={0.75}
        />
        <CoreInset uid={uid} d="M14 28l1 2.6 2.6 1-2.6 1L14 35.2l-1-2.6-2.6-1 2.6-1L14 28Z" cx={14} cy={31.6} scale={0.68} opacity={0.78} />
      </g>
    </Frame>
  );
}

function Rocket(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M24 9c5 4.2 7.5 10.2 7.5 16.5l-3.5 1.8-4-9.5-4 9.5-3.5-1.8C16.5 19.2 19 13.2 24 9Z"
    >
      <circle cx={24} cy={20} r={2.2} fill={CX_CUT} opacity={0.7} data-soft-layer="glyph" />
      <ThemeStroke uid={uid} width={2.2} d="M19.5 30c-1.5 1.5-2.5 3.5-2.5 3.5s2.2-.6 3.6-2M28.5 30c1.5 1.5 2.5 3.5 2.5 3.5s-2.2-.6-3.6-2" />
    </SoftMark>
  );
}

function Zap(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M28 9L15 25.5h8.5L19.5 39 35 21.5h-8.5L28 9Z"
    />
  );
}

function Layers(p) {
  const { uid, ...frame } = p;
  // Three filled diamonds — consistent spacing / perspective / SoftMark weight
  const layers = [
    { d: "M24 22.5l12.5 6.2-12.5 6.2-12.5-6.2L24 22.5Z", opacity: 0.58, cy: 28.7 },
    { d: "M24 16.5l12.5 6.2-12.5 6.2-12.5-6.2L24 16.5Z", opacity: 0.74, cy: 22.7 },
    { d: "M24 10.5l12.5 6.2-12.5 6.2-12.5-6.2L24 10.5Z", opacity: 1, cy: 16.7 },
  ];
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {layers.map((layer, i) => (
          <g key={i}>
            <path
              data-soft-layer="extrude"
              d={layer.d}
              fill={`url(#${uid}-body)`}
              opacity={0.38}
              transform="translate(1.1 1.3)"
            />
            <path
              data-soft-layer="face"
              d={layer.d}
              fill={`url(#${uid}-face)`}
              stroke={`url(#${uid}-rim)`}
              strokeWidth={1.1}
              opacity={layer.opacity}
            />
            <CoreInset uid={uid} d={layer.d} cx={24} cy={layer.cy} scale={0.68} opacity={0.7 + i * 0.1} />
          </g>
        ))}
      </g>
    </Frame>
  );
}

function Code(p) {
  return <SoftStrokeMark {...p} width={3.3} paths={["M19 15l-7 9 7 9M29 15l7 9-7 9M27 13.5l-5.5 21"]} />;
}

function Terminal(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M13.5 14h21a2.8 2.8 0 0 1 2.8 2.8v14.4a2.8 2.8 0 0 1-2.8 2.8h-21a2.8 2.8 0 0 1-2.8-2.8V16.8A2.8 2.8 0 0 1 13.5 14Z"
    >
      <ThemeStroke uid={uid} width={3.2} d="M17 20.5l5 3.8-5 3.8M24.5 28h7.5" />
    </SoftMark>
  );
}

function Support(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M15 24.5a9 9 0 0 1 18 0"
          fill="none"
          stroke={`url(#${uid}-s-body)`}
          strokeWidth={5.4}
          strokeLinecap="round"
          opacity={0.42}
          transform="translate(1 1.2)"
        />
        <path
          data-soft-layer="face"
          d="M15 24.5a9 9 0 0 1 18 0"
          fill="none"
          stroke={`url(#${uid}-s-face)`}
          strokeWidth={4.2}
          strokeLinecap="round"
        />
        <path
          data-soft-layer="glyph"
          d="M15 24.5a9 9 0 0 1 18 0"
          fill="none"
          stroke={`url(#${uid}-s-core)`}
          strokeWidth={2.6}
          strokeLinecap="round"
        />
        <rect data-soft-layer="extrude" x={13.5} y={25} width={6} height={10} rx={2.5} fill={`url(#${uid}-body)`} opacity={0.45} />
        <rect
          data-soft-layer="face"
          x={12}
          y={23.5}
          width={6}
          height={10}
          rx={2.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <rect x={13.05} y={25.3} width={3.9} height={6.4} rx={1.35} fill={`url(#${uid}-core)`} opacity={0.88} data-soft-layer="glyph" />
        <rect data-soft-layer="extrude" x={30.5} y={25} width={6} height={10} rx={2.5} fill={`url(#${uid}-body)`} opacity={0.45} />
        <rect
          data-soft-layer="face"
          x={29}
          y={23.5}
          width={6}
          height={10}
          rx={2.5}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <rect x={30.05} y={25.3} width={3.9} height={6.4} rx={1.35} fill={`url(#${uid}-core)`} opacity={0.88} data-soft-layer="glyph" />
      </g>
    </Frame>
  );
}

function Book(p) {
  const { uid, ...frame } = p;
  const left =
    "M11.6 14.8L24.8 18.2v18.5L13.4 33.6a2 2 0 0 1-1.8-2V16.8a2 2 0 0 1 1.5-2Z";
  const right =
    "M36.4 14.8L23.2 18.2v18.5L34.6 33.6a2 2 0 0 1 1.8-2V16.8a2 2 0 0 1-1.5-2Z";
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d={left}
          fill={`url(#${uid}-body)`}
          opacity={0.45}
          transform="translate(1 1.3)"
        />
        <path
          data-soft-layer="extrude"
          d={right}
          fill={`url(#${uid}-body)`}
          opacity={0.4}
          transform="translate(1 1.3)"
        />
        <path
          data-soft-layer="face"
          d={left}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
        />
        <CoreInset uid={uid} d={left} cx={18.2} cy={24.8} scale={0.68} />
        <path
          data-soft-layer="face"
          d={right}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.05}
        />
        <CoreInset uid={uid} d={right} cx={29.8} cy={24.8} scale={0.68} />
        <ThemeStroke uid={uid} width={2.6} d="M24 18.2v18.5" />
      </g>
    </Frame>
  );
}

function Power(p) {
  // Single path + absolute arc so stem sits in the open gap center
  return <SoftStrokeMark {...p} width={3.6} d="M24 11.5v13M31.8 18.5A9.8 9.8 0 1 1 16.2 18.5" />;
}

function Trash(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M13 17h22v19.5A4 4 0 0 1 31 40.5H17A4 4 0 0 1 13 36.5V17Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M11 14h26M18 14V11.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V14" />
      <ThemeStroke uid={uid} width={2.6} d="M20 22v8M24 22v8M28 22v8" />
    </SoftMark>
  );
}

function Wallet(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M14 15.5H33A6 6 0 0 1 39 21.5V27.5A6 6 0 0 1 33 33.5H14A6 6 0 0 1 8 27.5V21.5A6 6 0 0 1 14 15.5Z"
    >
      <path
        data-soft-layer="extrude"
        d="M10 15.8l3.2-4.6A4 4 0 0 1 16.6 9.2h14A4 4 0 0 1 34 11.3l3 4.5"
        fill={`url(#${uid}-body)`}
        opacity={0.42}
        transform="translate(1 1.2)"
      />
      <path
        data-soft-layer="face"
        d="M10 15.8l3.2-4.6A4 4 0 0 1 16.6 9.2h14A4 4 0 0 1 34 11.3l3 4.5"
        fill={`url(#${uid}-face)`}
        stroke={`url(#${uid}-rim)`}
        strokeWidth={1}
      />
      <CoreInset
        uid={uid}
        d="M10 15.8l3.2-4.6A4 4 0 0 1 16.6 9.2h14A4 4 0 0 1 34 11.3l3 4.5"
        cx={24}
        cy={12.5}
        scale={0.7}
        opacity={0.7}
      />
      <ThemeStroke uid={uid} width={2.6} d="M27 20h9.5a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H27a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3ZM33.5 24.5a1.7 1.7 0 1 1-3.4 0a1.7 1.7 0 1 1 3.4 0" />
    </SoftMark>
  );
}

function Folder(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M9 17h9.2l2.5 2.6H37.5A3.5 3.5 0 0 1 41 23.1v14.3A3.5 3.5 0 0 1 37.5 41H12.5A3.5 3.5 0 0 1 9 37.4V17Z"
    />
  );
}

/**
 * Optical fit vs Download / arrows (span ≈ 25 in the 48 viewBox).
 * 1 = leave as-is. Applied in renderFrostedIcon via Frame `optical`.
 */
export const BARE_OPTICAL = {
  chat: 0.75,
  wallet: 0.78,
  server: 0.79,
  table: 0.79,
  columns: 0.79,
  folder: 0.8,
  bookmark: 0.81,
  zap: 0.81,
  at: 0.81,
  users: 0.82,
  panels: 0.83,
  home: 0.84,
  file: 0.84,
  dashboard: 0.84,
  layout: 0.84,
  report: 0.84,
  dollar: 0.92,
  trash: 0.85,
  calendar: 0.86,
  userPlus: 0.86,
  shield: 0.86,
  phone: 0.86,
  receipt: 0.86,
  clock: 0.86,
  sidebar: 0.87,
  cloud: 0.87,
  login: 0.87,
  logout: 0.87,
  send: 0.87,
  bell: 0.88,
  pieChart: 0.88,
  cart: 0.88,
  save: 0.89,
  globe: 0.89,
  search: 0.9,
  star: 0.9,
  lock: 0.9,
  unlock: 0.9,
  chart: 0.9,
  creditCard: 0.9,
  settings: 0.91,
  sparkles: 0.91,
  image: 0.92,
  terminal: 0.92,
  key: 0.92,
  mail: 0.93,
  user: 0.93,
  package: 0.93,
  grid: 0.93,
  database: 0.93,
  menu: 0.94,
  list: 0.95,
  tag: 0.96,
  ...LAB_SET2_OPTICAL,
};

/** Keys with dedicated SoftMark bare bodies (TileMark counterparts). */
export const FROSTED_BARE_ICON_MAP = {
  dashboard: Dashboard,
  grid: Grid,
  layout: Layout,
  sidebar: Sidebar,
  panels: Panels,
  table: Table,
  list: List,
  columns: Columns,
  menu: Menu,
  search: Search,
  filter: Filter,
  sort: Sort,
  more: More,
  close: Close,
  check: Check,
  plus: Plus,
  minus: Minus,
  edit: Edit,
  copy: Copy,
  save: Save,
  download: Download,
  upload: Upload,
  refresh: Refresh,
  externalLink: ExternalLink,
  chevronRight: (p) => Chevron("right", p),
  chevronLeft: (p) => Chevron("left", p),
  arrowLeft: (p) => Arrow("left", p),
  arrowRight: (p) => Arrow("right", p),
  arrowUp: (p) => Arrow("up", p),
  arrowDown: (p) => Arrow("down", p),
  users: Users,
  userPlus: UserPlus,
  lock: Lock,
  unlock: Unlock,
  shield: Shield,
  key: Key,
  eye: Eye,
  eyeOff: EyeOff,
  login: Login,
  logout: Logout,
  mail: Mail,
  send: Send,
  inbox: Inbox,
  chat: Chat,
  bell: Bell,
  phone: Phone,
  link: Link,
  share: Share,
  at: At,
  trendingUp: TrendingUp,
  trendingDown: TrendingDown,
  pieChart: PieChart,
  activity: Activity,
  report: Report,
  creditCard: CreditCard,
  dollar: Dollar,
  cart: Cart,
  receipt: Receipt,
  package: Package,
  calendar: Calendar,
  clock: Clock,
  file: File,
  files: Files,
  image: Image,
  database: Database,
  cloud: Cloud,
  server: Server,
  tag: Tag,
  bookmark: Bookmark,
  star: Star,
  flag: Flag,
  mapPin: MapPin,
  globe: Globe,
  settings: Settings,
  info: Info,
  help: Help,
  alert: Alert,
  warning: Warning,
  ban: Ban,
  sparkles: Sparkles,
  rocket: Rocket,
  zap: Zap,
  layers: Layers,
  code: Code,
  terminal: Terminal,
  support: Support,
  book: Book,
  power: Power,
  trash: Trash,
  wallet: Wallet,
  folder: Folder,
  ...LAB_SET2_BARE,
};

/**
 * Original Soft Complex shaped SoftMarks — already Bare language.
 * Bare mode reuses tiled bodies with plate/shadow off (no separate artwork).
 * Arrows are SoftStrokeMark in FROSTED_BARE_ICON_MAP (Close / Download family).
 */
export const FROSTED_SHAPED_BARE_KEYS = [
  "home",
  "user",
  "chart",
];
