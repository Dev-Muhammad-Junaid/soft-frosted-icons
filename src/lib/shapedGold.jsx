/**
 * Gold shape refs — frost face + shaped core. Used as the duo-tone body
 * for Home / User / Chart (outline peers live in frostedCatalogOutline).
 */
import { Frame, Spec } from "./softMark";

const CX_FROST = "var(--soft-cx-frost)";

export function Home(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d="M11 23.5L24 12l13 11.5V36a3.5 3.5 0 0 1-3.5 3.5h-19A3.5 3.5 0 0 1 11 36V23.5Z"
          fill={`url(#${uid}-body)`}
          opacity={0.48}
          transform="translate(1.2 1.5)"
        />
        <path
          data-soft-layer="face"
          d="M10 22.5L24 10.5 38 22.5V35.5A3.5 3.5 0 0 1 34.5 39h-21A3.5 3.5 0 0 1 10 35.5V22.5Z"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <rect x={20} y={26} width={8} height={10} rx={2} fill={`url(#${uid}-core)`} opacity={0.85} data-soft-layer="glyph" />
        <Spec uid={uid} d="M14 22L24 13.5 34 22" opacity={0.5} />
      </g>
    </Frame>
  );
}

export function User(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <circle data-soft-layer="extrude" cx={25.4} cy={18.2} r={7.2} fill={`url(#${uid}-body)`} opacity={0.45} />
        <circle
          data-soft-layer="face"
          cx={24}
          cy={16.5}
          r={7.2}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <path
          data-soft-layer="face"
          d="M11.5 36.8c1.9-6.4 5.7-9.6 12.5-9.6s10.6 3.2 12.5 9.6"
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.15}
        />
        <circle cx={24} cy={16.5} r={3.6} fill={`url(#${uid}-core)`} opacity={0.8} data-soft-layer="glyph" />
        <ellipse cx={21.2} cy={13.8} rx={3.4} ry={1.6} fill={CX_FROST} opacity={0.4} data-soft-layer="specular" />
      </g>
    </Frame>
  );
}

export function Chart(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {[
          { x: 10.5, h: 18, y: 20 },
          { x: 20, h: 26, y: 12 },
          { x: 29.5, h: 21, y: 17 },
        ].map((b, i) => (
          <g key={i}>
            <rect
              data-soft-layer="extrude"
              x={b.x + 1.4}
              y={b.y + 2.2}
              width={7.2}
              height={b.h}
              rx={2.8}
              fill={`url(#${uid}-body)`}
              opacity={0.48}
            />
            <rect
              data-soft-layer="face"
              x={b.x}
              y={b.y}
              width={7.2}
              height={b.h}
              rx={2.8}
              fill={`url(#${uid}-face)`}
              stroke={`url(#${uid}-rim)`}
              strokeWidth={1}
            />
            <rect
              data-soft-layer="glyph"
              x={b.x + 1.35}
              y={b.y + b.h * 0.38}
              width={4.5}
              height={b.h * 0.52}
              rx={1.6}
              fill={`url(#${uid}-core)`}
              opacity={0.82}
            />
          </g>
        ))}
      </g>
    </Frame>
  );
}

export const SHAPED_GOLD = {
  home: Home,
  user: User,
  chart: Chart,
};
