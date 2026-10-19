# Soft Frosted Icons — promo video

A 32.5 second motion promo for the icon set, built with [HyperFrames](https://hyperframes.heygen.com) (HTML → MP4).
Every icon in the video is rendered by the package itself (`iconSVG()` from `src/`), themed with `tokens.css`.
The use-case mocks are lifted straight out of `index.html` and styled by the demo page's own CSS.
A single seekable GSAP timeline drives all the motion.

| Output | Size | Use |
| --- | --- | --- |
| `docs/promo/soft-frosted-icons-landscape-16x9.mp4` | 1920×1080 · 60fps | YouTube, X, LinkedIn, site hero |
| `docs/promo/soft-frosted-icons-vertical-9x16.mp4` | 1080×1920 · 60fps | Instagram Reels, Facebook Reels, YouTube Shorts, TikTok |
| `docs/promo/soft-frosted-icons-youtube-thumbnail.png` | 1280×720 | YouTube thumbnail |

## Storyboard (120 BPM, one cut per beat)

| Time | Scene |
| --- | --- |
| 0.0s | Duo-tone `sparkles` mark + title |
| 2.5s | Icon wall: 24 glass tiles fly in, a counter runs to 136, and the whole wall flips outline → duo-tone → outline → duo-tone on the beat |
| 6.0s | Surface run: Soft Glass → Crystal → Aurora → Dusk → Midnight (iris wipes from the theme dots), with the `data-sfi-theme` snippet for each |
| 10.0s | One colour, two finishes: the lab panel switches Outline → Duo-tone → Rose → Emerald → Amber → Any colour, all driven by a single `--sfi-color` |
| 15.0s | 10 icons, one per beat, at 300 px on alternating surfaces, finishes and colours, each with its `<frosted-icon>` tag and catalog number |
| 20.0s | The full catalog: all 136 icons on the Dusk surface |
| 22.5s | Coverflow through the demo's real use cases: navigation and toolbars, status toasts and inline text, dark mobile UI, dashboards and file lists, empty states and plain SVG files |
| 26.5s | Sizes: the camera icon in both finishes at 16, 20, 24, 32, 48, 64 and 96 px |
| 28.9s | Outro: `npm i soft-frosted-icons` · 136 icons · 2 finishes · 5 themes |

## Rebuild and render

```bash
pip install numpy scipy                 # soundtrack synth (ffmpeg required)
python3 promo/scripts/soundtrack.py     # → promo/assets/soundtrack.mp3 (already committed)
node promo/scripts/build.mjs            # → promo/video/{landscape,vertical,thumbnail}/

cd promo/video/landscape
npx hyperframes@0.8.149 preview         # Studio preview / editor
npx hyperframes@0.8.149 render --fps 60 --crf 18 --output ../../../docs/promo/soft-frosted-icons-landscape-16x9.mp4

cd ../vertical
npx hyperframes@0.8.149 render --fps 60 --crf 18 --output ../../../docs/promo/soft-frosted-icons-vertical-9x16.mp4

cd ../thumbnail
npx hyperframes@0.8.149 snapshot --at 0.5   # PNG lands in snapshots/
```

No `npm install` is needed: the package has no dependencies and the build imports `src/` directly.

## Files

- `src/snippets.mjs` — icons through `iconSVG()` (walls, lab, slides, catalog, sizes) and the `index.html` use cases with each `<frosted-icon>` swapped for its SVG
- `src/composition.mjs` — scene markup and HyperFrames root for each format
- `src/promo.css` — stage, scene, and per-format layouts
- `src/timeline.js` — the GSAP timeline: transitions, finish flips, theme and colour animation
- `scripts/build.mjs` — inlines `tokens.css` and the demo page CSS, and writes the HyperFrames projects
- `scripts/soundtrack.py` — a royalty-free 120 BPM track, synthesised in code, with cues on every cut
- `assets/` — Manrope and JetBrains Mono (SIL OFL), GSAP 3.14.2, and the soundtrack

The demo's CSS transitions and keyframe animations (including the idle glint) are stripped from the video
build because they run on the browser clock and can't be seeked frame by frame. Every reveal is
re-created on the timeline instead. `backdrop-filter` is stripped too, to keep render times down.

Every icon render gets its own paint ids (`{ id }` in `iconSVG`). Reusing one SVG string in two scenes would
point the second copy's gradients at a hidden scene, and those icons would render blank.
