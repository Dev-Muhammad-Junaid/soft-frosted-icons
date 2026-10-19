# Soft Frosted Icons

![Soft Frosted Icons: a board of frosted glass icons in outline and duo-tone, in several colours, on light and dark tiles](https://raw.githubusercontent.com/Dev-Muhammad-Junaid/soft-frosted-icons/main/preview.png)

136 frosted glass SVG icons in two finishes, **outline** and **duo-tone**, drawn on one 48 px grid. One colour themes the whole set. Use them as a web component, as SVG strings, as a React component or as plain SVG files. No dependencies.

**Live demo and catalog: https://dev-muhammad-junaid.github.io/soft-frosted-icons/**

```bash
npm i soft-frosted-icons
```

The demo has a lab where you can try finish, size, colour, surface theme and the idle glint. It also has use cases (navigation, toolbars, toasts, dark mobile UI, dashboards, file lists, inline text and empty states) and a searchable catalog. Click any icon, in the catalog or the lab, to open it full screen. There you can resize it up to 480 px, switch finish and colour, change the whole background between the five surfaces, overlay the 48-unit grid, step through the set with the arrow keys, and copy it as HTML, React or SVG or download it.

![Every icon in both finishes](https://raw.githubusercontent.com/Dev-Muhammad-Junaid/soft-frosted-icons/main/media/icons.png)

## Use it in your project

### Web component (any framework)

The package ships a `<frosted-icon>` custom element, so it works in plain HTML, Vue, Svelte, Angular, Astro or anything else that renders HTML.

```js
import 'soft-frosted-icons/define';
import 'soft-frosted-icons/tokens.css'; // optional: themes and glint
```

```html
<frosted-icon name="bell"></frosted-icon>
<frosted-icon name="bell" finish="duo" size="32" color="#e11d48" label="Notifications"></frosted-icon>
```

If you don't have a build step, load it from a CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/soft-frosted-icons/src/define.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/soft-frosted-icons/tokens.css">
```

#### Attributes

| Attribute | Values | Default |
| --- | --- | --- |
| `name` | Any of the 136 icon names, for example `bell` or `arrowRight`. Names are typed in TypeScript. | — |
| `finish` | `outline` `duo` | `outline` |
| `size` | A px number or any CSS length (`1.2em`, `2rem`) | `24` |
| `color` | Any CSS colour | `currentColor`, then `--sfi-color` |
| `label` | Accessible name. Without it the icon is decorative (`aria-hidden`). | — |
| `animate` | If present, the specular highlight glints while idle. Turned off when the viewer prefers reduced motion. | off |

Icons paint from `currentColor`, so they pick up the text colour around them. Set `--sfi-color` on any ancestor to recolour every icon below it.

### React

```jsx
import { FrostedIcon } from 'soft-frosted-icons/react';

<FrostedIcon name="bell" finish="duo" size={32} label="Notifications" />
```

React is an optional peer dependency (18 or newer), and only this entry imports it. The component server-renders and uses `useId`, so gradient ids are stable across hydration.

### SVG strings (SSR, Node, any templating)

```js
import { iconSVG, iconNames } from 'soft-frosted-icons';

iconSVG('bell', { finish: 'duo', size: 24, color: 'hsl(152 60% 40%)', label: 'Alerts' });
// → '<svg …>…</svg>'. Paint ids are unique per call; pass { id } for deterministic output.
iconNames(); // all 136 names in catalog order
```

`iconSVG` runs in Node with no DOM and returns `""` for an unknown name. The package also exports `ICON_CATEGORIES`, `ICON_LABELS` and `GRID`.

### Plain SVG files

Every icon also ships as a standalone file:

```html
<img src="node_modules/soft-frosted-icons/svg/duo/rocket.svg" width="48" height="48" alt="">
```

Files are named in kebab-case (`svg/outline/arrow-right.svg`, `svg/duo/arrow-right.svg`) and use the Soft Glass blue when nothing overrides it. Each file has unique paint ids, so you can inline as many as you like on one page or drop them into Figma.

## Themes and tokens

`tokens.css` defines five surface themes. To use one, put `data-sfi-theme` on any element:

```html
<nav data-sfi-theme="dusk">…</nav>
```

| Theme | For |
| --- | --- |
| `soft-glass` | Default. Sky blue on cool white frost. |
| `crystal` | Brighter, clearer frost for white UIs. |
| `aurora` | Violet accent. |
| `dusk` | Dark UIs. The frost darkens and glyphs stay light. |
| `midnight` | Warm amber on near-black. |

| Token | What it sets |
| --- | --- |
| `--sfi-color` | Accent. Every gradient, edge and core follows it. |
| `--sfi-frost` | Glass face and highlight colour. |
| `--sfi-mark` | Lower face tint. |
| `--sfi-inlay` | Glyphs set into duo-tone cores (the `!` in alert, text lines, dots). Keep it light. |
| `--sfi-intensity` | Specular strength, `0`–`1`. |

## The two finishes

Each icon is drawn once. Both finishes are rendered from that one drawing, so they always line up.

- **Outline**: every stroke is a glass tube with a frost face, an accent core, a specular rim and a soft shadow. Layers are drawn across all strokes at once, so crossings fuse like one piece of glass. Use it for resting states, toolbars and dense UI.
- **Duo-tone**: filled glass. Bodies get a frost face, an accent edge, a white rim and an inset accent core. Glyphs are inlaid into the core as crisp light strokes. Secondary parts such as handles and trays are clear frost glass, which is the second tone. Use it for active states, tiles, dashboards and empty states.

## The grid

| Rule | Value |
| --- | --- |
| Canvas | 48 × 48 (24 px renders on an exact half grid) |
| Live area | 7–41 (3 units of padding on each side) |
| Stroke | 3 units, round caps and joins |
| Keyshapes | circle r 15 · square 28 r 6 · landscape 32 × 24 r 5 · portrait 24 × 32 r 5 |
| Clear space | at least 6 units between parallel strokes |

`npm run check` checks every icon against these rules in both finishes. It flags any point outside the live area, any raw colour outside a CSS variable, missing glass layers, duplicate paint ids and drift between the TypeScript names and the registry.

## What's in here

| Path | What it is |
| --- | --- |
| `src/` | The npm package. `render.js` (the glass engine and `iconSVG`), `element.js` (`<frosted-icon>`), `react.js`, `registry.js`, `geometry.js`, and type definitions. |
| `src/icons/` | Every icon as data, in nine groups. Each icon has shapes, line paths and optional duo-tone overrides (bodies, cuts, rods, frost, inlays). |
| `svg/outline/`, `svg/duo/` | 272 standalone SVG files. Generated, don't edit. |
| `tokens.css` | Theme and motion tokens. |
| `index.html` | The demo and catalog page. One file, no build step, served by GitHub Pages straight from the repo. |
| `tools/build-svg.js` | Rebuilds `svg/` from `src/icons/`. |
| `tools/check.js` | Grid and output checks. Runs before every publish. |
| `preview.png`, `media/` | Social preview and the icon sheet above. |

## Develop

```bash
python3 -m http.server   # then open http://localhost:8000
npm run build            # regenerate svg/ after editing src/icons/
npm run check            # grid + output checks
```

To add an icon, add its spec to the right file in `src/icons/` and its name to the `IconName` union in `src/index.d.ts`. Then run `build` and `check`.

## License

[MIT](LICENSE), for the code and the icons. Use them in personal or commercial work and change them as you like; just keep the copyright notice.
