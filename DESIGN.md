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

Feature section redesign: use a horizontal six-feature rail above a split explanation and terminal stage. Preserve the paper/ink/slate/blue palette, Segoe UI and Consolas, with mint confined to terminal prompts and valid syntax. Keep the command preview as the focal point, reduce empty space, and give each capability a concrete browser-local interaction. On small screens, the rail becomes a three-column grid and the content stacks. Tab navigation supports Left/Right, Home and End; previews never execute system commands. Terminal themes and page color modes remain independent. Use scoped CSS for this section to avoid the previous global typography overrides.

Feature section version two (retained alternative): show all six capabilities without switching tabs. Lead with the completion terminal and an independent theme picker, then use compact history, syntax and native-tools previews. A full-width command example closes the section. Keep the existing logo untouched, use the established Segoe UI/Consolas typography and blue palette, and confine violet/teal to the theme samples. The homepage uses the restored first version, FeatureExplorer; FeatureShowcase and its scoped styles retain the second version. Search, completion acceptance, theme selection and command examples run only in the browser. Stack the cards on mobile and retain visible focus states.

Installation section, clean version: center the introduction above one wide PowerShell command panel, with a compact Copy command control. Remove window chrome, numbered columns, and the enclosing setup card. Follow with a quiet launch row and two text links for the guide and portable releases. Keep the canonical INSTALL_COMMAND, independent copy controls, accessible feedback, existing logo, and shared palette. Use scoped styles, readable wrapped commands, and a stacked launch row on mobile. No command executes in the browser.

Logo artwork: the authoritative logo is the full K-shaped mark with a terminal panel, supplied in public/kshell-logo-k.png. Keep that original image unchanged. public/kshell-logo-k-mask.svg embeds its original pixels, reverses luminance for the mask, and frames the full mark at source coordinates 290 362 with a 695 by 532 viewport. Preserve the complete K silhouette and terminal cutout without tracing or generation. The shared Logo uses the surrounding foreground color for contrast in each theme. public/kshell-icon-k.svg is the matching browser icon, with light/dark colors. Earlier prompt-only logo files are superseded.

Header controls: use a compact sun/moon selector with an explicit selected state and a matching pill-shaped GitHub link. Preserve theme persistence, accessible names, native tooltips and visible keyboard focus. On mobile, keep the GitHub link available as an icon button alongside the theme switch and menu. Use scoped header-controls.module.css to avoid legacy header-control overrides; respect reduced-motion preferences.

Playground: add /playground/ to the main and footer navigation. Use a large browser terminal paired with grouped clickable examples, with the terminal first on mobile. Preserve the existing logo, Segoe UI/Consolas typography, and shared light/dark palette; Ocean/Dusk/Midnight are independent terminal accents. Model a bounded in-memory sample filesystem and history with a pure TypeScript command engine; do not execute host commands or claim to run the Rust binary. Support quoted Windows paths, editing sample files, navigation, Tab completion, Up/Down recall, Ctrl L clearing, and full session reset. Keep the simulation scope explicit and provide links to the real command reference and installation guide. Validate behavior with the Node tests in app/playground/shell.test.mjs and a production static export.

## Playground terminal-only polish

Direction: K Shell's browser command workspace; quiet, precise, practical; a Windows terminal; command output as the visual focus; the path and mint prompt as its signature. The approved layout keeps the navbar and uses the remaining viewport for one terminal.

Audit: the hero and install link delayed access to the prompt; the examples sidebar duplicated help; instructions and the global footer extended the page; 10px captions and arbitrary spacing weakened readability; saturated terminal backgrounds and a shadow competed with output. This was a focused polish with the user's explicit terminal-only layout reduction.

1. Spacing: use 24px page and output padding on desktop, 16px output padding on mobile, and 4px-based control spacing.
2. Color: keep the established page themes; make terminal surfaces neutral, with palette changes confined to the path/accent and semantic prompt/error colors.
3. Icons: keep the supplied K logo and one 16px reset icon; remove decorative folder, sidebar and status icons.
4. Copy: replace the hero and greeting with Playground and a single help hint; retain a short browser-sandbox label and accessible scope description.
5. Type: keep Segoe UI and Consolas, use 16px command/input text and 14px output, and remove tiny toolbar captions.
6. Layout: remove the heading, examples, installation CTA and site footer on this route; size the terminal to the viewport below the navbar and scroll only the output.
7. Details: use a native theme selector, compact reset button, internal shortcut strip, bounded completion feedback and visible focus states.
8. Visuals: the working terminal is the product view; no generated imagery or image prompt was needed. The original logo remains intact.
9. Motion: retain immediate command feedback and output scrolling; add no entrance animation or looping motion.

Guided by [unslop](https://heydamir.design/unslop) by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.

### Navbar alignment and command coverage

Keep the approved direction: a browser command workspace for trying K Shell; quiet, precise, practical; the Windows terminal as its world; command output as its focal moment; the path and mint prompt as its signature. This is a focused spacing and behavior pass. The terminal's independent width and horizontal padding broke alignment with the shared navbar; it now uses the same responsive `.container`, retaining 24/16/8px vertical page padding. Neutral surfaces, brand artwork, typography and motion remain consistent with the terminal-only design.

Match the 27 built-in names from the adjacent Rust command registry in the browser engine, including file-operation aliases, recursive copy/delete, rename, hidden/depth-aware trees, text input for cat, theme icon/suggestion settings, and exit/reset. Complete commands, paths and nested theme settings, cycle ambiguous matches with Tab, and show inline suggestions. Keep file mutations bounded and atomic on errors. Provide touch-accessible Finish input and Cancel controls during cat input. Clearly identify browser adaptations: open previews sample text, sysinfo/specs report workspace data, and Nerd icons use text labels. No host files, Windows apps or external programs are accessed.

Validation: 48 command tests, ESLint, TypeScript and static export pass. Browser checks cover file operations, completion, typed input, exit/reset, desktop dark mode and mobile light mode. At 1440px the navbar and terminal both begin at 120px and are 1200px wide; at 390px both begin at 20px with the same width. Both layouts fit the viewport without page overflow. No imagery, new animation or image prompt was required.

## Home hero: split copy and an ink-black terminal

Direction: technical, calm, exact; a Windows developer's desk with paper-white surfaces and an ink-black terminal; the actual shell is the only rich element, and the `›` prompt is the signature.

Audit: the centered stack, pill announcement, dotted grid, orbit, corner marks and two tilted callouts were decorative and duplicated the terminal's completion and theme states. The hero was 1,020px tall; the terminal began at y=565, so the lower controls sat below the fold on a 900px screen. The 78px/650 headline tracked to -4.2px. In light mode the terminal became a pale surface, losing the ink-black anchor from the first design review.

1. Spacing: 72/80px hero padding, 40–64px split gap, 28px between copy and actions, 20px to the platform line; stacked at 1100px with 56/64px padding and mobile at 40/36px.
2. Color: one quiet hero band (`--hero-canvas`) with a hairline bottom edge; remove the pattern, orbit and tinted shadow. The terminal is ink-black in both page modes using the existing dark Ocean/Dusk/Midnight tokens.
3. Icons: remove the status pill, sparkle, corner marks, theme swatches and the logo inside the primary button. Keep the arrow, the terminal chrome and the K mark at product scale.
4. Copy: “A familiar shell / Built for Windows”; “Install K Shell” and “Explore features”; platform line “Windows 10/11 x64 · No WSL · Open source”.
5. Type: 56px/500 headline with -0.03em tracking, 18px/1.65 subhead, 13px platform line; mobile 38px/16px/12px.
6. Layout: copy left and terminal right inside the 1200px container; stack below 1100px; keep the copy at 640px and the terminal full width when stacked.
7. Details: 10px terminal radius, neutral shadow, terminal tabs and input retained; hide repeated paths, the tip, welcome subtitle and decorative window controls on mobile.
8. Visuals: no generated imagery. The interactive terminal is the product view; completion, history and theme states are real browser-local interactions.
9. Motion: one 450ms fade/rise with a 60ms stagger; remove rotate, scale and callout arrivals; keep the pausable demo, cursor and reduced-motion behavior.

Validation: ESLint, TypeScript and static export pass. Browser checks cover 1440 and 390 in both themes, plus 1100 for the stacked layout; no horizontal overflow. At 1440 the hero is 580px tall and the terminal is fully visible; at 390 the hero is 695px tall and the prompt, input and tabs fit the first screen.

## Documentation guide polish

Direction: keep the approved documentation direction — quiet, exact, reassuring; paper and ink around a Windows terminal; the appearance preview is the one product moment, and the `›` prompt is the signature.

The guide already had the right structure. This is a clean-UI pass, not a rewrite of the article:
- Replace the three-stage route (Install / Personalize / Get to work) with the actual five guide steps. It now matches the copy, the sidebar and the numbered rail, and works as a quick overview when the mobile sidebar is collapsed.
- Use one `Arrow` for every “Next” link instead of mixing the logo, palette and check icons.
- Remove the 28px logo from the prompt sample; the card is clearer with just the path and prompt.
- Change the search placeholder to “Search topics”.
- Strengthen the selected sidebar row to `--surface-hover`, keeping the 2px accent rail, so selection reads above hover and apart from the code surface.
- Keep the article width, type scale, spacing, code blocks, appearance preview and dark mode unchanged.

Validation: ESLint and static export pass. Browser checks cover 1440 in light and dark, and 390 in light; no horizontal overflow. The five-step route fits one line at 1440 and uses a 3 + 2 grid at 390. All “Next” links share the same 16px arrow.

## Prompt-mark logo lockup

The supplied `public/icon.svg` is now the brand mark: the `>_` prompt glyph, cropped tightly without the previous rounded-square tile. The shared `Logo` recreates it as a single-color vector so it inherits the surrounding foreground color and stays crisp in both themes and at every size. The header and footer pair the mark with the “K Shell” wordmark in the established brand type; other logo placements remain mark-only. The browser icon is a lightweight vector copy of the same mark, with a dark rounded-tile ICO fallback for browsers without SVG icon support. The mark keeps its 315:226 proportions, sized 46×33 in the header and footer.

Validation: ESLint and the static export pass. Browser checks cover 1440 and 390 in light and dark; the header lockup fits without overflow and the footer, docs guide footer, terminal tabs and playground title render the mark correctly.

## Home: inset stage and Dusk terminal

Reference: https://www.pinterest.com/pin/737183032790531550/. The user approved the direction before implementation. The pin's poster was available; its sign-in overlay prevented full verification of the video, so motion is an adaptation rather than an exact reproduction.

- Product: a native Windows shell for developers who want familiar commands
- Character: technical, deliberate, tactile
- World: an ink-black command workspace, with violet inside the terminal
- Moments: larger left-aligned type and a Dusk terminal that settles from perspective before typing
- Signature: the existing `>_` mark and command prompt

The existing page needed a light craft pass. Preserve its brand, features, content and section order. The user explicitly requested the reference's darker hero and violet visual.

1. Spacing: 24px outer inset, 64px desktop inner padding, 48px split gap, and 4px spacing steps. Reserve 96px for output so the scripted examples do not resize the window. Compact header controls below 360px to fix existing horizontal overflow.
2. Color: near-black stage, three neutral text roles and off-white action. Dusk carries the violet inside the product; Ocean and Midnight remain available through commands. The hero stays dark in both page modes.
3. Icons: keep the supplied prompt mark and existing line icons. Use 16px control icons, with no new decorative symbols.
4. Copy: retain the homepage message and actions. Replace the repeated terminal welcome slogan with “K Shell on Windows” and “Interactive command preview”. Build output explicitly identifies itself as a demo.
5. Type: retain the brand's Segoe family. Use a 48–64px, weight-400 desktop headline and 36–48px mobile headline; secondary headline lines use a quieter neutral.
6. Layout: an inset 1360px stage with an asymmetric split, stacking below 800px. The terminal stays fully interactive. All following sections remain in place.
7. Details: 20px stage, 12px window and 8px button radii; quiet hairlines, neutral shadow, visible keyboard focus and distinct selected examples.
8. Visuals: the real browser-local terminal provides the product moment. No generated assets, image prompt, new package or decorative cube was needed.
9. Motion: one 500ms perspective-to-flat entrance with the shared ease-out curve. Typing starts after 765ms, runs through three examples once, then stops. Pause/replay, stopping on user input and reduced-motion support remain available. The Themes example applies Dusk as well as showing its output.

Validation: ESLint, TypeScript and the production static export pass. Browser checks cover 1440px desktop, 800px tablet, and 390px/320px mobile, including light/dark page modes, command input, theme changes, example selection, replay and automatic stopping. No horizontal overflow remains at the checked sizes. Reduced-motion handling is retained in CSS and the existing media-query subscription.

Craft workflow: unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.

## Homepage: Windows, at your command

Product: a native Windows shell for developers. Character: technical, deliberate, tactile. World: a dark command workspace. Moments: the existing prompt mark constructed as a dimensional violet object, followed by a separate live terminal demonstration. Signature: the supplied `>_` silhouette, never an unrelated cube. The Pinterest reference informs the scale, open composition and dimensional entrance.

The homepage now uses a substantially different hierarchy: an oversized three-line headline and prompt sculpture lead the page, the interactive terminal has its own section below, features sit in an open demonstration area, installation uses two columns, and the closing brand section is enlarged. Section order and the six feature interactions remain intact. Light mode retains a dark hero and switches the supporting sections to the matching light neutral ramp.

1. Spacing: 48px desktop page edges, 64–80px hero padding, 48–80px component gaps and 96–112px section spacing. Mobile uses 20px edges and 40–64px section spacing.
2. Color: near-black `#0d0c11`, off-white `#eeebf3`, secondary `#a8a1b3`, neutral raised `#17141d`, and violet `#c0a6e4`. Rich violet stays in the prompt sculpture and actual terminal themes.
3. Icons: keep the existing prompt artwork and line icon set. Feature navigation becomes text rather than repeated decorative icon tiles.
4. Copy: “Windows, at your command” names the platform and use. Keep concrete native-shell, completion, history, theme and installation information.
5. Type: the hero scales from 80–116px desktop to 64–96px mobile, weight 400. Supporting section titles use 48–80px, with the established Segoe family retained.
6. Layout: full-width hero replaces the inset panel. The command demonstration moves below the main composition. Features lose their outer box and use an open tab rail. Installation places its headline beside the commands. Native compatibility and closing sections share this hierarchy.
7. Details: quiet hairlines, sparse rounded controls, readable command output, visible focus and all original demo controls. The object is built from the supplied vector, so there is no raster asset or image prompt.
8. Visual: three offset copies of the real prompt mark create a violet material with depth. It is the single prominent hero object and has room beside the text.
9. Motion: the prompt settles from a rotated position in one second. “Replay intro” makes the entrance reviewable. The terminal begins its pausable typing sequence only when at least 20% visible, stops offscreen and finishes after three examples. Reduced motion disables the entrance and automatic typing.

Validation: ESLint, TypeScript and the production export pass. Browser checks cover the changed headline, replay action, six-tab feature structure, completion acceptance, theme selection, launch-command copying, terminal input, and both page modes. Measured page widths fit 320px, 390px, 800px and desktop viewports with no horizontal overflow. Console error check is clear.

Design process: frontend-design and unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.

## Terminal collection and scroll journey

Reference: https://www.pinterest.com/pin/737183032790531550/ — a dark violet product stage, gathering objects, and feature cards. The terminal remains the product; the reference's security content is not reused.

Palette: stage #0c0a14, shell #1b1626, violet #bca4e3, text #f3effa, mint prompt #a4d5bd, paper #f7f6f9. Segoe UI carries the headline and interface; Consolas carries actual commands. Keep the approved symbol plus Shell wordmark.

Layout: left-aligned terminal copy and a large terminal on desktop; centered copy above a flat terminal on mobile. A short sticky section carries the same terminal down the page while the copy changes, then releases it before the three-column feature-card grid (two on tablet, one on mobile). Preserve ordinary browser scrolling.

Motion: Rust, Windows, Git, completion, history, and theme tiles gather into the terminal in one staggered sequence. Pause/resume and replay are separate from the working terminal demo's playback. Scroll changes the terminal's perspective and position, with one requestAnimationFrame update per scroll frame. Reduced-motion preferences show the completed terminal without the collection or sticky journey. No animation library or raster imagery is needed.

Critique: the previous oversized logo duplicated the branding and placed the actual terminal below the fold. The terminal now anchors the hero. A generic icon-only card grid would repeat the tool tiles; the cards instead use command previews with working completion, history, and theme controls. Preserve native Windows claims and browser-simulation boundaries.

## Black-and-white platform branding

User direction: the platform uses black and white. This supersedes the earlier violet treatment. Use actual neutral color values throughout Home, Docs, About, and Playground; do not apply a grayscale filter to the page. Keep transparent borders and gray tonal hierarchy in both light and dark modes.

Hero direction: a centered command workspace. Use pure black #000, white #fff, charcoal #151515, border #404040, and secondary text #a3a3a3. Retain Segoe UI for the interface and Consolas for commands. One broad headline sits above the actions and a straight, centered terminal; remove perspective, colored light, the orbit ring, and diagonal tool tiles. The gathering tiles move horizontally inward in neutral bordered rectangles. Keep the short scroll-following sequence and the interactive cards below it. Short mobile viewports use ordinary document flow so the terminal remains reachable; reduced motion remains static.

Critique: the old split layout gave decorative purple atmosphere more presence than the shell. The centered composition puts the usable terminal directly under the promise. Preserve the new symbol plus Shell branding and the terminal content. Neutralize the surrounding card and page surfaces for a consistent platform.

## Left title, right terminal, then center on scroll

User revision: begin the desktop hero with the title and actions left, and the terminal right. As the user scrolls, fade the first copy and move the same terminal downward into the horizontal center, widening it to 800px at most. Place the second heading above the centered terminal. Keep the black-and-white platform palette, collection controls, real browser preview, and feature cards.

Use a measured scene within the shared 1200px container. Interpolate its horizontal offset, width, and vertical position from scroll progress with a smooth easing curve, updating in one animation frame without remounting the terminal or losing its input. On narrow screens, retain a readable vertical stack. Short mobile viewports and reduced-motion preferences use normal document flow.

## Rotate the terminal into the next section

User correction: the terminal must leave the hero, rotate across the boundary, and land in the next section. Replace the extended sticky hero with a normal viewport-height hero and a distinct workspace section below it. Keep the left-hand title and initial right-hand terminal, then place the landed terminal centrally below the workspace heading and above the existing feature cards.

Mount one terminal scene as a sibling of both sections within a shared positioned wrapper. Measure its source anchor and destination dock, interpolate their document coordinates and width with scroll progress, and apply a temporary roll/pitch/yaw that returns to zero on landing. Do not duplicate or remount the terminal; commands, input, and selected theme persist. The receiving dock reserves layout space, and the terminal's geometry is wholly inside that next section after landing. The transition reverses naturally with upward scrolling. Retain the monochrome palette, mobile handoff, collection playback controls, and static reduced-motion fallback.

Verification: one live terminal before and after the handoff; an echo command remains in its output; rotation is nonzero while crossing the section boundary and zero when landed; final terminal bounds are outside the hero and inside the receiving section, centered on its container.
