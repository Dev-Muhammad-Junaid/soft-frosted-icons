/**
 * Icon registry — every icon is one spec rendered in two finishes.
 * See render.js for the grid contract and paint recipe.
 */
import { actions } from "./icons/actions.js";
import { comms } from "./icons/comms.js";
import { content } from "./icons/content.js";
import { data } from "./icons/data.js";
import { media } from "./icons/media.js";
import { navigation } from "./icons/navigation.js";
import { objects } from "./icons/objects.js";
import { people } from "./icons/people.js";
import { system } from "./icons/system.js";

const GROUPS = [
  { id: "nav", label: "Navigation & layout", hint: "Shell, sidebar, and page structure", icons: navigation },
  { id: "actions", label: "Actions & arrows", hint: "Toolbars, forms, and dense controls", icons: actions },
  { id: "people", label: "People & access", hint: "Accounts, teams, and security", icons: people },
  { id: "comms", label: "Communication", hint: "Inbox, chat, and notifications", icons: comms },
  { id: "data", label: "Data & commerce", hint: "Analytics, billing, and storefront", icons: data },
  { id: "content", label: "Content & places", hint: "Files, media, and location", icons: content },
  { id: "system", label: "System & status", hint: "Settings, help, and feedback", icons: system },
  { id: "media", label: "Media & controls", hint: "Playback, audio, and toggles", icons: media },
  { id: "objects", label: "Objects", hint: "Everyday things and places", icons: objects },
];

/** name → spec */
export const ICONS = Object.assign({}, ...GROUPS.map((g) => g.icons));

export const ICON_CATEGORIES = GROUPS.map(({ id, label, hint, icons }) => ({
  id,
  label,
  hint,
  icons: Object.keys(icons),
}));

const KEYS = ICON_CATEGORIES.flatMap((c) => c.icons);

export const ICON_LABELS = Object.fromEntries(KEYS.map((k) => [k, ICONS[k].label]));
