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
- Animated browser-local terminal preview with completion, history examples, and selectable shell themes. Playback can be paused, stops on interaction, and respects reduced-motion preferences. It never executes system commands.
- Explicit Light/Dark controls across every page, initialized before hydration and following the system preference until a visitor chooses a mode. The terminal preview follows the page color mode, with Ocean/Dusk/Midnight accent palettes.
- Windows Terminal-style tabs and caption icons in the terminal preview.
- Black-and-white hero with the title on the left and a live terminal on the right. Scrolling rotates that same terminal out of the hero and into a separate workspace section above the feature cards. The terminal keeps its command session throughout the move. Mobile uses a stacked layout; reduced-motion preferences show a static hero instead.
- Monochrome platform branding across Home, Docs, About, and Playground, with neutral light and dark modes.
- Six feature cards with command visuals, completion acceptance, history recall, and theme switching.
- Redesigned About page with a native execution diagram, expandable technology notes, verified dependency versions, and current/future capability sections.
- Searchable documentation topics and copyable code examples.
- Installation, commands, shortcuts, customization, and a clearly identified roadmap.
- Keyboard focus styles, a skip link, reduced-motion support, and page metadata.

The supplied angular K/lightning logo is traced as a theme-aware SVG brand mark, shared across navigation, previews, and page artwork. Matching SVG and multi-size ICO browser icons use the same silhouette; `public/kshell-logo.png` preserves the supplied artwork. `DESIGN.md` records the visual direction. Shell behavior and install instructions are based on the adjacent Rust project's README. Public copies of its reference and MIT license are in `public/`. No external fonts or runtime services are needed.

`.openai/hosting.json` records this website's private Sites deployment identity and static output directory. It contains no credentials.
