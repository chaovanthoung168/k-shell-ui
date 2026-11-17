# K Shell website

A responsive website for K Shell, built with Next.js 16, React 19, TypeScript, and plain CSS.

## Local development

```powershell
npm run dev
```

Open http://localhost:3000 (or http://127.0.0.1:3000). The Home, Playground, Docs, and About pages live at `/`, `/playground/`, `/docs/`, and `/about/`.

## Playground

The Playground is a browser-only simulation with a temporary sample filesystem. Its terminal shares the navbar's responsive container and fills the remaining viewport.

All 27 K Shell built-in names are supported: `append`, `cat`, `cd`, `clear`, `copy`, `cp`, `create`, `delete`, `echo`, `exit`, `help`, `history`, `ls`, `mkdir`, `move`, `mv`, `open`, `pwd`, `rename`, `rm`, `specs`, `sysinfo`, `theme`, `touch`, `tree`, `update`, and `write`. Use `help` or `help command` for syntax. File operations share the sample workspace, support quoted Windows paths, and preserve existing files when a copy or move would overwrite them.

Tab completes commands, paths and theme settings; repeated Tab cycles matches. Right accepts inline suggestions, Up/Down recalls history, and Ctrl L clears output. `cat` without a filename reads typed input; Ctrl D or Finish input ends it, and Ctrl C or Cancel returns to the prompt. `exit` closes the session; Reset reopens it. Themes support palette, icon and suggestion-style settings, with browser-safe text labels for Nerd icons.

`open` previews sample text files in the terminal; `sysinfo` and `specs` report workspace data. The Playground does not execute the Rust shell, access the host filesystem, launch Windows apps, or run external programs such as Git, npm or Python. Reset restores the sample workspace; reloading starts a new session.

Run the shell-behavior checks with `npm run test:playground`.

## Production

```powershell
npm run build
```

The build type-checks the application and exports all pages and assets into `out/`. Serve that folder with any static web host. The default `next start` command is not used for a static export.

## Features

- Responsive shared navigation, mobile menu, and footer.
- Shared readable typography across every page, with larger reading text, controls, documentation, and terminal previews; layouts adapt to narrow screens.
- Read-only home terminal with automatic typing and eight feature scenes: completion, familiar commands, files, syntax highlighting, history, themes, KPM, and kreq. Built-in results come from the browser shell engine; source-build KPM/kreq examples use explicitly labelled fixtures and never install tools or send requests. Playback begins after particle formation and pauses offscreen, in hidden tabs, or with the Pause control. Reduced-motion users see a static example with manual feature navigation.
- The home demo offers pause/resume, next-feature, and restart controls. Typing commands is available in the separate interactive Playground. Verify feature scripts with `node --test app/components/terminal-demo-data.test.mjs`.
- Explicit Light/Dark controls across every page, initialized before hydration. New visitors start in dark mode; saved theme choices remain in effect. The terminal preview follows the page color mode, with Ocean/Dusk/Midnight accent palettes.
- Windows Terminal-style tabs and caption icons in the terminal preview.
- Theme-aware hero with centered heading, description, and actions over a full-width centered particle-wave background. A soft theme-matched mask preserves text contrast. Dark mode uses black with orange, coral, and white points; light mode uses a pale surface with deeper orange, coral, and slate points and normal alpha blending. Hero text, buttons, and the static fallback follow the selected page theme. React Three Fiber renders 14,080 points (5,200 on mobile) in one Three.js BufferGeometry with custom GLSL deformation, circular sprites, perspective size, and soft glow. Mouse movement gently influences the surface. Offscreen and hidden-tab suspension, capped pixel density, and a lazy-loaded renderer keep work bounded. Reduced-motion, unavailable WebGL, and context-loss cases use the static SVG fallback. Scrolling tilts the same particle cloud downward into the workspace, morphs its points into a terminal frame and command text, then reveals the automatic terminal feature demo. Reverse scrolling restores the wave without remounting the demo or losing its playback position. After the reveal, continuous GPU frames stop. Reduced-motion and unavailable-renderer cases show the static hero and read-only feature demo directly.
- Monochrome platform branding across Home, Docs, About, and Playground, with neutral light and dark modes.
- Six feature cards with command visuals, completion acceptance, Kpm and kreq source-build examples, and a live palette, icon, and suggestion-style preview.
- Redesigned About page with a native execution diagram, expandable technology notes, verified dependency versions, and current/future capability sections.
- Searchable documentation topics and copyable code examples.
- Installation, commands, shortcuts, customization, and a clearly identified roadmap.
- Keyboard focus styles, a skip link, reduced-motion support, and page metadata.

The supplied K Shell artwork is preserved in `public/kshell-logo.png`. The header and footer use the complete custom wordmark; compact previews and page artwork use its isolated K/lightning symbol. SVG luminance masks retain the supplied pixels while following each page's foreground color. Matching SVG and multi-size ICO browser icons are generated with `node scripts/update-brand-assets.mjs`. `DESIGN.md` records the visual direction. Shell behavior and install instructions are based on the adjacent Rust project's README. Public copies of its reference and MIT license are in `public/`. No external fonts or runtime services are needed.

`.openai/hosting.json` records this website's private Sites deployment identity and static output directory. It contains no credentials.
