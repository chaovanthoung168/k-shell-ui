# K Shell website

The terminal prompt in the supplied image is the brand anchor. A spacious, light developer website surrounds an ink-black interactive terminal, making the shell experience the focus.

Palette: paper #ffffff, ink #16181c, slate #626976, line #e8eaee, blue #3b69da, terminal #171a21. Blue relates to the shell's Ocean theme; syntax colors are confined to code examples.

Typography: Segoe UI Variable / Segoe UI for the Windows-native voice; Consolas for commands. A large, tightly spaced headline contrasts with quiet readable body copy.

Layout: a centered, oversized two-line headline leads into a wide terminal stage, with small contextual callouts for completion and themes. A single entrance sequence introduces the stage; a pausable typewriter demonstrates actual commands. An interactive feature explorer pairs six capabilities with specific previews. Docs retain their sticky sidebar and readable article column.

Theme system: paper #ffffff, ink #16181c, slate #626976, blue #3b69da in light mode; canvas #101216, surface #181c23, text #edf1f7, slate #a0a9b9, blue #9bb9ff in dark mode. The shared header provides a persistent toggle, using the OS preference until the visitor makes a choice. Initialize the theme before hydration to avoid a light flash.

Redesign review: the actual terminal remains the visual centerpiece. Use meaningful command snippets rather than ornamental technology badges. Avoid a constantly moving background; motion belongs to the command demo and can be paused, with reduced-motion preferences respected. Keep all three pages legible in both modes.

Windows treatment: the demo uses a left-aligned Windows Terminal tab, a new-tab glyph, and right-aligned minimize/maximize/close caption glyphs. These are decorative window chrome inside the browser preview. No macOS traffic-light dots. The terminal surface follows the website color mode; Ocean, Dusk, and Midnight continue to select its accent palette. Explicit Light/Dark buttons remove ambiguity about the selected mode and avoid toggling from a stale hydration snapshot. Existing typography and the monochrome/blue palette remain unchanged.

Review: keep the reference's monochrome identity, avoid fabricated metrics, unavailable download links, or an invented GitHub repository. The terminal has browser-local interactions and is explicitly an illustrative preview. Current functionality and install steps follow ../myshell/README.md; scripting and pipes belong to the roadmap.

About redesign: retain paper/ink/slate/blue tokens and Segoe UI/Consolas. Pair a left-aligned mission headline with a native execution diagram rather than another terminal demo. Follow with the project story, a featured Rust foundation alongside expandable dependency notes, the actual build tools, and a current/future roadmap. Technology versions come from Cargo.toml and Cargo.lock; module roles come from the source and README. The distinctive element is the diagram connecting Rustyline, K Shell, and Windows. Keep everything else quiet, readable, and responsive in both color modes. Preserve #project and #roadmap links and add #technology and #architecture.
