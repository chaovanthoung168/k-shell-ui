"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";
import { Arrow, Icon } from "./ui";
import { ChoiceSelect } from "./choice-select";

const themes = [
  { id: "ocean", name: "Ocean", description: "Cool blue, mint, and lavender." },
  { id: "dusk", name: "Dusk", description: "Warm violet with soft pink accents." },
  { id: "midnight", name: "Midnight", description: "Quiet cyan with muted sage." },
] as const;

type FileKind = "folder" | "file" | "markdown" | "typescript" | "config";

// Vector equivalents keep the Nerd Font preview readable on browsers without
// that font installed. Unicode mode uses K Shell's actual fallback symbols.
function FileIcon({ kind, mode }: { kind: FileKind; mode: string }) {
  if (mode === "off") return null;
  if (mode === "unicode") {
    const glyphs: Record<FileKind, string> = { folder: "📁", file: "📄", markdown: "≡", typescript: "‹›", config: "⚙\uFE0E" };
    return <span className="guide-file-icon guide-unicode-icon" aria-hidden="true">{glyphs[kind]}</span>;
  }
  return <svg className="guide-file-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    {kind === "folder" && <path d="M2 5h7l2 2h11v13H2V5Z" />}
    {kind === "file" && <><path d="M5 2h9l5 5v15H5V2Z" /><path d="M14 2v6h5" fill="none" stroke="#202020" strokeWidth="1.2" /></>}
    {kind === "markdown" && <><rect x="1.5" y="5" width="21" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M5 15V9l3 3 3-3v6m6-6v6m-3-3 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.8" /></>}
    {kind === "typescript" && <text x="12" y="17" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700">TS</text>}
    {kind === "config" && <><path d="m10 2 4 0 .7 3 2 .9 2.7-1.4 2 3.5-2.3 2 .2 2.2 2.2 2-2 3.5-2.9-.9-1.8 1.3-.7 3h-4l-.7-3-2-1-2.7 1.4-2-3.5 2.3-2-.2-2.2-2.2-2 2-3.5L7.5 7l1.8-1.3L10 2Z" /><circle cx="12" cy="12" r="3.3" fill="#202020" /></>}
  </svg>;
}

export function ShellSetup() {
  const [theme, setTheme] = useState("midnight");
  const [icons, setIcons] = useState("nerd");
  const [suggestions, setSuggestions] = useState("soft");
  const sessionCommands = `theme ${theme}\ntheme icons ${icons}\ntheme suggestions ${suggestions}`;
  const startupCommand = `"%LOCALAPPDATA%\\Programs\\KShell\\kshell.exe" --theme ${theme} --icons ${icons} --suggestions ${suggestions}`;
  const environmentCommands = `[Environment]::SetEnvironmentVariable('KSHELL_THEME', '${theme}', 'User')\n[Environment]::SetEnvironmentVariable('KSHELL_ICONS', '${icons}', 'User')\n[Environment]::SetEnvironmentVariable('KSHELL_SUGGESTION_STYLE', '${suggestions}', 'User')`;
  return <>
    <section id="customization" className="guide-step" aria-labelledby="customization-title">
      <span className="guide-step-number" aria-label="Step 3">3</span>
      <header className="guide-section-heading"><h2 id="customization-title">Choose your appearance</h2><p>Install a prompt design, then choose a palette, icons, and suggestion style.</p></header>
      <h3 id="install-theme">Install a prompt theme</h3>
      <p>A fresh installation starts with the original <strong>default</strong> prompt. Optional designs are bundled with K Shell and install offline, without downloading scripts or fonts.</p>
      <ol className="guide-instructions">
        <li>Inside the installed <strong>K Shell</strong>, run <code>theme</code> to open the theme picker.</li>
        <li>Use <kbd>↑</kbd> and <kbd>↓</kbd> to preview a design: <strong>Powerline</strong>, <strong>Atomic</strong>, <strong>Bubblesline</strong>, <strong>Cert</strong>, or <strong>Negligible</strong>.</li>
        <li>Press <kbd>Enter</kbd> to install and activate your selection. It is saved automatically for future sessions. Press <kbd>Esc</kbd> or <kbd>Ctrl + C</kbd> to cancel.</li>
      </ol>
      <CodeBlock label="K Shell · open the theme picker" code="theme" />
      <details className="guide-details"><summary>Install a theme with commands instead</summary><div><p>Run each line inside K Shell. List the designs, install Atomic, then activate it:</p><CodeBlock label="K Shell · run each line" code={'theme list\ntheme install atomic\ntheme atomic\ntheme status'} /><p>Replace <code>atomic</code> in both commands with <code>powerline</code>, <code>bubblesline</code>, <code>cert</code>, or <code>negligible</code>. Installing makes a design available; activating it saves your prompt choice.</p></div></details>
      <p>To restore and save the original prompt, run <code>theme default</code>. Prompt selections are stored in <code>%APPDATA%\kshell</code> and survive upgrades. These installation commands require the installed shell; the browser Playground supports palette changes only.</p>
      <h3>Adjust colors, icons, and suggestions</h3>
      <p>Choose your settings below, check the illustrative preview, then copy the commands. These settings are separate from your installed prompt design.</p>
      <div className="shell-configurator">
        <fieldset className="guide-theme-picker"><legend>Color palette</legend><div>{themes.map(item => <label className={`guide-theme-option palette-${item.id}`} key={item.id}><input type="radio" name="shell-palette" value={item.id} checked={theme === item.id} onChange={() => setTheme(item.id)} /><span className="guide-theme-swatch" aria-hidden="true"><i /><i /><i /></span><span>{item.name}</span><Icon name="check" /></label>)}</div><p>{themes.find(item => item.id === theme)?.description}</p></fieldset>
        <div className={`guide-terminal palette-${theme}`} aria-label={`${theme} shell theme preview`}>
          <div className="guide-terminal-chrome"><span><Icon name="terminal" /> K Shell</span><span className="guide-window-controls" aria-hidden="true"><i /><i /><i /></span></div>
          <div className="guide-terminal-content"><p><span className="guide-prompt-path"><FileIcon kind="folder" mode={icons} />C:\Users\you\projects</span></p><p><span className="guide-prompt">›</span> ls</p><div className="guide-file-list"><span><FileIcon kind="markdown" mode={icons} />README.md</span><span className="guide-directory"><FileIcon kind="folder" mode={icons} />src</span><span className="guide-code-file"><FileIcon kind="typescript" mode={icons} />app.ts</span><span className="guide-config-file"><FileIcon kind="config" mode={icons} />Cargo.toml</span><span><FileIcon kind="file" mode={icons} />notes.txt</span></div><p><span className="guide-prompt">›</span> cargo <span className={`guide-suggestion suggestion-${suggestions}`}>build --release</span><span className="guide-caret" /></p><div className="guide-preview-caption"><span>Illustrative preview</span><span><kbd>Tab</kbd> accept suggestion</span></div></div>
        </div>
        <div className="guide-config-options"><div><span>Icons</span><ChoiceSelect label="Icons" value={icons} onChange={setIcons} options={[{ value: "unicode", label: "Unicode", description: "No special font needed" }, { value: "nerd", label: "Nerd Font", description: "Requires a compatible font" }, { value: "off", label: "Off", description: "Show filenames only" }]} /></div><div><span>Suggestions</span><ChoiceSelect label="Suggestions" value={suggestions} onChange={setSuggestions} options={[{ value: "soft", label: "Soft", description: "Subtle suggestion text" }, { value: "bold", label: "Bold", description: "Heavier suggestion text" }, { value: "underline", label: "Underline", description: "Underlined suggestion text" }]} /></div></div>
        <p className="guide-icon-default">The Windows Terminal installer selects Nerd Font icons when a compatible Nerd Font is installed, with Unicode as the fallback.</p>
        {icons === "nerd" && <p className="guide-config-warning"><Icon name="palette" /> Select an installed Nerd Font Mono in your terminal to display these file-type icons. Without one, choose Unicode above.</p>}
      </div>
      <h3>Apply to your current session</h3><p>Copy these commands and run them <strong>one line at a time inside K Shell</strong>.</p><CodeBlock label="K Shell · run each line" code={sessionCommands} />
      <p className="guide-small">Palette, icon, and suggestion changes last for this session. <code>theme status</code> shows your current choices; <code>theme reset</code> restores the default prompt, Ocean, Unicode icons, and soft suggestions for this session. Use <code>theme default</code> to save the original prompt for future sessions. Your terminal controls its background and font.</p>
      <a className="guide-next" href="#startup">Next: keep this look for future sessions <Arrow /></a>
    </section>
    <section id="startup" className="guide-step" aria-labelledby="startup-title">
      <span className="guide-step-number" aria-label="Step 4">4</span>
      <header className="guide-section-heading"><h2 id="startup-title">Save your preferences</h2><p>Your installed prompt choice is already saved. Save your palette, icons, and suggestion style in the Windows Terminal profile so new tabs use those settings too.</p></header>
      <ol className="guide-instructions"><li>Open Windows Terminal’s dropdown beside <strong>+</strong>, then choose <strong>Settings</strong>.</li><li>Under <strong>Profiles</strong>, select <strong>K Shell</strong> and open its <strong>Command line</strong> field.</li><li>Paste the command below, select <strong>Save</strong>, then open a new K Shell tab.</li></ol>
      <CodeBlock label="Windows Terminal · Command line field" code={startupCommand} />
      <p className="guide-small">This uses the standard install location. If you installed elsewhere, replace the quoted executable path with your own. The command stays in sync with the choices in step 3.</p>
      <div className="guide-note"><Icon name="sliders" /><div><strong>Adjust the terminal around your shell</strong><p>In the K Shell profile’s <strong>Appearance</strong> settings, choose your font, text size, and background. For a larger prompt, try a font size of 16. Select an installed Nerd Font Mono before enabling Nerd icons.</p></div></div>
      <details className="guide-details"><summary>Open K Shell by default in Windows Terminal</summary><div><p>Go to <strong>Settings → Startup → Default profile</strong>, choose <strong>K Shell</strong>, then select <strong>Save</strong>. This changes the profile used for new Terminal windows and tabs.</p><a className="guide-source-link" href="https://learn.microsoft.com/en-us/windows/terminal/customize-settings/startup" target="_blank" rel="noopener noreferrer">Windows Terminal startup reference</a></div></details>
      <details className="guide-details"><summary>Set defaults for launching kshell from other terminals</summary><div><p>Run these lines in <strong>PowerShell</strong> to save preferences for your Windows user account. Restart your terminal app, then launch <code>kshell</code>.</p><CodeBlock label="PowerShell · save user defaults" code={environmentCommands} /><p>Startup flags such as <code>--theme midnight</code> take priority over environment values. Update the Terminal profile above if it still opens with a different look. These values control the palette, icons, and suggestions; prompt designs are saved separately by the theme picker or <code>theme &lt;design&gt;</code>.</p></div></details>
      <p className="guide-small"><a className="guide-source-link" href="https://learn.microsoft.com/en-us/windows/terminal/customize-settings/profile-general" target="_blank" rel="noopener noreferrer">Windows Terminal profile reference</a></p>
      <a className="guide-next" href="#commands">Next: try your first commands <Arrow /></a>
    </section>
  </>;
}
