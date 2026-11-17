# K Shell website

## Restored split hero and terminal rotation

Latest user direction: restore the hero title on the left and the terminal on
the right, preserving the current terminal design and scroll rotation. Use the
existing headline, copy, actions, black-and-white colors, and TerminalDemo
component. Remove the particle wave from this hero composition.

Keep one mounted terminal. Restore the earlier measured scroll handoff into
the centered workspace dock, including its temporary roll, pitch, and yaw.
Both endpoints are flat, and pausing or advancing the demo survives the move.
Use the shared page gutters and a contained two-column desktop layout. Stack
below 1000px and use ordinary document flow for reduced motion. The terminal
is also visible in the hero before JavaScript initializes. No terminal skin or
demo behavior changes are part of this pass.
Craft process: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.

## Dedicated Features page

Remove the pictured two-column tool walkthrough from Home. Keep Home's short
feature summaries and link their Kpm and kreq actions to /features/. Add Features
to the main navigation and footer.

The Features page uses the existing black-and-white identity, interface font,
and monospace command font. A compact split introduction leads into a six-topic
feature explorer backed by the existing deterministic browser-shell examples.
Use one substantial console preview beside quiet selectors, rather than another
grid of identical cards. Kpm and kreq follow as two horizontal sections, each
with a compact task selector and one copyable command at a time. Keep the source
build requirement, placeholder API notice, and links to the full documentation.

Use page #fafafa/#080808, surface #f1f1f1/#121212, ink #171717/#f1f1f1,
secondary #626262/#a3a3a3, and quiet neutral rules. Stack on mobile, keep task
controls keyboard reachable, wrap commands, and respect reduced motion.
This supersedes the earlier homepage tool walkthrough direction below.

## Documentation handbook

The user explicitly requested a more substantial Docs redesign using unslop.
Use a compact, searchable topic rail; a large handbook opening; a readable
article; and a contextual contents rail on wide screens. Preserve the content,
section order, logo, monochrome palette, and existing interface/code typefaces.
Reduce repeated setup numbers to one sequence within the article. Make the
initial PowerShell command a dark console surface, with quieter command blocks
throughout the reference and open, indented response examples. Keep the run
location visible above every command. Long Kpm and kreq chapters get contextual
subheading links, consistent spacing, and a clear next-chapter link.

On narrow screens, retain the sticky topic menu, stack the article, wrap code,
and hide the secondary contents rail. Keep hover, keyboard focus, filtering,
copy feedback, and reduced-motion behavior. Use 4px spacing steps, 400/500 type
weights, 8px code corners, neutral hairlines, and three text roles.
Craft process: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.

## Clean feature section and tool walkthroughs

The latest direction keeps the black-and-white site and three-column feature
grid, with lighter framing: one rounded terminal preview above each description,
no enclosing card box, consistent 24px padding, and more space between rows.
Theme colors stay in the prompt and swatches against nearly neutral surfaces.
Keep the custom appearance dropdowns and their keyboard controls.

Follow the features with two practical Kpm and kreq walkthroughs. Use numbered
steps, short explanations, individually copyable commands, and links to the full
references. Clearly state the updated source-build requirement and mark example
API URLs as placeholders. Stack the guides on mobile and wrap long commands.
Use the existing Segoe UI interface family and Consolas/Cascadia code stack.
Core colors: page #080808, surface #101010, preview #151515, text #f1f1f1,
secondary #a3a3a3, and hairlines #ffffff17, with the existing light-mode tokens.
This supersedes the enclosing feature-card frames described below.

## Restored feature-card style

Restore the feature section's earlier three-column desktop grid, equal-sized
cards, 20px gaps, original rounded previews, type sizes and spacing. Keep its
current content and interactions. Two columns below 1050px and one below 650px
remain the original responsive behavior. This supersedes the two-large/four-small
feature arrangement; the latest hero and terminal directions remain in effect.

## Clean terminal and borderless hero

Latest user direction: simplify the terminal; adapt the hero from
https://www.pinterest.com/pin/349873464818734441/ while keeping the existing
black-and-white colors; explicitly remove the enclosing hero border/card frame.
Use its left copy, right visual, fine geometric linework and restrained scroll
marker on a continuous page canvas. The visual remains the real terminal, with
no invented protection features or reference-product branding.

Remove the terminal's command table, counters, secondary title strips and
decorative window dots. Keep one output area, current path, prompt, reset,
completion, history and theme controls. Page and terminal still support both
color modes. Header and hero use the same bounded container and fluid gutters.
Neither copy nor terminal is placed offscreen. Preserve one mounted session
during the scroll handoff and the static reduced-motion alternative.

This direction supersedes the earlier framed and trading-interface treatments.
Craft process: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.

## Contained desktop layout correction

The user's latest screenshot shows clipped copy and a terminal extending past the
screen. Supersede the offscreen 60vw placement with a real second grid column.
Header, copy, terminal source, landing and footer share a 20–64px fluid gutter
and the existing bounded desktop width. Center copy against the fully visible
terminal, constrain the headline to a readable two-line desktop size, and stack
below 1000px. Keep the dark terminal treatment, quiet code backdrop and measured
single-session scroll transition. Root horizontal clipping is defensive; neither
the headline nor the source panel relies on cropping to fit.

## Reference composition correction

The user rejected the editor-like interpretation and asked to look at the same
reference again. Match its composition: a flat panel emerging from the lower-right,
cropped by the viewport edge, with a small frame handle, a single compact app bar,
a context strip, command/result rows and a dense output area. Remove the file-tree
sidebar and the initial perspective tilt. A faint static field of shell commands
and binary text echoes the supplied background while retaining monochrome branding.

Desktop source geometry sits at 60vw and 42% down the hero, with a 760–1200px panel.
Only the starting preview is cropped. Native scrolling moves the same mounted
terminal to a fully contained, centered 1120px dock. Temporary rotation is confined
to the handoff; both endpoints are flat. Mobile and reduced motion retain a fully
visible ordinary-flow preview. Initial transcript rows come from four real sandbox
commands; command/result buttons recall actual input without executing it.

Browser verification: initial transform is identity, the page has no horizontal
overflow, and the landed panel is centered and contained. One prompt, its output,
and the unsubmitted input remain intact. This supersedes the file-sidebar treatment
below. Craft process: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.

## Compact terminal workspace

The supplied crop of the trading-platform preview now guides the terminal itself:
an almost-black panel, compact header and tabs, a narrow left column, fine neutral
dividers and dense working content. Keep the approved black-and-white branding.
Translate the reference's product structure into shell content: sample files on
the left, a bounded command transcript on the right, and Terminal, History and
Appearance controls above. Retain Windows caption glyphs and the actual K logo.

The file list comes from the demo session's current folder. Folder clicks run cd;
file clicks run cat against the browser sample filesystem. Recent commands refill
the prompt without running them. Display up to four transcript entries and scroll
to the newest output. Keep the sandbox label, completion, palette controls, reset,
stdin handling, keyboard history and previous/next feature controls available.

Use container queries against the terminal's own width: reduce the sidebar below
620px and hide it below 440px while keeping the prompt and feature tabs available.
The same mounted terminal keeps its input, output and theme during the measured
scroll handoff. Existing reduced-motion and page color-mode behavior remain.
Craft process: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.

## Trading-interface reference, monochrome adaptation

Reference: https://www.pinterest.com/pin/813392382764988113/ (QClay's trading
platform). The user approved its dark composition with black and white instead
of lime, and explicitly retained the terminal's existing scroll movement.

Audit: the hero left excess space around a comparatively small headline;
terminal labels dropped below 11px; control radii and gaps were inconsistent;
the feature grid gave every capability the same emphasis; the main headline
did not name Windows. The working terminal, supplied logo and neutral palette
were already appropriate. This is a focused reference adaptation, not a new
product identity.

Product: a native Windows shell for developers.
Character: precise, technical, direct.
World: black console surfaces, white type, fine gray borders.
Moments: the live command window beside the headline and its centered landing.
Signature: one uninterrupted prompt and command session throughout the scroll.

Passes, in order:
1. Spacing: 4px rhythm, bounded hero height, matching 96px section spacing and
   facts separated from the primary actions.
2. Color: #080808 canvas, #101010 surfaces, #f1f1f1 primary text, #a3a3a3
   supporting text and white hairlines. Use this ramp through the full homepage.
   Dark is the initial site mode, while explicit saved light choices remain valid.
3. Icons: retain the supplied artwork and existing line icons; no new decoration.
4. Copy: lead with Windows, at your command; remove terminal punctuation from
   short headings; retain real commands, installation details and all six features.
5. Type: Segoe UI and Consolas, 400/500 weights, larger command and caption text.
6. Layout: left headline, right terminal, two lead feature panels above four
   compact panels. Preserve section order and fluid 27-inch sizing.
7. Details: squared 8px controls, 12px cards, 4px inner preview corners, visible
   focus and quiet surface changes.
8. Visuals: the actual browser terminal is the product visual. No generated
   scene is needed for this reference, and no image prompt was written.
9. Motion: preserve the requested single-terminal rotation, reversible scroll
   journey, command state and reduced-motion fallback. Arrival copy follows the
   landing. Resolve native scroll padding and margin when measuring the endpoint
   so the Follow the prompt anchor also completes the journey.

Craft process: unslop by Damir Sokolovsky (@heydamir), CC BY 4.0.

## Large desktop displays

For 27-inch displays, grow the shared container smoothly from 1200px at a
1440px viewport to a 1440px maximum at 1920px and above. Keep the existing
paper #fff, ink #171717, muted #686868, line #e1e1e1 and dark #080808 palette,
Segoe UI interface type and Consolas command type. The desktop composition
stays `[left title and actions | right working terminal]`, followed by the
centered terminal landing. Scale the hero height with the viewport, bounded
between 640px and 900px, and grow its headline and landing terminal in proportion.
Retain compact layouts for short screens and existing mobile breakpoints.
The Playground fills the viewport below the navbar, with output scrolling
inside its terminal. Preserve readable documentation line lengths and the
existing theme, focus and reduced-motion behavior.

## Compact navbar

Use a consistent 56px header on desktop and 52px on mobile, including Home.
The header wordmark is 96px wide on desktop and 88px on mobile; footer branding
keeps its existing size. Navigation text is 14px. Theme and GitHub controls use
32px heights on desktop and 36px on mobile. Shared header-height offsets keep
the mobile menu, documentation anchors, and Playground aligned with the bar.

## Supplied K Shell wordmark — November 15, 2026

The supplied complete K/lightning and custom italic Shell lettering supersede
earlier logo directions below. Preserve the original PNG in public/kshell-logo.png.
Use the complete artwork in the shared header and footer, with no additional
typeset Shell label. Use only the K from that same image in compact terminal,
About, documentation, and Playground locations. Inline SVG luminance masks
remove the image's black canvas and inherit the surrounding foreground color.
Keep the original proportions, including the lower lightning tip. Header artwork
fits within the existing navigation height and shrinks at narrow widths.

Browser SVG icons use the same source pixels and adapt to the browser color
scheme. The six-size ICO fallback uses a white K on a neutral dark tile.
Regenerate these assets with node scripts/update-brand-assets.mjs after an
authorized source-artwork change.

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

## Collection packets and arrival title

Refine the technology collection into compact icon-and-caption packets. Stagger their arrivals along fine monochrome connector paths, merge them at the terminal prompt, and finish with a brief intake check and terminal-frame pulse. Pause/resume and replay control all packet, path, and confirmation motion together.

The workspace heading stays visually hidden, with its layout space reserved, while the terminal travels. Once the existing terminal-location state reaches workspace, reveal the heading after 120ms, then the subtitle after 260ms and the workspace link after 380ms. Reverse scrolling hides the copy again. The terminal stays mounted through the sequence, and the static reduced-motion fallback remains available.

Remove the homepage's large logo and “For the love of the command line” story teaser, as requested from the supplied screenshot. The homepage now proceeds from installation directly to the shared footer; the About route and navigation remain available.

## Documentation polish

Approved direction: K Shell installation and configuration for Windows users; precise, calm, practical. Keep the monochrome terminal workspace, existing theme preview, and `›` prompt signature. This is a focused polish pass guided by unslop by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.

Audit: the Appearance navigation row wrapped to 56px while adjacent rows measured 36px; numbered steps repeated their labels above the headings; the mobile introduction delayed the first command. Mobile topic jumps also needed clearance beneath both sticky navigation bars.

| Pass | Result |
| --- | --- |
| Spacing | A 256px desktop sidebar and shorter topic labels keep all 11 rows at 36px. Mobile introductory gaps use 8, 12, 16, and 32px steps. |
| Color | Retained the existing neutral palette and light/dark surfaces. |
| Icons | Retained the existing line icons; removed the unnecessary boxes around sidebar step numbers. |
| Copy | Shortened the introduction, installation instruction, and navigation labels while retaining search terms. |
| Type | Kept Segoe UI and Consolas; step numbers use tabular figures. |
| Layout | One heading per step replaces the repeated eyebrow label. Number markers align with headings on desktop and mobile. |
| Details | Mobile topic anchors clear the header and topic bar; existing search, copy controls, and configuration remain interactive. |
| Visuals | Retained the shell appearance preview and actual command examples. |
| Motion | Sidebar hover feedback uses the skill's shared easing curve; reduced-motion support remains in place. |

Validation: targeted ESLint and production export with TypeScript pass. Browser checks confirm no horizontal overflow at measured widths of 320, 390, 800, and 1440px; consistent desktop navigation rows; appearance-topic search; mobile menu closure and heading clearance after navigation; installation command copying; synchronized session and startup commands after switching a palette. No browser console errors were observed. No generated imagery was needed.

## Current hero: a flowing particle surface

This revision replaces the terminal scroll handoff with the requested particle wave. Keep K Shell's existing Segoe UI typography, supplied wordmark, product copy and CTA destinations. Desktop pairs left-aligned copy with a broad wave on the right; mobile places the wave below the copy. Keep the surrounding site in its existing light/dark palette.

Hero tokens: navy #080F20, orange #FF9A45, coral #FF6B62, white #F9FAFC, muted text #ACB7CB. The white install button remains the strongest control. The particle surface is the one expressive element: no wireframe edges, extra floating objects, or ornamental labels. The functioning terminal stays centered in the next section.

Render one point cloud with BufferGeometry and GLSL sine deformation through React Three Fiber. Stable attributes hold positions, sizes and colors; frame updates change time and damped pointer uniforms only. Soft circular cores and small halos provide depth without a postprocessing bloom pass. Cap DPR at 1.5 (1.25 on mobile), lower mobile density, and suspend continuous frames while paused, offscreen or hidden. Demand frames keep a paused surface visible during resize. Reduced-motion sessions load the static SVG without the rendering engine. Context loss, shader compilation or renderer failures also show that fallback. Regenerate the static artwork with node scripts/generate-particle-wave.mjs.

Light-mode follow-up: use #F7F9FC for the hero surface and #142139 for text and primary controls, with muted text #526177. Deepen wave colors to #C75A1E, #C44248 and #53627A, switching from additive to normal alpha blending so particles remain visible on the pale background. Use the existing page theme event to update the canvas in place, preserving pause state and motion. The SVG fallback receives a CSS brightness/saturation adjustment in light mode. Dark-mode tokens remain in place. Browser checks cover light/dark switching while paused and the 390px mobile layout, with no overflow or console errors.

## Scroll-driven wave-to-terminal formation

Keep the centered hero and its existing colors. A single point cloud moves from the hero bounds to the actual terminal bounds using measured scroll progress. The shader first pitches the wave downward, then interpolates its projected points into a flat terminal frame, header controls, and sampled command glyphs. The same mounted DOM terminal fades in only after the dots gather; reversing scroll reverses the formation without losing command state. Keep hidden controls inert until the reveal. Suspend continuous GPU frames once the terminal is formed. Without WebGL, with renderer failure, or with reduced motion, use the static wave and a directly available terminal. Browser checks confirm intermediate particle formation, completed terminal command execution, reverse-scroll state retention, mobile light mode, and no console errors or horizontal overflow.

## Automatic home terminal feature tour

The home terminal is now a read-only presentation. Render typed commands as text, with no input, form, editing handler or run button. Eight scenes cover completion, navigation, file tools, syntax colors, history, appearance, KPM and kreq. Resolve supported examples against the existing isolated browser shell engine. Native source-build KPM/kreq scenes show labelled example output and link to their documentation; no tool installation or HTTP request runs. Start playback only when the terminal is visible and the particle formation has revealed it. Preserve playback through reverse scroll, pause offscreen and in hidden tabs, and provide pause/resume, next-feature and restart controls. Reduced-motion mode shows complete static examples. Keep the Playground interactive and direct users there for typing. Browser verification confirms automatic results, zero editable home fields, source-build labelling, 390px light-mode layout without overflow, and successful typed command execution in the separate Playground.
