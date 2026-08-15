/**
 * Lab set 2 — 40 Bare marks. Default finish is outline (`SoftStrokeMark`).
 * Object marks have a duo-tone SoftMark finish (`LAB_SET2_DUO`).
 * Pure line marks (hash, expand, paperclip, repeat, shuffle, bluetooth, cast) stay outline.
 * Tiled counterparts are plate + core stroke of the outline silhouette (lab reviews Bare).
 */
import { CoreDisc, Frame, SoftCircleMark, SoftMark, SoftRects, SoftStrokeMark } from "./softMark";

function ThemeStroke({ uid, d, width = 2.6 }) {
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

function tiledStroke(paths, width = 2.7) {
  const list = Array.isArray(paths) ? paths : [paths];
  return function Tiled(p) {
    const { uid, ...frame } = p;
    return (
      <Frame uid={uid} plate {...frame}>
        <g data-soft-layer="body" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {list.map((d, i) => (
            <path key={i} d={d} stroke={`url(#${uid}-core)`} strokeWidth={width} data-soft-layer="glyph" />
          ))}
        </g>
      </Frame>
    );
  };
}

/* ── Stroke family (skip next / mic / sun peers) ── */

function Play(p) {
  return <SoftStrokeMark {...p} width={3.3} d="M16 12.5l19 11.5L16 35.5Z" />;
}
function Pause(p) {
  return <SoftStrokeMark {...p} width={3.6} paths={["M17 13v22", "M31 13v22"]} />;
}
function Stop(p) {
  return <SoftStrokeMark {...p} width={3.3} d="M14.5 14.5h19v19h-19Z" />;
}
function SkipNext(p) {
  return <SoftStrokeMark {...p} width={3.3} paths={["M13 14l16 10-16 10V14Z", "M33 14v20"]} />;
}
function SkipPrev(p) {
  return <SoftStrokeMark {...p} width={3.3} paths={["M35 14L19 24l16 10V14Z", "M15 14v20"]} />;
}
function Volume(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.2}
      paths={["M12 20h6l8-7v22l-8-7h-6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z", "M31 18.5c2.4 2 2.4 9 0 11M35 15.5c4.2 3.4 4.2 13.6 0 17"]}
    />
  );
}
function Mic(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      d="M24 10.5a5 5 0 0 1 5 5v8a5 5 0 0 1-10 0v-8a5 5 0 0 1 5-5ZM14.5 24.5a9.5 9.5 0 0 0 19 0M24 34v4.5"
    />
  );
}
function Wifi(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={["M10.5 20.5a18 18 0 0 1 27 0", "M15 25.5a12 12 0 0 1 18 0", "M19.5 30.2a6.2 6.2 0 0 1 9 0", "M25.3 35.4a1.3 1.3 0 1 1-2.6 0a1.3 1.3 0 1 1 2.6 0"]}
    />
  );
}
function Hash(p) {
  return <SoftStrokeMark {...p} width={3.3} paths={["M16 16l-3 16M35 16l-3 16", "M11 21h26M10 29h26"]} />;
}
function Expand(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.2}
      paths={["M14 20V14h6", "M34 20V14h-6", "M14 28v6h6", "M34 28v6h-6"]}
    />
  );
}
function Paperclip(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      d="M30 21.5v10a6 6 0 0 1-12 0V16.5a4.2 4.2 0 0 1 8.4 0v13.2a2.4 2.4 0 0 1-4.8 0V18"
    />
  );
}
function Scissors(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.1}
      paths={[
        "M14.8 14.8a3.2 3.2 0 1 1-6.4 0a3.2 3.2 0 1 1 6.4 0",
        "M14.8 33.2a3.2 3.2 0 1 1-6.4 0a3.2 3.2 0 1 1 6.4 0",
        "M13.8 16.6L39.2 33",
        "M13.8 31.4L39.2 15",
        "M20.2 24a1.3 1.3 0 1 1-2.6 0a1.3 1.3 0 1 1 2.6 0",
      ]}
    />
  );
}
function Repeat(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M13 20h20",
        "M28 15.4l6.2 4.6-6.2 4.6",
        "M13 20c0-5.2 4-8.2 9-8.2",
        "M35 28H15",
        "M20 23.4l-6.2 4.6 6.2 4.6",
        "M35 28c0 5.2-4 8.2-9 8.2",
      ]}
    />
  );
}
function Shuffle(p) {
  // Two tracks that actually cross, each ending in a right-pointing head.
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M11 16h8l15 16h6",
        "M34 28l6 4-6 4",
        "M11 32h8l15-16h6",
        "M34 12l6 4-6 4",
      ]}
    />
  );
}
function ThumbsUp(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.2}
      d="M16 22V36H12v-14h4ZM16 22l3.5-9.5A3.2 3.2 0 0 1 22.6 11c1.4 0 2.4 1.2 2.2 2.6L24 22h10.5a3 3 0 0 1 3 3.4l-1.6 10A3 3 0 0 1 33 38H16"
    />
  );
}
function ThumbsDown(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.2}
      d="M16 26V12H12v14h4ZM16 26l3.5 9.5A3.2 3.2 0 0 0 22.6 37c1.4 0 2.4-1.2 2.2-2.6L24 26h10.5a3 3 0 0 0 3-3.4l-1.6-10A3 3 0 0 0 33 10H16"
    />
  );
}
function Megaphone(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.2}
      d="M12 22h6l16-8v20L18 26h-6a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2ZM18 26v6.5a3 3 0 0 0 3.2 3"
    />
  );
}
function Bluetooth(p) {
  return <SoftStrokeMark {...p} tight width={3.4} d="M24 8v32M24 8l10 8-10 8 10 8-10 8M14 16l10 8-10 8" />;
}
function Sun(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      d="M30.5 24a6.5 6.5 0 1 1-13 0a6.5 6.5 0 1 1 13 0M24 11v3.2M24 33.8V37M11 24h3.2M33.8 24H37M14.4 14.4l2.3 2.3M31.3 31.3l2.3 2.3M14.4 33.6l2.3-2.3M31.3 16.7l2.3-2.3"
    />
  );
}
function Moon(p) {
  return <SoftStrokeMark {...p} tight width={3.4} d="M30 12.5A12.5 12.5 0 1 0 36 28.8 10 10 0 1 1 30 12.5Z" />;
}

function Camera(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M12 18h6l2.2-3.2h7.6L30 18h6a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3Z",
        "M29.2 26.5a5.2 5.2 0 1 1-10.4 0a5.2 5.2 0 1 1 10.4 0",
      ]}
    />
  );
}
function Video(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M10 15h28a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3v-12a3 3 0 0 1 3-3Z",
        "M19 18.2L31 24 19 29.8Z",
      ]}
    />
  );
}
function Printer(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={["M12 22h24a3 3 0 0 1 3 3v9H9v-9a3 3 0 0 1 3-3Z", "M16 12h16v10H16Z", "M16 30h16v7H16Z"]}
    />
  );
}
function Battery(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M9.5 16.5h25a3 3 0 0 1 3 3v2h2.4a1.4 1.4 0 0 1 1.4 1.4v6.2a1.4 1.4 0 0 1-1.4 1.4H37.5v2a3 3 0 0 1-3 3h-25a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3Z",
        "M14.5 20.6v6.8",
        "M20.5 20.6v6.8",
      ]}
    />
  );
}
function Gift(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M11 22h26v16a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V22Z",
        "M11 22h26",
        "M24 22v19",
        "M24 22c-5-8.5-11-5-8.2 0",
        "M24 22c5-8.5 11-5 8.2 0",
      ]}
    />
  );
}
function Truck(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M8 18h19v13H8a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2Z",
        "M27 21h6.5L38.5 27.2V31H27V21Z",
        "M12 21.5h8",
        "M16.4 34.6a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0",
        "M35.8 34.6a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0",
      ]}
    />
  );
}
function Store(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={["M10 20h28v18H10V20Z", "M10 20l2.5-8h23L38 20", "M19 38v-10h10v10"]}
    />
  );
}
function Briefcase(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M10 18h28a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3Z",
        "M18 18v-3.5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V18",
        "M10 26h28",
      ]}
    />
  );
}
function Building(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={["M12 12h24v26H12V12Z", "M18 18h4", "M26 18h4", "M18 25h4", "M26 25h4", "M21 38v-6h6v6"]}
    />
  );
}
function Compass(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={["M37.5 24a13.5 13.5 0 1 1-27 0a13.5 13.5 0 1 1 27 0", "M24 13.2L28.6 24 24 34.8 19.4 24Z"]}
    />
  );
}
function Coffee(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M10 16h19.5a3 3 0 0 1 3 3v9.5a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V19a3 3 0 0 1 3-3Z",
        "M32.5 20.2c5 0 5 8.2 0 8.2",
        "M12 36.8h20",
        "M16.8 10c1.6 1.3 1.6 2.6 0 3.8",
        "M22.4 9.2c1.6 1.3 1.6 2.6 0 3.8",
        "M28 10c1.6 1.3 1.6 2.6 0 3.8",
      ]}
    />
  );
}
function Umbrella(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={["M8.5 24a15.5 15.5 0 0 1 31 0H8.5Z", "M24 24v12.5a3 3 0 0 0 5 2.2"]}
    />
  );
}
function Headphones(p) {
  return (
    <SoftStrokeMark
      {...p}
      width={3.3}
      d="M12 25.5v-2a12 12 0 0 1 24 0v2M12 24.5v8.5a3 3 0 0 0 3 3h2v-10H15a3 3 0 0 0-3 3ZM36 24.5v8.5a3 3 0 0 1-3 3h-2v-10h2a3 3 0 0 1 3 3Z"
    />
  );
}
function Pin(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={["M18 10h12l-2 10 4 4v3H16v-3l4-4-2-10Z", "M24 27v11"]}
    />
  );
}
function PaintBrush(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M37.2 10.8L24.4 23.6",
        "M22.8 22l4.4 4.4",
        "M23.2 22L26.8 25.6C28.6 30.2 26.6 36 21.8 39.2 18.4 41.4 13.2 40.6 12.8 37.2 12.4 34.6 16.8 29.8 20.6 25.8L23.2 22Z",
      ]}
    />
  );
}
function Heart(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.3}
      d="M24 36.5S10 26.5 10 18.5A7.2 7.2 0 0 1 24 15.8 7.2 7.2 0 0 1 38 18.5C38 26.5 24 36.5 24 36.5Z"
    />
  );
}
function Newspaper(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={["M10 14h28v22H10V14Z", "M15 19h8", "M15 24h18", "M15 29h18", "M15 33.5h12"]}
    />
  );
}
function Map(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={["M10 16l10-4 8 4 10-4v24l-10 4-8-4-10 4V16Z", "M20 12v24", "M28 16v24"]}
    />
  );
}
function Film(p) {
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.2}
      paths={[
        "M12 12h24v24H12V12Z",
        "M18 12v24",
        "M30 12v24",
        "M12 18h6",
        "M30 18h6",
        "M12 24h6",
        "M30 24h6",
        "M12 30h6",
        "M30 30h6",
      ]}
    />
  );
}
function Cast(p) {
  // One Wifi-spaced arc + dock dot in the open corner. A second nested arc welds at this weight.
  return (
    <SoftStrokeMark
      {...p}
      tight
      width={3.0}
      paths={[
        "M12.4 21.2V16.4A2.8 2.8 0 0 1 15.2 13.6H36.6A2.8 2.8 0 0 1 39.4 16.4V31.4A2.8 2.8 0 0 1 36.6 34.2H22.5",
        "M12.4 34.4a10.5 10.5 0 0 1 10.5-10.5",
        "M13.8 34.4a1.4 1.4 0 1 1-2.8 0a1.4 1.4 0 1 1 2.8 0",
      ]}
    />
  );
}

/* ── Duo-tone finish (filled frost + ThemeStroke). ── */

function PlayDuo(p) {
  const { uid, ...frame } = p;
  return <SoftMark uid={uid} {...frame} coreInset={0.68} d="M16 12.5l19 11.5L16 35.5V12.5Z" />;
}
function StopDuo(p) {
  const { uid, ...frame } = p;
  return <SoftMark uid={uid} {...frame} coreInset={0.68} d="M14.5 14.5h19v19h-19Z" />;
}
function HeartDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M24 36.5S10 26.5 10 18.5A7.2 7.2 0 0 1 24 15.8 7.2 7.2 0 0 1 38 18.5C38 26.5 24 36.5 24 36.5Z"
    />
  );
}
function CameraDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M12 18h6l2.2-3.2h7.6L30 18h6a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M29.2 26.5a5.2 5.2 0 1 1-10.4 0a5.2 5.2 0 1 1 10.4 0" />
    </SoftMark>
  );
}
function VideoDuo(p) {
  const { uid, ...frame } = p;
  const play = "M18 17L32.4 24 18 31V17Z";
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M10 15h28a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3v-12a3 3 0 0 1 3-3Z"
    >
      <path
        data-soft-layer="face"
        d={play}
        fill={`url(#${uid}-face)`}
        stroke={`url(#${uid}-rim)`}
        strokeWidth={1.05}
      />
      <path
        data-soft-layer="glyph"
        d={play}
        fill={`url(#${uid}-core)`}
        opacity={0.88}
        transform="translate(24.4 24) scale(0.64) translate(-24.4 -24)"
      />
    </SoftMark>
  );
}
function PrinterDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M12 22h24a3 3 0 0 1 3 3v9H9v-9a3 3 0 0 1 3-3Z">
      <ThemeStroke uid={uid} width={2.6} d="M16 12h16v10H16Z M16 30h16v7H16Z" />
    </SoftMark>
  );
}
function BatteryDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M9.5 16.5h25a3 3 0 0 1 3 3v2h2.4a1.4 1.4 0 0 1 1.4 1.4v6.2a1.4 1.4 0 0 1-1.4 1.4H37.5v2a3 3 0 0 1-3 3h-25a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3Z"
    >
      <ThemeStroke uid={uid} width={2.8} d="M14.5 20.6v6.8M20.5 20.6v6.8" />
    </SoftMark>
  );
}
function GiftDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M11 22h26v16a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V22Z">
      <ThemeStroke uid={uid} width={2.6} d="M11 22h26M24 22v19M24 22c-5-8.5-11-5-8.2 0M24 22c5-8.5 11-5 8.2 0" />
    </SoftMark>
  );
}
function TruckDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M8 18h19v13H8a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2ZM27 21h6.5L38.5 27.2V31H27V21Z"
    >
      <ThemeStroke
        uid={uid}
        width={2.6}
        d="M12 21.5h8M16.4 34.6a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0M35.8 34.6a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0"
      />
    </SoftMark>
  );
}
function StoreDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M10 20h28v18H10V20Z">
      <ThemeStroke uid={uid} width={2.6} d="M10 20l2.5-8h23L38 20M19 38v-10h10v10" />
    </SoftMark>
  );
}
function BriefcaseDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M10 18h28a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M18 18v-3.5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V18M10 26h28" />
    </SoftMark>
  );
}
function BuildingDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M12 12h24v26H12V12Z">
      <ThemeStroke uid={uid} width={2.6} d="M18 18h4M26 18h4M18 25h4M26 25h4M21 38v-6h6v6" />
    </SoftMark>
  );
}
function CompassDuo(p) {
  const { uid, ...frame } = p;
  const needle = "M24 13.2L28.6 24 24 34.8 19.4 24Z";
  return (
    <SoftCircleMark uid={uid} {...frame} r={13.5} coreInset={false}>
      <path
        data-soft-layer="face"
        d={needle}
        fill={`url(#${uid}-face)`}
        stroke={`url(#${uid}-rim)`}
        strokeWidth={1.05}
      />
      <path
        data-soft-layer="glyph"
        d={needle}
        fill={`url(#${uid}-core)`}
        opacity={0.88}
        transform="translate(24 24) scale(0.62) translate(-24 -24)"
      />
    </SoftCircleMark>
  );
}
function CoffeeDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={false}
      d="M10 16h19.5a3 3 0 0 1 3 3v9.5a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V19a3 3 0 0 1 3-3Z"
    >
      <ThemeStroke
        uid={uid}
        width={2.6}
        d="M32.5 20.2c5 0 5 8.2 0 8.2M12 36.8h20M16.8 10c1.6 1.3 1.6 2.6 0 3.8M22.4 9.2c1.6 1.3 1.6 2.6 0 3.8M28 10c1.6 1.3 1.6 2.6 0 3.8"
      />
    </SoftMark>
  );
}
function UmbrellaDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M8.5 24a15.5 15.5 0 0 1 31 0H8.5Z">
      <ThemeStroke uid={uid} width={2.8} d="M24 24v12.5a3 3 0 0 0 5 2.2" />
    </SoftMark>
  );
}
function PinDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M18 10h12l-2 10 4 4v3H16v-3l4-4-2-10Z">
      <ThemeStroke uid={uid} width={2.6} d="M24 27v11" />
    </SoftMark>
  );
}
function PaintBrushDuo(p) {
  const { uid, ...frame } = p;
  const tip = "M23.2 22L26.8 25.6C28.6 30.2 26.6 36 21.8 39.2 18.4 41.4 13.2 40.6 12.8 37.2 12.4 34.6 16.8 29.8 20.6 25.8L23.2 22Z";
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M36.4 8.2l2.4 2.4-13.6 13.6-2.4-2.4 13.6-13.6Z">
      <ThemeStroke uid={uid} width={2.6} d="M22.6 21.8l4.2 4.2" />
      <path
        data-soft-layer="face"
        d={tip}
        fill={`url(#${uid}-face)`}
        stroke={`url(#${uid}-rim)`}
        strokeWidth={1.05}
      />
      <path
        data-soft-layer="glyph"
        d={tip}
        fill={`url(#${uid}-core)`}
        opacity={0.86}
        transform="translate(20.2 31.2) scale(0.64) translate(-20.2 -31.2)"
      />
    </SoftMark>
  );
}
function NewspaperDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M10 14h28v22H10V14Z">
      <ThemeStroke uid={uid} width={2.6} d="M15 19h8M15 24h18M15 29h18M15 33.5h12" />
    </SoftMark>
  );
}
function MapDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M10 16l10-4 8 4 10-4v24l-10 4-8-4-10 4V16Z">
      <ThemeStroke uid={uid} width={2.6} d="M20 12v24M28 16v24" />
    </SoftMark>
  );
}
function FilmDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={false} d="M12 12h24v24H12V12Z">
      <ThemeStroke uid={uid} width={2.6} d="M18 12v24M30 12v24M12 18h6M30 18h6M12 24h6M30 24h6M12 30h6M30 30h6" />
    </SoftMark>
  );
}

function PauseDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftRects
      uid={uid}
      {...frame}
      rects={[
        { x: 14.2, y: 13, w: 5.6, h: 22, rx: 2.6, opacity: 0.9 },
        { x: 28.2, y: 13, w: 5.6, h: 22, rx: 2.6, opacity: 0.78 },
      ]}
    />
  );
}

function SkipNextDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={0.68} d="M13 14l16 10-16 10V14Z">
      <ThemeStroke uid={uid} width={2.8} d="M33 14v20" />
    </SoftMark>
  );
}

function SkipPrevDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark uid={uid} {...frame} coreInset={0.68} d="M35 14L19 24l16 10V14Z">
      <ThemeStroke uid={uid} width={2.8} d="M15 14v20" />
    </SoftMark>
  );
}

function VolumeDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M12 20h6l8-7v22l-8-7h-6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M31 18.5c2.4 2 2.4 9 0 11M35 15.5c4.2 3.4 4.2 13.6 0 17" />
    </SoftMark>
  );
}

function MicDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M19 10.5h10a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H19a5 5 0 0 1-5-5v-8a5 5 0 0 1 5-5Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M14.5 24.5a9.5 9.5 0 0 0 19 0M24 34v4.5" />
    </SoftMark>
  );
}

function WifiDuo(p) {
  const { uid, ...frame } = p;
  // Arcs stay ThemeStroke. Hub is a filled disc — not a SoftCircleMark body under the linework.
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <ThemeStroke
          uid={uid}
          width={2.6}
          d="M10.5 20.5a18 18 0 0 1 27 0M15 25.5a12 12 0 0 1 18 0M19.5 30.2a6.2 6.2 0 0 1 9 0"
        />
        <circle
          data-soft-layer="extrude"
          cx={25.1}
          cy={36.7}
          r={2.4}
          fill={`url(#${uid}-body)`}
          opacity={0.45}
        />
        <circle
          data-soft-layer="face"
          cx={24}
          cy={35.4}
          r={2.4}
          fill={`url(#${uid}-face)`}
          stroke={`url(#${uid}-rim)`}
          strokeWidth={1.1}
        />
        <CoreDisc uid={uid} cx={24} cy={35.4} r={2.4} />
      </g>
    </Frame>
  );
}

function ScissorsDuo(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        {[
          { cx: 11.6, cy: 14.8 },
          { cx: 11.6, cy: 33.2 },
        ].map(({ cx, cy }) => (
          <g key={`${cx}-${cy}`}>
            <circle
              data-soft-layer="extrude"
              cx={cx + 1.1}
              cy={cy + 1.3}
              r={3.2}
              fill={`url(#${uid}-body)`}
              opacity={0.45}
            />
            <circle
              data-soft-layer="face"
              cx={cx}
              cy={cy}
              r={3.2}
              fill={`url(#${uid}-face)`}
              stroke={`url(#${uid}-rim)`}
              strokeWidth={1.1}
            />
            <CoreDisc uid={uid} cx={cx} cy={cy} r={3.2} />
          </g>
        ))}
        <ThemeStroke
          uid={uid}
          width={2.6}
          d="M13.8 16.6L39.2 33M13.8 31.4L39.2 15M20.2 24a1.3 1.3 0 1 1-2.6 0a1.3 1.3 0 1 1 2.6 0"
        />
      </g>
    </Frame>
  );
}

function ThumbsUpDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M16 22V36H12v-14h4ZM16 22l3.5-9.5A3.2 3.2 0 0 1 22.6 11c1.4 0 2.4 1.2 2.2 2.6L24 22h10.5a3 3 0 0 1 3 3.4l-1.6 10A3 3 0 0 1 33 38H16"
    />
  );
}

function ThumbsDownDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M16 26V12H12v14h4ZM16 26l3.5 9.5A3.2 3.2 0 0 0 22.6 37c1.4 0 2.4-1.2 2.2-2.6L24 26h10.5a3 3 0 0 0 3-3.4l-1.6-10A3 3 0 0 0 33 10H16"
    />
  );
}

function MegaphoneDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M12 22h6l16-8v20L18 26h-6a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2Z"
    >
      <ThemeStroke uid={uid} width={2.6} d="M18 26v6.5a3 3 0 0 0 3.2 3" />
    </SoftMark>
  );
}

function SunDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftCircleMark uid={uid} {...frame} r={6.5} coreInset={0.68}>
      <ThemeStroke
        uid={uid}
        width={2.6}
        d="M24 11v3.2M24 33.8V37M11 24h3.2M33.8 24H37M14.4 14.4l2.3 2.3M31.3 31.3l2.3 2.3M14.4 33.6l2.3-2.3M31.3 16.7l2.3-2.3"
      />
    </SoftCircleMark>
  );
}

function MoonDuo(p) {
  const { uid, ...frame } = p;
  return (
    <SoftMark
      uid={uid}
      {...frame}
      coreInset={0.68}
      d="M30 12.5A12.5 12.5 0 1 0 36 28.8 10 10 0 1 1 30 12.5Z"
    />
  );
}

function HeadphonesDuo(p) {
  const { uid, ...frame } = p;
  return (
    <Frame uid={uid} plate={false} {...frame}>
      <g data-soft-layer="body">
        <ThemeStroke uid={uid} width={2.8} d="M12 25.5v-2a12 12 0 0 1 24 0v2" />
        {[
          { x: 12, y: 24.5 },
          { x: 31, y: 24.5 },
        ].map(({ x, y }) => (
          <g key={x}>
            <rect
              data-soft-layer="extrude"
              x={x + 1.1}
              y={y + 1.3}
              width={5}
              height={11.5}
              rx={2.5}
              fill={`url(#${uid}-body)`}
              opacity={0.45}
            />
            <rect
              data-soft-layer="face"
              x={x}
              y={y}
              width={5}
              height={11.5}
              rx={2.5}
              fill={`url(#${uid}-face)`}
              stroke={`url(#${uid}-rim)`}
              strokeWidth={1.1}
            />
            <rect
              x={x + 1.05}
              y={y + 1.8}
              width={2.9}
              height={7.6}
              rx={1.3}
              fill={`url(#${uid}-core)`}
              opacity={0.88}
              data-soft-layer="glyph"
            />
          </g>
        ))}
      </g>
    </Frame>
  );
}

export const LAB_SET2_DUO = {
  play: PlayDuo,
  pause: PauseDuo,
  stop: StopDuo,
  skipNext: SkipNextDuo,
  skipPrev: SkipPrevDuo,
  volume: VolumeDuo,
  mic: MicDuo,
  wifi: WifiDuo,
  scissors: ScissorsDuo,
  thumbsUp: ThumbsUpDuo,
  thumbsDown: ThumbsDownDuo,
  megaphone: MegaphoneDuo,
  sun: SunDuo,
  moon: MoonDuo,
  heart: HeartDuo,
  camera: CameraDuo,
  video: VideoDuo,
  printer: PrinterDuo,
  battery: BatteryDuo,
  gift: GiftDuo,
  truck: TruckDuo,
  store: StoreDuo,
  briefcase: BriefcaseDuo,
  building: BuildingDuo,
  compass: CompassDuo,
  coffee: CoffeeDuo,
  umbrella: UmbrellaDuo,
  headphones: HeadphonesDuo,
  pin: PinDuo,
  paintBrush: PaintBrushDuo,
  newspaper: NewspaperDuo,
  map: MapDuo,
  film: FilmDuo,
};

export const LAB_SET2_DUO_KEYS = Object.keys(LAB_SET2_DUO);

export const LAB_SET2_KEYS = [
  "play",
  "pause",
  "stop",
  "skipNext",
  "skipPrev",
  "volume",
  "mic",
  "wifi",
  "hash",
  "expand",
  "paperclip",
  "scissors",
  "repeat",
  "shuffle",
  "thumbsUp",
  "thumbsDown",
  "megaphone",
  "bluetooth",
  "sun",
  "moon",
  "camera",
  "video",
  "printer",
  "battery",
  "gift",
  "truck",
  "store",
  "briefcase",
  "building",
  "compass",
  "coffee",
  "umbrella",
  "headphones",
  "pin",
  "paintBrush",
  "heart",
  "newspaper",
  "map",
  "film",
  "cast",
];

export const LAB_SET2_LABELS = {
  play: "Play",
  pause: "Pause",
  stop: "Stop",
  skipNext: "Skip next",
  skipPrev: "Skip previous",
  volume: "Volume",
  mic: "Mic",
  wifi: "Wifi",
  hash: "Hash",
  expand: "Expand",
  paperclip: "Paperclip",
  scissors: "Scissors",
  repeat: "Repeat",
  shuffle: "Shuffle",
  thumbsUp: "Thumbs up",
  thumbsDown: "Thumbs down",
  megaphone: "Megaphone",
  bluetooth: "Bluetooth",
  sun: "Sun",
  moon: "Moon",
  camera: "Camera",
  video: "Video",
  printer: "Printer",
  battery: "Battery",
  gift: "Gift",
  truck: "Truck",
  store: "Store",
  briefcase: "Briefcase",
  building: "Building",
  compass: "Compass",
  coffee: "Coffee",
  umbrella: "Umbrella",
  headphones: "Headphones",
  pin: "Pin",
  paintBrush: "Paint brush",
  heart: "Heart",
  newspaper: "Newspaper",
  map: "Map",
  film: "Film",
  cast: "Cast",
};

export const LAB_SET2_BARE = {
  play: Play,
  pause: Pause,
  stop: Stop,
  skipNext: SkipNext,
  skipPrev: SkipPrev,
  volume: Volume,
  mic: Mic,
  wifi: Wifi,
  hash: Hash,
  expand: Expand,
  paperclip: Paperclip,
  scissors: Scissors,
  repeat: Repeat,
  shuffle: Shuffle,
  thumbsUp: ThumbsUp,
  thumbsDown: ThumbsDown,
  megaphone: Megaphone,
  bluetooth: Bluetooth,
  sun: Sun,
  moon: Moon,
  camera: Camera,
  video: Video,
  printer: Printer,
  battery: Battery,
  gift: Gift,
  truck: Truck,
  store: Store,
  briefcase: Briefcase,
  building: Building,
  compass: Compass,
  coffee: Coffee,
  umbrella: Umbrella,
  headphones: Headphones,
  pin: Pin,
  paintBrush: PaintBrush,
  heart: Heart,
  newspaper: Newspaper,
  map: Map,
  film: Film,
  cast: Cast,
};

export const LAB_SET2_TILED = {
  play: tiledStroke("M16 12.5l19 11.5L16 35.5Z"),
  pause: tiledStroke(["M17 13v22", "M31 13v22"], 3),
  stop: tiledStroke("M14.5 14.5h19v19h-19Z"),
  skipNext: tiledStroke(["M13 14l16 10-16 10V14Z", "M33 14v20"]),
  skipPrev: tiledStroke(["M35 14L19 24l16 10V14Z", "M15 14v20"]),
  volume: tiledStroke(["M12 20h6l8-7v22l-8-7h-6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z", "M31 18.5c2.4 2 2.4 9 0 11"]),
  mic: tiledStroke("M24 10.5a5 5 0 0 1 5 5v8a5 5 0 0 1-10 0v-8a5 5 0 0 1 5-5ZM14.5 24.5a9.5 9.5 0 0 0 19 0M24 34v4.5"),
  wifi: tiledStroke(["M10.5 20.5a18 18 0 0 1 27 0", "M15 25.5a12 12 0 0 1 18 0", "M19.5 30.2a6.2 6.2 0 0 1 9 0"]),
  hash: tiledStroke(["M16 16l-3 16M35 16l-3 16", "M11 21h26M10 29h26"]),
  expand: tiledStroke(["M14 20V14h6", "M34 20V14h-6", "M14 28v6h6", "M34 28v6h-6"]),
  paperclip: tiledStroke("M30 21.5v10a6 6 0 0 1-12 0V16.5a4.2 4.2 0 0 1 8.4 0v13.2a2.4 2.4 0 0 1-4.8 0V18"),
  scissors: tiledStroke(["M15.6 14.6a3.5 3.5 0 1 1-7 0a3.5 3.5 0 1 1 7 0", "M15.6 33.4a3.5 3.5 0 1 1-7 0a3.5 3.5 0 1 1 7 0", "M14.4 16.8L38 32.2", "M14.4 31.2L38 15.8"]),
  repeat: tiledStroke(["M13 20h20", "M28 15.4l6.2 4.6-6.2 4.6", "M35 28H15", "M20 23.4l-6.2 4.6 6.2 4.6"]),
  shuffle: tiledStroke(["M11 16h8l15 16h6", "M34 28l6 4-6 4", "M11 32h8l15-16h6", "M34 12l6 4-6 4"]),
  thumbsUp: tiledStroke("M16 22V36H12v-14h4ZM16 22l3.5-9.5A3.2 3.2 0 0 1 22.6 11c1.4 0 2.4 1.2 2.2 2.6L24 22h10.5a3 3 0 0 1 3 3.4l-1.6 10A3 3 0 0 1 33 38H16"),
  thumbsDown: tiledStroke("M16 26V12H12v14h4ZM16 26l3.5 9.5A3.2 3.2 0 0 0 22.6 37c1.4 0 2.4-1.2 2.2-2.6L24 26h10.5a3 3 0 0 0 3-3.4l-1.6-10A3 3 0 0 0 33 10H16"),
  megaphone: tiledStroke("M12 22h6l16-8v20L18 26h-6a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2Z"),
  bluetooth: tiledStroke("M24 8v32M24 8l10 8-10 8 10 8-10 8M14 16l10 8-10 8"),
  sun: tiledStroke("M30.5 24a6.5 6.5 0 1 1-13 0a6.5 6.5 0 1 1 13 0M24 11v3.2M24 33.8V37"),
  moon: tiledStroke("M30 12.5A12.5 12.5 0 1 0 36 28.8 10 10 0 1 1 30 12.5Z"),
  camera: tiledStroke([
    "M12 18h6l2.2-3.2h7.6L30 18h6a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3Z",
    "M29.2 26.5a5.2 5.2 0 1 1-10.4 0a5.2 5.2 0 1 1 10.4 0",
  ]),
  video: tiledStroke([
    "M10 15h28a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3v-12a3 3 0 0 1 3-3Z",
    "M19 18.2L31 24 19 29.8Z",
  ]),
  printer: tiledStroke(["M12 22h24a3 3 0 0 1 3 3v9H9v-9a3 3 0 0 1 3-3Z", "M16 12h16v10H16Z", "M16 30h16v7H16Z"]),
  battery: tiledStroke([
    "M9.5 16.5h25a3 3 0 0 1 3 3v2h2.4a1.4 1.4 0 0 1 1.4 1.4v6.2a1.4 1.4 0 0 1-1.4 1.4H37.5v2a3 3 0 0 1-3 3h-25a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3Z",
    "M14.5 20.6v6.8",
    "M20.5 20.6v6.8",
  ]),
  gift: tiledStroke([
    "M11 22h26v16a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V22Z",
    "M24 22v19",
    "M24 22c-5-8.5-11-5-8.2 0",
    "M24 22c5-8.5 11-5 8.2 0",
  ]),
  truck: tiledStroke([
    "M8 18h19v13H8a2 2 0 0 1-2-2V20a2 2 0 0 1 2-2Z",
    "M27 21h6.5L38.5 27.2V31H27V21Z",
    "M16.4 34.6a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0",
    "M35.8 34.6a2.4 2.4 0 1 1-4.8 0a2.4 2.4 0 1 1 4.8 0",
  ]),
  store: tiledStroke(["M10 20h28v18H10V20Z", "M10 20l2.5-8h23L38 20", "M19 38v-10h10v10"]),
  briefcase: tiledStroke([
    "M10 18h28a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V21a3 3 0 0 1 3-3Z",
    "M18 18v-3.5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V18",
    "M10 26h28",
  ]),
  building: tiledStroke(["M12 12h24v26H12V12Z", "M18 18h4", "M26 18h4", "M21 38v-6h6v6"]),
  compass: tiledStroke(["M37.5 24a13.5 13.5 0 1 1-27 0a13.5 13.5 0 1 1 27 0", "M24 13.2L28.6 24 24 34.8 19.4 24Z"]),
  coffee: tiledStroke([
    "M10 16h19.5a3 3 0 0 1 3 3v9.5a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V19a3 3 0 0 1 3-3Z",
    "M32.5 20.2c5 0 5 8.2 0 8.2",
    "M12 36.8h20",
  ]),
  umbrella: tiledStroke(["M8.5 24a15.5 15.5 0 0 1 31 0H8.5Z", "M24 24v12.5a3 3 0 0 0 5 2.2"]),
  headphones: tiledStroke("M12 25.5v-2a12 12 0 0 1 24 0v2M12 24.5v8.5a3 3 0 0 0 3 3h2v-10H15a3 3 0 0 0-3 3Z"),
  pin: tiledStroke(["M18 10h12l-2 10 4 4v3H16v-3l4-4-2-10Z", "M24 27v11"]),
  paintBrush: tiledStroke([
    "M37.2 10.8L24.4 23.6",
    "M22.8 22l4.4 4.4",
    "M23.2 22L26.8 25.6C28.6 30.2 26.6 36 21.8 39.2 18.4 41.4 13.2 40.6 12.8 37.2 12.4 34.6 16.8 29.8 20.6 25.8L23.2 22Z",
  ]),
  heart: tiledStroke("M24 36.5S10 26.5 10 18.5A7.2 7.2 0 0 1 24 15.8 7.2 7.2 0 0 1 38 18.5C38 26.5 24 36.5 24 36.5Z"),
  newspaper: tiledStroke(["M10 14h28v22H10V14Z", "M15 19h8", "M15 24h18", "M15 29h18"]),
  map: tiledStroke(["M10 16l10-4 8 4 10-4v24l-10 4-8-4-10 4V16Z", "M20 12v24", "M28 16v24"]),
  film: tiledStroke(["M12 12h24v24H12V12Z", "M18 12v24", "M30 12v24", "M12 18h6", "M30 18h6"]),
  cast: tiledStroke([
    "M12.4 21.2V16.4A2.8 2.8 0 0 1 15.2 13.6H36.6A2.8 2.8 0 0 1 39.4 16.4V31.4A2.8 2.8 0 0 1 36.6 34.2H22.5",
    "M12.4 34.4a10.5 10.5 0 0 1 10.5-10.5",
    "M13.8 34.4a1.4 1.4 0 1 1-2.8 0a1.4 1.4 0 1 1 2.8 0",
  ]),
};

/** Optical fit vs Download span (~20–26). Applied via BARE_OPTICAL. */
export const LAB_SET2_OPTICAL = {
  play: 0.9,
  stop: 0.9,
  heart: 0.88,
  truck: 0.86,
  store: 0.86,
  building: 0.86,
  film: 0.86,
  newspaper: 0.86,
  map: 0.88,
  umbrella: 0.88,
  gift: 0.88,
  briefcase: 0.88,
  sun: 0.9,
  camera: 0.9,
  printer: 0.9,
  video: 0.9,
  coffee: 0.9,
  pin: 0.9,
  paintBrush: 0.9,
  megaphone: 0.9,
  thumbsUp: 0.9,
  thumbsDown: 0.9,
};
