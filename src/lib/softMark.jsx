/**
 * SoftMark primitives — Bare frosted mark language
 * (Arrow / User / Bell / Chart / Search shaped glass).
 *
 * Tiled Soft Complex plates live in frostedIcons.jsx (TileMark + GlassTile).
 * Bare catalog compositions live in frostedBareIcons.jsx.
 */

import {
  GlassDefs,
  SoftGroundShadow,
  SoftSvg,
} from "./primitives";

/**
 * Soft SVG frame. `plate` toggles SoftGroundShadow only.
 * Bare SoftMarks pass plate={false}.
 */
export function Frame({ uid, plate = true, size, className, title, style, children, optical = 1, ...props }) {
  const tiled = plate !== false;
  const body =
    optical === 1 ? (
      children
    ) : (
      <g transform={`translate(24 24) scale(${optical}) translate(-24 -24)`}>{children}</g>
    );
  return (
    <SoftSvg
      size={size}
      className={className}
      title={title}
      style={style}
      data-soft-material="glass"
      data-soft-plate={tiled ? "tiled" : "bare"}
      {...props}
    >
      <GlassDefs uid={uid} />
      {tiled ? <SoftGroundShadow uid={uid} /> : null}
      {body}
    </SoftSvg>
  );
}

export function Spec({ uid, d = "M13 14.5h16", opacity = 0.55 }) {
  return (
    <path
      data-soft-layer="specular"
      d={d}
      stroke={`url(#${uid}-spec)`}
      strokeWidth={1.7}
      strokeLinecap="round"
      opacity={opacity}
    />
  );
}

/** Chart-style core inset of a silhouette (frost face, bright core on top). */
export function CoreInset({ uid, d, scale = 0.64, opacity = 0.78, cx = 24, cy = 24 }) {
  return (
    <path
      data-soft-layer="glyph"
      d={d}
      fill={`url(#${uid}-core)`}
      opacity={opacity}
      transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}
    />
  );
}

export function CoreDisc({ uid, cx, cy, r, scale = 0.62, opacity = 0.78 }) {
  return (
    <circle
      data-soft-layer="glyph"
      cx={cx}
      cy={cy}
      r={r * scale}
      fill={`url(#${uid}-core)`}
      opacity={opacity}
    />
  );
}

/** SoftMark — shaped frosted glass silhouette. */
export function SoftMark({
  uid,
  d,
  children,
  spec,
  dx = 1.2,
  dy = 1.5,
  extrudeOpacity = 0.48,
  strokeWidth = 1.15,
  optical = 1,
  coreInset = 0.64,
  coreOpacity = 0.85,
  ...frame
}) {
  return (
    <Frame uid={uid} plate={false} optical={optical} {...frame}>
      <g data-soft-layer="body">
        <path
          data-soft-layer="extrude"
          d={d}
          fill={`url(#${uid}-body)`}
          opacity={extrudeOpacity}
          transform={`translate(${dx} ${dy})`}
        />
        <path
          data-soft-layer="face"
          d={d}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={strokeWidth / optical}
        />
        {coreInset ? (
          <path
            data-soft-layer="glyph"
            d={d}
            fill={`url(#${uid}-core)`}
            opacity={coreOpacity}
            transform={`translate(24 24) scale(${coreInset}) translate(-24 -24)`}
          />
        ) : null}
        {children}
        {spec ? <Spec uid={uid} d={spec} /> : null}
      </g>
    </Frame>
  );
}

/** SoftStrokeMark — glass-weighted stroke marks (Arrow-adjacent Bare language). */
export function SoftStrokeMark({ uid, d, width = 4.2, children, paths, tight = false, optical = 1, ...frame }) {
  const list = paths ?? (Array.isArray(d) ? d : [d]);
  const k = 1 / (optical || 1);
  // Nested marks (@, $) need a slimmer glass halo so loops do not weld shut.
  const extrudePad = tight ? 1.55 : 3.2;
  const facePad = tight ? 0.55 : 1.1;
  const dx = tight ? 0.8 : 1.15;
  const dy = tight ? 0.95 : 1.35;
  return (
    <Frame uid={uid} plate={false} optical={optical} {...frame}>
      <g data-soft-layer="body" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {list.map((path, i) => (
          <g key={i}>
            <path
              data-soft-layer="extrude"
              d={path}
              stroke={`url(#${uid}-s-body)`}
              strokeWidth={(width + extrudePad) * k}
              opacity={0.48}
              transform={`translate(${dx} ${dy})`}
            />
            <path
              data-soft-layer="face"
              d={path}
              stroke={`url(#${uid}-s-face)`}
              strokeWidth={(width + facePad) * k}
              opacity={0.95}
            />
            <path
              data-soft-layer="glyph"
              d={path}
              stroke={`url(#${uid}-s-core)`}
              strokeWidth={width * 0.62 * k}
              opacity={0.95}
            />
            <path
              data-soft-layer="specular"
              d={path}
              stroke={`url(#${uid}-s-rim)`}
              strokeWidth={Math.max(1.4, width * 0.34) * k}
              opacity={0.65}
            />
          </g>
        ))}
        {children}
      </g>
    </Frame>
  );
}

/** SoftRects — multi-panel SoftMark composition (Dashboard / Chart bars). */
export function SoftRects({ uid, rects, children, optical = 1, ...frame }) {
  return (
    <Frame uid={uid} plate={false} optical={optical} {...frame}>
      <g data-soft-layer="body">
        {rects.map((r, i) => {
          const rx = r.rx ?? 3;
          const inset = r.inset ?? (r.w < 12 ? 1.15 : 1.5);
          const thin = r.h < 8;
          return (
            <g key={i}>
              <rect
                data-soft-layer="extrude"
                x={r.x + 1.1}
                y={r.y + 1.4}
                width={r.w}
                height={r.h}
                rx={rx}
                fill={`url(#${uid}-body)`}
                opacity={0.45}
              />
              <rect
                data-soft-layer="face"
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={rx}
                fill={`url(#${uid}-face)`}
                stroke={`url(#${uid}-rim)`}
                strokeWidth={1 / optical}
              />
              {r.core === false ? null : (
                <rect
                  data-soft-layer="glyph"
                  x={r.x + inset}
                  y={r.y + r.h * (r.coreY ?? (thin ? 0.16 : 0.28))}
                  width={Math.max(2, r.w - inset * 2)}
                  height={Math.max(2, r.h * (r.coreH ?? (thin ? 0.68 : 0.56)))}
                  rx={Math.min(1.5, Math.max(0.8, rx - 1.2))}
                  fill={`url(#${uid}-core)`}
                  opacity={r.opacity ?? 0.85}
                />
              )}
            </g>
          );
        })}
        {children}
      </g>
    </Frame>
  );
}

/** SoftCircleMark — round SoftMark body. */
export function SoftCircleMark({
  uid,
  cx = 24,
  cy = 24,
  r = 12,
  children,
  spec,
  optical = 1,
  coreInset = 0.58,
  coreOpacity = 0.78,
  ...frame
}) {
  return (
    <Frame uid={uid} plate={false} optical={optical} {...frame}>
      <g data-soft-layer="body">
        <circle
          data-soft-layer="extrude"
          cx={cx + 1.2}
          cy={cy + 1.5}
          r={r}
          fill={`url(#${uid}-body)`}
          opacity={0.48}
        />
        <circle
          data-soft-layer="face"
          cx={cx}
          cy={cy}
          r={r}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.2 / optical}
        />
        {coreInset ? (
          <circle
            data-soft-layer="glyph"
            cx={cx}
            cy={cy}
            r={r * coreInset}
            fill={`url(#${uid}-core)`}
            opacity={coreOpacity}
          />
        ) : null}
        {children}
        {spec ? <Spec uid={uid} d={spec} /> : null}
      </g>
    </Frame>
  );
}
