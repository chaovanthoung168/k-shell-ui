# K Shell website

A responsive, three-page website for K Shell, built with Next.js 16, React 19, TypeScript, and plain CSS.

## Local development

```powershell
npm run dev
```

Open http://localhost:3000 (or http://127.0.0.1:3000). The Home, Docs, and About pages live at `/`, `/docs/`, and `/about/`.

## Production

```powershell
npm run build
```

The build type-checks the application and exports all pages and assets into `out/`. Serve that folder with any static web host. The default `next start` command is not used for a static export.

## Features

- Responsive shared navigation, mobile menu, and footer.
- Shared readable typography across every page, with larger reading text, controls, documentation, and terminal previews; layouts adapt to narrow screens.
- Animated browser-local terminal preview with completion, history examples, and selectable shell themes. Playback can be paused, stops on interaction, and respects reduced-motion preferences. It never executes system commands.
- Explicit Light/Dark controls across every page, initialized before hydration and following the system preference until a visitor chooses a mode. The terminal preview follows the page color mode, with Ocean/Dusk/Midnight accent palettes.
- Windows Terminal-style tabs and caption icons in the terminal preview.
- Interactive feature explorer with six capability previews.
- Redesigned About page with a native execution diagram, expandable technology notes, verified dependency versions, and current/future capability sections.
- Searchable documentation topics and copyable code examples.
- Installation, commands, shortcuts, customization, and a clearly identified roadmap.
- Keyboard focus styles, a skip link, reduced-motion support, and page metadata.

The supplied prompt image inspired the SVG brand mark. `DESIGN.md` records the visual direction. Shell behavior and install instructions are based on the adjacent Rust project's README. Public copies of its reference and MIT license are in `public/`. No external fonts or runtime services are needed.

`.openai/hosting.json` records this website's private Sites deployment identity and static output directory. It contains no credentials.
