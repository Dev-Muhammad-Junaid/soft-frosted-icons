/**
 * Existing-catalog Bare outline finish — SoftStrokeMark peers of the filled SoftMark bodies.
 * Line marks (Close, Plus, arrows, Info, …) stay in FROSTED_BARE_ICON_MAP; they have no sibling.
 * Gold shape silhouettes (User, Chart, Home, Bell, List, Menu) are traced, not restyled.
 */
import { SoftStrokeMark } from "./softMark";

function rr(x, y, w, h, r = 3) {
  const cr = Math.min(r, w / 2, h / 2);
  return `M${x + cr} ${y}h${w - 2 * cr}a${cr} ${cr} 0 0 1 ${cr} ${cr}v${h - 2 * cr}a${cr} ${cr} 0 0 1 ${-cr} ${cr}h${-(w - 2 * cr)}a${cr} ${cr} 0 0 1 ${-cr} ${-cr}v${-(h - 2 * cr)}a${cr} ${cr} 0 0 1 ${cr} ${-cr}Z`;
}

function circ(cx, cy, r) {
  return `M${cx + r} ${cy}a${r} ${r} 0 1 1 ${-2 * r} 0a${r} ${r} 0 1 1 ${2 * r} 0`;
}

function Outline({ paths, width = 3.2, tight = true, ...p }) {
  return <SoftStrokeMark {...p} tight={tight} width={width} paths={paths} />;
}

/* ── Navigation ── */

function Home(p) {
  // Gold house + door. Door is a U so the threshold does not weld to the floor.
  return (
    <Outline
      {...p}
      paths={[
        "M10 22.5L24 10.5 38 22.5V35.5A3.5 3.5 0 0 1 34.5 39h-21A3.5 3.5 0 0 1 10 35.5V22.5Z",
        "M20 36V26h8v10",
      ]}
    />
  );
}

function Dashboard(p) {
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[
        rr(9.5, 9.5, 13, 13, 3.5),
        rr(25.5, 9.5, 13, 8, 3),
        rr(25.5, 20.5, 13, 18, 3.5),
        rr(9.5, 25.5, 13, 13, 3.5),
      ]}
    />
  );
}

function Grid(p) {
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[rr(10, 10, 12, 12, 3.5), rr(24, 10, 12, 12, 3.5), rr(10, 24, 12, 12, 3.5), rr(24, 24, 12, 12, 3.5)]}
    />
  );
}

function Layout(p) {
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[rr(9.5, 9.5, 11, 29, 3.5), rr(23.5, 9.5, 15, 13, 3.5), rr(23.5, 25.5, 15, 13, 3.5)]}
    />
  );
}

function Sidebar(p) {
  // Rail as a panel; rows as bars so 5.2-tall cells do not weld shut.
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[rr(10, 10, 10, 28, 3.2), "M23 14.1h15", "M23 24h15", "M23 33.9h15"]}
    />
  );
}

function Panels(p) {
  return <Outline {...p} width={2.8} paths={[rr(9.5, 10, 13.5, 28, 3.5), rr(25.5, 10, 13.5, 28, 3.5)]} />;
}

function Table(p) {
  // Header + body + column/row rules. Closed 5.2 cells weld at this weight.
  return (
    <Outline
      {...p}
      width={2.6}
      paths={[
        rr(11, 11, 26, 7, 3),
        rr(11, 20.5, 26, 18.4, 3),
        "M24 20.5v18.4",
        "M11 26.6h26",
        "M11 32.8h26",
      ]}
    />
  );
}

function List(p) {
  // Gold: three discs + three bars. Bars are strokes so they stay open.
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[
        circ(13, 12, 2.6),
        "M18 12h18",
        circ(13, 21, 2.6),
        "M18 21h18",
        circ(13, 30, 2.6),
        "M18 30h18",
      ]}
    />
  );
}

function Columns(p) {
  return (
    <Outline {...p} width={2.8} paths={[rr(10, 10, 9, 28, 3), rr(21, 10, 9, 28, 3), rr(32, 10, 9, 28, 3)]} />
  );
}

function Menu(p) {
  // Gold hamburger. Closed 5.2-tall rects weld at this weight — three Plus-peer bars.
  return <Outline {...p} width={3.4} tight={false} paths={["M11 15.6h26", "M11 23.6h26", "M11 31.6h26"]} />;
}

function Search(p) {
  // Info ring + Download-weight handle. Not a filled disc with a cut hole.
  return <Outline {...p} paths={[circ(21.6, 21.2, 11.4), "M29.6 29.2L37.4 37"]} />;
}

/* ── Actions ── */

function Filter(p) {
  return <Outline {...p} tight={false} width={3.3} paths={["M12 14.5h24l-8 10v8.5l-8-4v-4.5L12 14.5Z"]} />;
}

function More(p) {
  return <Outline {...p} width={2.8} paths={[circ(16, 24, 3.4), circ(24, 24, 3.4), circ(32, 24, 3.4)]} />;
}

function Edit(p) {
  return (
    <Outline
      {...p}
      paths={["M14.5 33.5h6.2L36 18.2l-6.2-6.2L14.5 27.3v6.2Z", "M28.5 13.5l6 6"]}
    />
  );
}

function Copy(p) {
  return <Outline {...p} width={2.8} paths={[rr(17, 11, 16, 18, 3.5), rr(11.5, 16, 16, 18, 3.5)]} />;
}

function Save(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M12 11h18l6 6v18a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3Z",
        "M18 15h9",
        "M20 31.5h8",
      ]}
    />
  );
}

function Trash(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M13 17h22v19.5A4 4 0 0 1 31 40.5H17A4 4 0 0 1 13 36.5V17Z",
        "M11 14h26",
        "M18 14V11.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2V14",
        "M20 22v8",
        "M24 22v8",
        "M28 22v8",
      ]}
    />
  );
}

/* ── People ── */

function User(p) {
  // Gold: head disc + shoulder arc. Do not fill into a blob.
  return <Outline {...p} paths={[circ(24, 16.5, 7.2), "M11.5 36.8c1.9-6.4 5.7-9.6 12.5-9.6s10.6 3.2 12.5 9.6"]} />;
}

function Users(p) {
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[
        circ(30, 17, 5.2),
        "M22.5 36.2c1.2-4.2 3.6-6.4 8-6.4 4.2 0 6.8 2 8 5.6",
        circ(18, 16.2, 6.2),
        "M7.5 36.8c1.7-5.8 5-8.8 11-8.8s9.2 3 11 8.8",
      ]}
    />
  );
}

function UserPlus(p) {
  return (
    <Outline
      {...p}
      paths={[
        circ(18, 16, 5.8),
        "M8.5 36.5c1.8-6.5 5.4-9.8 11.5-9.8s9.7 3.3 11.5 9.8",
        "M33 15v10",
        "M28 20h10",
      ]}
    />
  );
}

function Lock(p) {
  // Body + closed shackle + keyhole loop (stroke, not cut).
  return (
    <Outline
      {...p}
      paths={[
        "M16 22h16a3.5 3.5 0 0 1 3.5 3.5v10A3.5 3.5 0 0 1 32 39H16a3.5 3.5 0 0 1-3.5-3.5v-10A3.5 3.5 0 0 1 16 22Z",
        "M19 26.5V14a5 5 0 0 1 10 0V26.5",
        circ(24, 30.5, 2),
      ]}
    />
  );
}

function Unlock(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M16 22h16a3.5 3.5 0 0 1 3.5 3.5v10A3.5 3.5 0 0 1 32 39H16a3.5 3.5 0 0 1-3.5-3.5v-10A3.5 3.5 0 0 1 16 22Z",
        "M19 26.5V14a5 5 0 0 1 10 0",
        circ(24, 30.5, 2),
      ]}
    />
  );
}

function Shield(p) {
  return (
    <Outline
      {...p}
      paths={["M24 9.5l12 4.5v9.5c0 7.2-5 11.8-12 14-7-2.2-12-6.8-12-14V14L24 9.5Z", "M19 24.5l3.2 3.2L29.5 20"]}
    />
  );
}

function Key(p) {
  // Bow + open shaft with two bits (same members as the filled key).
  return (
    <Outline
      {...p}
      paths={[circ(16, 24, 7.2), "M23 24h14.3v4.2h-3.2v3.2h-3.4V28.2H26"]}
    />
  );
}

function Eye(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M12 24c3.2-6.2 7.6-9.2 12-9.2S32.8 17.8 36 24c-3.2 6.2-7.6 9.2-12 9.2S15.2 30.2 12 24Z",
        circ(24, 24, 4.4),
      ]}
    />
  );
}

function EyeOff(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M12 24c3.2-6.2 7.6-9.2 12-9.2S32.8 17.8 36 24c-3.2 6.2-7.6 9.2-12 9.2S15.2 30.2 12 24Z",
        circ(24, 24, 4.4),
        "M15.5 32.2L32.5 15.8",
      ]}
    />
  );
}

/* ── Comms ── */

function Mail(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M13.5 17h21a2.6 2.6 0 0 1 2.6 2.6v10.8a2.6 2.6 0 0 1-2.6 2.6h-21a2.6 2.6 0 0 1-2.6-2.6V19.6A2.6 2.6 0 0 1 13.5 17Z",
        "M13.8 18.6L24 26.2 34.2 18.6",
      ]}
    />
  );
}

function Send(p) {
  return <Outline {...p} paths={["M10 22.5L38 12l-8.5 24-5.5-9.5L10 22.5Z", "M24 26.5L29.5 36"]} />;
}

function Inbox(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M15.2 16h17.6l2 7.6V34.6a2.5 2.5 0 0 1-2.5 2.5H15.7a2.5 2.5 0 0 1-2.5-2.5V23.6L15.2 16Z",
        "M12.7 23.6h6a5.3 5.3 0 0 0 10.6 0h6",
      ]}
    />
  );
}

function Chat(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M11 13h24a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H21l-7 6v-6h-3a4 4 0 0 1-4-4V17a4 4 0 0 1 4-4Z",
        circ(18, 22, 1.8),
        circ(24, 22, 1.8),
        circ(30, 22, 1.8),
      ]}
    />
  );
}

function Bell(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M14.2 18.5a9.8 9.8 0 0 1 19.6 0c0 5.8 2 8.1 3 9.5a1.5 1.5 0 0 1-1.25 2.35H12.45a1.5 1.5 0 0 1-1.25-2.35c1-1.4 3-3.7 3-9.5Z",
        "M20.6 34.4a3.4 3.4 0 0 0 6.8 0",
        circ(24, 12.2, 1.6),
      ]}
    />
  );
}

function Phone(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M17 10h14a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z",
        "M20.5 14.5h7",
        circ(24, 33, 1.8),
      ]}
    />
  );
}

function Share(p) {
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[circ(31, 15, 3.6), circ(15, 24, 3.6), circ(31, 33, 3.6), "M18 22.4l10-5.2", "M18 25.6l10 5.2"]}
    />
  );
}

/* ── Data ── */

function Chart(p) {
  // Gold three bars — outlined rounded rects, same boxes as the filled SoftRects.
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[rr(10.5, 20, 7.2, 18, 2.8), rr(20, 12, 7.2, 26, 2.8), rr(29.5, 17, 7.2, 21, 2.8)]}
    />
  );
}

function PieChart(p) {
  return <Outline {...p} paths={[circ(24, 24, 13.8), "M24 10.2V37.8", "M24 24H37.8"]} />;
}

function Report(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M13 10h22a3.5 3.5 0 0 1 3.5 3.5v21A3.5 3.5 0 0 1 35 38H13a3.5 3.5 0 0 1-3.5-3.5v-21A3.5 3.5 0 0 1 13 10Z",
        "M17 19.5h14",
        "M17 25.5h12",
        "M17 31.5h10",
      ]}
    />
  );
}

function CreditCard(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M13 17h22a2.6 2.6 0 0 1 2.6 2.6v10.8a2.6 2.6 0 0 1-2.6 2.6H13a2.6 2.6 0 0 1-2.6-2.6V19.6A2.6 2.6 0 0 1 13 17Z",
        "M13.5 23.3h21",
        "M16 29.2h7",
      ]}
    />
  );
}

function Cart(p) {
  return (
    <Outline
      {...p}
      paths={["M11 14h4l3.5 15h15l3-10.5H18", circ(21, 34.5, 2.4), circ(31, 34.5, 2.4)]}
    />
  );
}

function Receipt(p) {
  return (
    <Outline
      {...p}
      paths={["M14 10h20v28l-3.2-2-3.3 2-3.3-2-3.3 2-3.3-2-3.6 2V10Z", "M18 17.3h12", "M18 23.2h9"]}
    />
  );
}

function Package(p) {
  return (
    <Outline
      {...p}
      paths={["M12 18.5L24 12l12 6.5v13L24 38 12 31.5v-13Z", "M12 18.5l12 6.5 12-6.5", "M24 25v13"]}
    />
  );
}

function Wallet(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M14 15.5H33A6 6 0 0 1 39 21.5V27.5A6 6 0 0 1 33 33.5H14A6 6 0 0 1 8 27.5V21.5A6 6 0 0 1 14 15.5Z",
        "M10 15.8l3.2-4.6A4 4 0 0 1 16.6 9.2h14A4 4 0 0 1 34 11.3l3 4.5",
        "M27 20h9.5a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H27a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3Z",
        circ(31.8, 24.5, 1.7),
      ]}
    />
  );
}

/* ── Content ── */

function Calendar(p) {
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[
        rr(10, 14, 28, 24, 6.5),
        "M10 22.5h28",
        "M16.5 10.4v6.2",
        "M24 10.4v6.2",
        "M31.5 10.4v6.2",
        "M16.4 27.1h4.4",
        "M22.8 27.1h4.4",
        "M29.2 27.1h4.4",
        "M16.4 31.2h4.4",
        "M22.8 31.2h4.4",
        "M29.2 31.2h4.4",
      ]}
    />
  );
}

function Clock(p) {
  return <Outline {...p} paths={[circ(24, 24, 14), "M24 15v10l6.5 3.5"]} />;
}

function File(p) {
  return (
    <Outline
      {...p}
      paths={["M14 10h12l8 8v18a3 3 0 0 1-3 3H14a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z", "M26 10v8h8"]}
    />
  );
}

function Files(p) {
  return <Outline {...p} width={2.8} paths={[rr(17.5, 9.5, 16, 20, 3.5), rr(11.5, 13.5, 16, 20, 3.5)]} />;
}

function Image(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M13.5 14.5h21a2.8 2.8 0 0 1 2.8 2.8v13.4a2.8 2.8 0 0 1-2.8 2.8h-21a2.8 2.8 0 0 1-2.8-2.8V17.3a2.8 2.8 0 0 1 2.8-2.8Z",
        circ(18.5, 20.8, 2.5),
        "M13.6 31.2l6.4-6.2 4.4 4.2 3.6-3.6 7.2 5.6",
      ]}
    />
  );
}

function Database(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M12 14a12 4 0 1 0 24 0a12 4 0 1 0-24 0",
        "M12 14v18",
        "M36 14v18",
        "M12 24a12 4 0 0 0 24 0",
        "M12 32a12 4 0 0 0 24 0",
      ]}
    />
  );
}

function Cloud(p) {
  return (
    <Outline {...p} tight={false} width={3.3} paths={["M14 30h18a7 7 0 0 0 1-14 9.2 9.2 0 0 0-17.8 3.2A6.2 6.2 0 0 0 14 30Z"]} />
  );
}

function Server(p) {
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[
        rr(11, 10, 26, 9, 3),
        rr(11, 21, 26, 9, 3),
        rr(11, 32, 26, 9, 3),
        circ(16, 14.5, 1.5),
        circ(16, 25.5, 1.5),
        circ(16, 36.5, 1.5),
      ]}
    />
  );
}

function Tag(p) {
  return (
    <Outline
      {...p}
      paths={["M12.5 24l9-9h13a3.5 3.5 0 0 1 3.5 3.5v11A3.5 3.5 0 0 1 34.5 33H21.5L12.5 24Z", circ(31, 24, 2.2)]}
    />
  );
}

function Bookmark(p) {
  return <Outline {...p} tight={false} width={3.3} paths={["M14 9h20v30l-10-6.5L14 39V9Z"]} />;
}

function Star(p) {
  return (
    <Outline
      {...p}
      tight={false}
      width={3.3}
      paths={["M24 9.5l4.2 8.5 9.4 1.4-6.8 6.6 1.6 9.4L24 30.8l-8.4 4.6 1.6-9.4-6.8-6.6 9.4-1.4L24 9.5Z"]}
    />
  );
}

function Flag(p) {
  return <Outline {...p} paths={["M16 12.5h16l-3.2 6 3.2 6H16V12.5Z", "M16 12v26"]} />;
}

function MapPin(p) {
  // Hole is a stroke loop — cut is duo-only.
  return (
    <Outline
      {...p}
      paths={[
        "M24 12.5c5.2 0 9.2 4 9.2 8.8 0 6.6-9.2 15.2-9.2 15.2S14.8 27.9 14.8 21.3C14.8 16.5 18.8 12.5 24 12.5Z",
        circ(24, 20.6, 3.2),
      ]}
    />
  );
}

function Globe(p) {
  return (
    <Outline
      {...p}
      paths={[
        circ(24, 24, 13.5),
        "M24 10.5A5.5 13.5 0 0 1 24 37.5A5.5 13.5 0 0 1 24 10.5",
        "M11 24h26",
        "M12.5 18.5h23",
        "M12.5 29.5h23",
      ]}
    />
  );
}

function Folder(p) {
  return (
    <Outline
      {...p}
      tight={false}
      width={3.3}
      paths={["M9 17h9.2l2.5 2.6H37.5A3.5 3.5 0 0 1 41 23.1v14.3A3.5 3.5 0 0 1 37.5 41H12.5A3.5 3.5 0 0 1 9 37.4V17Z"]}
    />
  );
}

/* ── System ── */

function Settings(p) {
  // Hub ring + eight radial teeth (same members as the filled gear).
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[
        circ(24, 24, 5.2),
        "M24 15.8V9.8",
        "M29.8 18.2L34 14",
        "M32.2 24h6",
        "M29.8 29.8L34 34",
        "M24 32.2v6",
        "M18.2 29.8L14 34",
        "M15.8 24h-6",
        "M18.2 18.2L14 14",
      ]}
    />
  );
}

function Sparkles(p) {
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[
        "M24 11l2.2 6 6 2.2-6 2.2L24 27.4l-2.2-6-6-2.2 6-2.2L24 11Z",
        "M34 26l1.2 3.2 3.2 1.2-3.2 1.2L34 34.8l-1.2-3.2-3.2-1.2 3.2-1.2L34 26Z",
        "M14 28l1 2.6 2.6 1-2.6 1L14 35.2l-1-2.6-2.6-1 2.6-1L14 28Z",
      ]}
    />
  );
}

function Rocket(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M24 9c5 4.2 7.5 10.2 7.5 16.5l-3.5 1.8-4-9.5-4 9.5-3.5-1.8C16.5 19.2 19 13.2 24 9Z",
        circ(24, 20, 2.2),
        "M19.5 30c-1.5 1.5-2.5 3.5-2.5 3.5s2.2-.6 3.6-2",
        "M28.5 30c1.5 1.5 2.5 3.5 2.5 3.5s-2.2-.6-3.6-2",
      ]}
    />
  );
}

function Zap(p) {
  return <Outline {...p} tight={false} width={3.3} paths={["M28 9L15 25.5h8.5L19.5 39 35 21.5h-8.5L28 9Z"]} />;
}

function Layers(p) {
  return (
    <Outline
      {...p}
      width={2.8}
      paths={[
        "M24 22.5l12.5 6.2-12.5 6.2-12.5-6.2L24 22.5Z",
        "M24 16.5l12.5 6.2-12.5 6.2-12.5-6.2L24 16.5Z",
        "M24 10.5l12.5 6.2-12.5 6.2-12.5-6.2L24 10.5Z",
      ]}
    />
  );
}

function Terminal(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M13.5 14h21a2.8 2.8 0 0 1 2.8 2.8v14.4a2.8 2.8 0 0 1-2.8 2.8h-21a2.8 2.8 0 0 1-2.8-2.8V16.8A2.8 2.8 0 0 1 13.5 14Z",
        "M17 20.5l5 3.8-5 3.8",
        "M24.5 28h7.5",
      ]}
    />
  );
}

function Support(p) {
  return (
    <Outline
      {...p}
      paths={["M15 24.5a9 9 0 0 1 18 0", rr(12, 23.5, 6, 10, 2.5), rr(29, 23.5, 6, 10, 2.5)]}
    />
  );
}

function Book(p) {
  return (
    <Outline
      {...p}
      paths={[
        "M11.6 14.8L24.8 18.2v18.5L13.4 33.6a2 2 0 0 1-1.8-2V16.8a2 2 0 0 1 1.5-2Z",
        "M36.4 14.8L23.2 18.2v18.5L34.6 33.6a2 2 0 0 1 1.8-2V16.8a2 2 0 0 1-1.5-2Z",
        "M24 18.2v18.5",
      ]}
    />
  );
}

export const FROSTED_CATALOG_OUTLINE = {
  home: Home,
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
  more: More,
  edit: Edit,
  copy: Copy,
  save: Save,
  trash: Trash,
  user: User,
  users: Users,
  userPlus: UserPlus,
  lock: Lock,
  unlock: Unlock,
  shield: Shield,
  key: Key,
  eye: Eye,
  eyeOff: EyeOff,
  mail: Mail,
  send: Send,
  inbox: Inbox,
  chat: Chat,
  bell: Bell,
  phone: Phone,
  share: Share,
  chart: Chart,
  pieChart: PieChart,
  report: Report,
  creditCard: CreditCard,
  cart: Cart,
  receipt: Receipt,
  package: Package,
  wallet: Wallet,
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
  folder: Folder,
  settings: Settings,
  sparkles: Sparkles,
  rocket: Rocket,
  zap: Zap,
  layers: Layers,
  terminal: Terminal,
  support: Support,
  book: Book,
};

export const FROSTED_CATALOG_OUTLINE_KEYS = Object.keys(FROSTED_CATALOG_OUTLINE);
