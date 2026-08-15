# soft-frosted-icons

Frosted SoftMark icons for React — outline and duo-tone glass marks. This is a **standalone** package. [soft-ui-kit](https://github.com/Dev-Muhammad-Junaid/soft-ui-kit) stays on Phosphor.

<p align="center">
  <a href="https://dev-muhammad-junaid.github.io/soft-frosted-icons/"><strong>Live demo →</strong></a>
</p>

---

## Install

```bash
npm install soft-frosted-icons
```

```bash
pnpm add soft-frosted-icons
```

From GitHub (works before/without npm publish):

```bash
npm install github:Dev-Muhammad-Junaid/soft-frosted-icons
```

Peer deps: `react`, `react-dom`.

## Usage

```jsx
import { FrostedIcon } from "soft-frosted-icons";
import "soft-frosted-icons/styles.css";

export function App() {
  return <FrostedIcon name="home" finish="outline" size={24} />;
}
```

### Props

| Prop | Default | Notes |
|---|---|---|
| `name` | `"check"` | Registry key (`home`, `bell`, `play`, …) |
| `finish` | `"outline"` | `"outline"` SoftStrokeMark, or `"duo"` filled SoftMark |
| `size` | `24` | CSS pixels |
| `color` | `--accent` | Optional override |
| `animate` | `false` | Idle specular pulse |
| `title` | label | Accessible name |

Line marks (Close, Plus, arrows, Info, hash, bluetooth, …) stay outline in both finishes. Object marks have both.

### Catalog helpers

```jsx
import { FrostedCatalog, FROSTED_ICON_KEYS } from "soft-frosted-icons";

<FrostedCatalog finish="duo" size={48} />
```

`FROSTED_ICON_KEYS`, `FROSTED_LABELS`, and `FROSTED_CATEGORIES` are exported for custom grids.

## Theme

Icons paint with `currentColor` (`--accent`) plus `--soft-cx-frost|mark|cut`. Importing `soft-frosted-icons/styles.css` sets Soft Glass defaults and `[data-theme]` variants: `soft-glass`, `crystal`, `aurora`, `dusk`, `midnight`.

```html
<html data-theme="dusk">
```

You can also wrap a subtree and set `--accent` yourself.

## Demo site (this repo)

```bash
npm install
npm run dev
```

```bash
npm test          # Vitest
npm run build     # demo site + library bundle
npm run build:lib # package entry only → dist/lib
```

GitHub Pages deploys from `main` via `.github/workflows/deploy-pages.yml`.

## What’s not in this package

- soft-ui-kit components, charts, or Phosphor icons
- Tiled Soft Complex plates (lab origin artwork only)

## License

MIT
