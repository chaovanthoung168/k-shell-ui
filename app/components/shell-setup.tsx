"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";
import { Icon, Logo } from "./ui";

const themes = [
  { id: "ocean", name: "Ocean", description: "Cool blue, mint, and lavender." },
  { id: "dusk", name: "Dusk", description: "Warm violet with soft pink accents." },
  { id: "midnight", name: "Midnight", description: "Quiet cyan with muted sage." },
] as const;

export function ShellSetup() {
  const [theme, setTheme] = useState("midnight");
  const [icons, setIcons] = useState("unicode");
  const [suggestions, setSuggestions] = useState("soft");
  const sessionCommands = `theme ${theme}\ntheme icons ${icons}\ntheme suggestions ${suggestions}`;
  const startupCommand = `"%LOCALAPPDATA%\\Programs\\KShell\\kshell.exe" --theme ${theme} --icons ${icons} --suggestions ${suggestions}`;
  const environmentCommands = `[Environment]::SetEnvironmentVariable('KSHELL_THEME', '${theme}', 'User')\n[Environment]::SetEnvironmentVariable('KSHELL_ICONS', '${icons}', 'User')\n[Environment]::SetEnvironmentVariable('KSHELL_SUGGESTION_STYLE', '${suggestions}', 'User')`;
  return <>
    <section id="customization" className="guide-step" aria-labelledby="customization-title">
      <span className="guide-step-number" aria-label="Step 3">3</span>
      <header className="guide-section-heading"><span>Personalize</span><h2 id="customization-title">Choose your look.</h2><p>Start with a palette, then choose icons and suggestion styling. The preview updates as you explore.</p></header>
      <div className="shell-configurator">
        <fieldset className="guide-theme-picker"><legend>Color palette</legend><div>{themes.map(item => <label className={`guide-theme-option palette-${item.id}`} key={item.id}><input type="radio" name="shell-palette" value={item.id} checked={theme === item.id} onChange={() => setTheme(item.id)} /><span className="guide-theme-swatch" aria-hidden="true"><i /><i /><i /></span><span>{item.name}</span><Icon name="check" /></label>)}</div><p>{themes.find(item => item.id === theme)?.description}</p></fieldset>
        <div className={`guide-terminal palette-${theme}`} aria-label={`${theme} shell theme preview`}>
          <div className="guide-terminal-chrome"><span><Icon name="terminal" /> K Shell</span><span className="guide-window-controls" aria-hidden="true"><i /><i /><i /></span></div>
          <div className="guide-terminal-content"><p><span className="guide-prompt-path">{icons !== "off" && <span aria-hidden="true">⌁ </span>}C:\Users\you\projects</span></p><p><span className="guide-prompt">›</span> ls</p><div className="guide-file-list"><span className="guide-directory">{icons !== "off" && "▸ "}src</span><span>{icons !== "off" && "◇ "}Cargo.toml</span><span className="guide-document">{icons !== "off" && "◇ "}README.md</span></div><p><span className="guide-prompt">›</span> cargo <span className={`guide-suggestion suggestion-${suggestions}`}>build --release</span><span className="guide-caret" /></p><div className="guide-preview-caption"><span>Illustrative preview</span><span><kbd>Tab</kbd> accept suggestion</span></div></div>
        </div>
        <div className="guide-config-options"><label>Icons<select value={icons} onChange={event => setIcons(event.target.value)}><option value="unicode">Unicode — no special font</option><option value="nerd">Nerd Font icons</option><option value="off">Off</option></select></label><label>Suggestions<select value={suggestions} onChange={event => setSuggestions(event.target.value)}><option value="soft">Soft</option><option value="bold">Bold</option><option value="underline">Underline</option></select></label></div>
        {icons === "nerd" && <p className="guide-config-warning"><Icon name="palette" /> Install and select a Nerd Font Mono in your terminal first. This browser preview uses standard symbols.</p>}
      </div>
      <h3>Apply to your current session</h3><p>Copy these commands and run them <strong>one line at a time inside K Shell</strong>.</p><CodeBlock label="K Shell · run each line" code={sessionCommands} />
      <p className="guide-small">These commands last for this session. <code>theme</code> shows your current choices; <code>theme reset</code> restores Ocean, Unicode icons, and soft suggestions. Shell themes change text colors; your terminal controls its background and font.</p>
      <a className="guide-next" href="#startup">Next: keep this look for future sessions <Icon name="check" /></a>
    </section>
    <section id="startup" className="guide-step" aria-labelledby="startup-title">
      <span className="guide-step-number" aria-label="Step 4">4</span>
      <header className="guide-section-heading"><span>Configure startup</span><h2 id="startup-title">Make your preferences stick.</h2><p>Save your choices in the Windows Terminal profile. New K Shell tabs will start with your selected settings.</p></header>
      <ol className="guide-instructions"><li>Open Windows Terminal’s dropdown beside <strong>+</strong>, then choose <strong>Settings</strong>.</li><li>Under <strong>Profiles</strong>, select <strong>K Shell</strong> and open its <strong>Command line</strong> field.</li><li>Paste the command below, select <strong>Save</strong>, then open a new K Shell tab.</li></ol>
      <CodeBlock label="Windows Terminal · Command line field" code={startupCommand} />
      <p className="guide-small">This uses the standard install location. If you installed elsewhere, replace the quoted executable path with your own. The command stays in sync with the choices in step 3.</p>
      <div className="guide-note"><Icon name="sliders" /><div><strong>Adjust the terminal around your shell</strong><p>In the K Shell profile’s <strong>Appearance</strong> settings, choose your font, text size, and background. For a larger prompt, try a font size of 16. Select an installed Nerd Font Mono before enabling Nerd icons.</p></div></div>
      <details className="guide-details"><summary>Open K Shell by default in Windows Terminal</summary><div><p>Go to <strong>Settings → Startup → Default profile</strong>, choose <strong>K Shell</strong>, then select <strong>Save</strong>. This changes the profile used for new Terminal windows and tabs.</p><a className="guide-source-link" href="https://learn.microsoft.com/en-us/windows/terminal/customize-settings/startup" target="_blank" rel="noopener noreferrer">Windows Terminal startup reference</a></div></details>
      <details className="guide-details"><summary>Set defaults for launching kshell from other terminals</summary><div><p>Run these lines in <strong>PowerShell</strong> to save preferences for your Windows user account. Restart your terminal app, then launch <code>kshell</code>.</p><CodeBlock label="PowerShell · save user defaults" code={environmentCommands} /><p>Startup flags such as <code>--theme midnight</code> take priority over environment values. Update the Terminal profile above if it still opens with a different look. K Shell does not read a theme configuration file yet.</p></div></details>
      <p className="guide-small"><a className="guide-source-link" href="https://learn.microsoft.com/en-us/windows/terminal/customize-settings/profile-general" target="_blank" rel="noopener noreferrer">Windows Terminal profile reference</a></p>
      <a className="guide-next" href="#commands">Next: try your first commands <Logo /></a>
    </section>
  </>;
}
