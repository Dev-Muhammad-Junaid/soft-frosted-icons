# soft-frosted-icons

Frosted glass icons for React and plain SVG. **136 icons**, each drawn once and rendered in two finishes:

- **Outline**: every stroke is a glass tube with a frost face, an accent core, a soft offset shadow and a specular rim.
- **Duo-tone**: filled glass. Every part is the same glass material: a frost body with an accent edge and a soft accent core. Interior details are cut through the glass, and open lines become glass rods.

<p align="center">
  <a href="https://dev-muhammad-junaid.github.io/soft-frosted-icons/"><strong>Browse the set →</strong></a>
</p>

---

## Install

```bash
npm install soft-frosted-icons
# or, before an npm release:
npm install github:Dev-Muhammad-Junaid/soft-frosted-icons
```

Peer deps: `react`, `react-dom` (≥ 18). The plain SVG files need nothing.

## Use in React

```jsx
import { FrostedIcon } from "soft-frosted-icons";
import "soft-frosted-icons/styles.css";

<FrostedIcon name="bell" />                         // outline, 24px, decorative
<FrostedIcon name="bell" finish="duo" size={32} />  // duo-tone
<FrostedIcon name="bell" title="Notifications" />   // labelled for screen readers
<FrostedIcon name="bell" color="#e11d48" />         // any CSS colour
```

| Prop | Default | Notes |
|---|---|---|
| `name` | `"check"` | Icon key (see the list below). TypeScript users get autocomplete. |
| `finish` | `"outline"` | `"outline"` or `"duo"` |
| `size` | `24` | Width and height (px or any CSS length) |
| `color` | `var(--accent)` | Sets `currentColor`; every paint derives from it |
| `title` | none | Accessible name. Without it the icon is `aria-hidden`. |
| `intensity` | `1` | Specular strength, 0–1 |
| `animate` | `false` | Idle specular pulse |

Any other prop (`className`, `style`, `onClick`, `data-*` and so on) is passed to the `<svg>`.

Also exported: `renderFrostedIcon(name, opts)` (hook-free, for SSR or custom wrappers), `FrostedIconSet`, `FrostedCatalog`, `FROSTED_ICON_KEYS`, `FROSTED_LABELS`, `FROSTED_CATEGORIES` and `FROSTED_GRID`.

## Use as SVG files

Every icon ships as a standalone file in `svg/outline/` and `svg/duo/`, named in kebab-case (`arrow-left.svg`, `eye-off.svg`, …):

```html
<img src="node_modules/soft-frosted-icons/svg/duo/bell.svg" width="24" height="24" alt="" />
```

Inline the SVG and it inherits `color`. Used as an `<img>`, it falls back to the Soft Glass blue. The files also drop straight into Figma or Sketch.

## Theming

Paints resolve from `currentColor` plus two frost tokens. Importing `styles.css` sets defaults and five `[data-theme]` palettes: `soft-glass`, `crystal`, `aurora`, `dusk`, `midnight`.

```css
.my-toolbar {
  --accent: hsl(262 80% 58%);                                   /* icon colour */
  --soft-cx-frost: color-mix(in srgb, #fff 80%, transparent);   /* glass highlight */
  --soft-cx-mark: color-mix(in srgb, var(--accent) 20%, #fff);  /* lower face tint */
}
```

## Icons

| Group | # | Icons |
|---|---|---|
| Navigation & layout | 10 | `home` `dashboard` `grid` `layout` `sidebar` `panels` `table` `list` `columns` `menu` |
| Actions & arrows | 24 | `search` `filter` `sort` `more` `close` `check` `plus` `minus` `edit` `trash` `copy` `save` `download` `upload` `refresh` `externalLink` `arrowLeft` `arrowRight` `arrowUp` `arrowDown` `chevronRight` `chevronLeft` `chevronUp` `chevronDown` |
| People & access | 11 | `user` `users` `userPlus` `lock` `unlock` `shield` `key` `eye` `eyeOff` `login` `logout` |
| Communication | 9 | `mail` `send` `inbox` `chat` `bell` `phone` `link` `share` `at` |
| Data & commerce | 12 | `chart` `trendingUp` `trendingDown` `pieChart` `activity` `report` `wallet` `creditCard` `dollar` `cart` `receipt` `package` |
| Content & places | 15 | `calendar` `clock` `folder` `file` `files` `image` `database` `cloud` `server` `tag` `bookmark` `star` `flag` `mapPin` `globe` |
| System & status | 15 | `settings` `info` `help` `alert` `warning` `ban` `sparkles` `rocket` `zap` `layers` `code` `terminal` `support` `book` `power` |
| Media & controls | 20 | `play` `pause` `stop` `skipNext` `skipPrev` `volume` `mic` `wifi` `hash` `expand` `paperclip` `scissors` `repeat` `shuffle` `thumbsUp` `thumbsDown` `megaphone` `bluetooth` `sun` `moon` |
| Objects | 20 | `camera` `video` `printer` `battery` `gift` `truck` `store` `briefcase` `building` `compass` `coffee` `umbrella` `headphones` `pin` `paintBrush` `heart` `newspaper` `map` `film` `cast` |

## Design system

Every icon follows the same contract (`FROSTED_GRID`), and the test suite enforces it.

| Rule | Value |
|---|---|
| Canvas | 48 × 48 viewBox, so it renders at 24 px as a 2× grid |
| Live area | Stroke centrelines stay within **7–41** |
| Stroke | **3** units, round caps and joins, and one weight everywhere |
| Keyshapes | Circle r 15 · Square 28 (r 6) · Landscape 32 × 24 (r 5) · Portrait 24 × 32 (r 5) |
| Corner radii | 5 on large frames, 3–4 on medium parts, 2–2.5 on small ones |
| Clearance | Parallel strokes at least **6** apart (centreline), so glass faces never weld |
| Dots | Round-capped zero-length strokes, 3.4–5 wide |
| Duo core | Accent inset **2.9** from every edge and cut (1–2.6 on small parts), corners smoothed |
| Duo cuts | Detail lines become gaps through the glass, 0.2 narrower than the stroke |
| Slashes | A knockout band clears 1.6 either side (`eyeOff`) |
| Paint | No raw colours: `currentColor` plus `--soft-cx-*` tokens only |

### How the finishes are built

Each icon is a small data spec in `src/lib/icons/*.js`:

```js
bell: {
  label: "Bell",
  shapes: [bellDome],             // closed silhouettes: tubes in outline, glass bodies in duo
  lines: ["M20.5 38.5a3.8 …"],    // open strokes: tubes in outline, cuts through the bodies in duo
  duo: { cuts: [], rods: [clapper] }, // optional: which lines are cuts vs. glass rods
}
```

`src/lib/material.jsx` turns a spec into SVG. The outline finish draws each layer across all paths at once (all shadows, then all faces, cores and highlights), so crossings fuse like one piece of glass. In duo, every body gets a shadow, a frost face, an accent edge, a white rim and an accent core inset by the same distance. Cuts knock gaps through the bodies, and every piece they create gets its own walls and core. Rods carry the same layers, so a duo icon is always one material.

### Adding an icon

1. Draw it on the grid above, reusing a keyshape where one fits.
2. Add a spec to the right group in `src/lib/icons/` using the helpers in `geometry.js` (`rect`, `circle`, `poly` with true corner radii, `arc`, `dot`, `rotate`, `flipX`, …).
3. Decide the duo read. By default, lines inside a shape are cut through it. Use a `duo` override to turn outside lines into `rods`, or to recompose `bodies`. Overriding `bodies` or `rods` means listing `cuts` explicitly.
4. Run `npm test` and `npm run build:svg`, then check both finishes in `npm run dev`.

## Scripts

```bash
npm run dev        # catalog / inspector with keyline overlay
npm test           # grid, paint and render checks for every icon
npm run build:svg  # regenerate svg/outline + svg/duo
npm run build      # demo site + library bundle + SVG files
```

GitHub Pages deploys the catalog from `main` via `.github/workflows/deploy-pages.yml`.

## License

MIT
