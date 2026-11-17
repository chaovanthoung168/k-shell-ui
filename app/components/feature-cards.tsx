"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow, Icon } from "./ui";
import { ChoiceSelect } from "./choice-select";
import styles from "./feature-cards.module.css";

export function FeatureCards() {
  const [completed, setCompleted] = useState(false);
  const [theme, setTheme] = useState("Ocean");
  const [icons, setIcons] = useState("unicode");
  const [suggestions, setSuggestions] = useState("soft");
  return (
    <section className={`container ${styles.section}`} id="features" aria-labelledby="features-heading">
      <div className={styles.heading}><h2 id="features-heading">Familiar commands<br />Fewer interruptions</h2><p>Completion, custom themes, and developer tools.<br />All within reach of the prompt.</p></div>
      <div className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.visual}><span className={styles.path}>~\projects\k-shell</span><div className={styles.command}><b>›</b><code>cargo bu<span className={completed ? undefined : styles.ghost}>ild --release</span></code></div><button className={styles.keyAction} disabled={completed} onClick={() => setCompleted(true)}><kbd>{completed ? "✓" : "Tab"}</kbd>{completed ? "Suggestion accepted" : "Accept suggestion"}</button></div>
          <h3>Less typing, more doing</h3><p>Commands, paths, and remembered input. Let smart completion meet you halfway.</p><Link href="/docs/#shortcuts">Smart completion <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={`${styles.visual} ${styles.syntax}`}><span className={styles.path}>Read it before you run it</span><div className={styles.command}><b>›</b><code><span>echo</span> <em>&apos;hello, Windows&apos;</em></code></div><div className={styles.legend}><span><i />Locally valid</span><span><i />Argument</span></div></div>
          <h3>Clarity before Enter</h3><p>Read your command at a glance with syntax colors and helpful suggestions.</p><Link href="/docs/#shortcuts">Syntax highlighting <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={`${styles.visual} ${styles.toolVisual}`}>
            <span className={styles.path}>Source build · illustrative preview</span>
            <div className={styles.command}><b>›</b><code>kpm list</code></div>
            <div className={styles.toolList}><span>Node.js</span><span>Python</span><span>Go</span><span>Rust</span><span>PHP</span><span>Git</span><span>Java</span></div>
            <div className={styles.command}><b>›</b><code>kpm install node</code></div>
            <div className={styles.command}><b>›</b><code>kpm use node@22.15.0</code></div>
          </div>
          <h3>Manage your tools with Kpm</h3><p>Install developer tools and switch between managed versions, right from K Shell.</p><Link href="/features/#kpm-guide">How to use Kpm <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={`${styles.visual} ${styles.files}`}><div className={styles.command}><b>›</b><code>ls</code></div><div className={styles.fileRow}><span>src/</span><span>tests/</span><span>docs/</span></div><div className={styles.fileRow}><span>Cargo.toml</span><span>README.md</span></div><div className={styles.commandList}>cd<span>cat</span>mkdir<span>tree</span></div></div>
          <h3>Old habits, new home</h3><p>Navigate with cd, explore with ls, and read with cat. Familiar commands on Windows.</p><Link href="/docs/#commands">Explore the commands <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={`${styles.visual} ${styles.themeVisual}`} data-palette={theme.toLowerCase()}>
            <div className={styles.appearancePreview} aria-live="polite" aria-label={`${theme} palette, ${icons} icons, ${suggestions} suggestions`}>
              <span className={styles.promptPath}>{icons !== "off" && <span aria-hidden="true">{icons === "nerd" ? <Icon name="folder" /> : "📁"}</span>}~\projects\k-shell</span>
              <div className={styles.command}><b>›</b><code>cargo bu<span className={styles.suggestion} data-style={suggestions}>ild --release</span></code></div>
            </div>
            <div className={styles.themeChoices} role="group" aria-label="Preview a color theme">{["Ocean", "Dusk", "Midnight"].map(item => <button type="button" key={item} aria-pressed={theme === item} onClick={() => setTheme(item)}><i data-palette={item.toLowerCase()} />{item}</button>)}</div>
            <div className={styles.customizeControls}>
              <div><span className={styles.controlLabel}>Icons</span><ChoiceSelect label="Icons" value={icons} onChange={setIcons} options={[
                { value: "unicode", label: "Unicode", description: "Built-in symbols", preview: <span>◇</span> },
                { value: "nerd", label: "Nerd Font", description: "Font-based icons", preview: <Icon name="folder" /> },
                { value: "off", label: "Off", description: "Just the path", preview: <span>~</span> },
              ]} /></div>
              <div><span className={styles.controlLabel}>Suggestions</span><ChoiceSelect label="Suggestions" value={suggestions} onChange={setSuggestions} options={[
                { value: "soft", label: "Soft", description: "Quiet, subtle text", preview: <span className={styles.styleSample} data-style="soft">Aa</span> },
                { value: "bold", label: "Bold", description: "A little more weight", preview: <span className={styles.styleSample} data-style="bold">Aa</span> },
                { value: "underline", label: "Underline", description: "A line beneath", preview: <span className={styles.styleSample} data-style="underline">Aa</span> },
              ]} /></div>
            </div>
          </div>
          <h3>Make the prompt yours</h3><p>Select a palette, icons, and suggestion style. Preview your choices, then try them in K Shell.</p><Link href="/docs/#customization">Customize your prompt <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={`${styles.visual} ${styles.toolVisual}`}>
            <span className={styles.path}>Source build · example response</span>
            <div className={styles.command}><b>›</b><code>kreq get &apos;https://api.example.com/users/1&apos; --json content</code></div>
            <pre className={styles.response}>{'StatusCode : 200 OK\nContent    : {\n  "id": 1,\n  "name": "John"\n}'}</pre>
          </div>
          <h3>HTTP requests with kreq</h3><p>Test APIs, inspect response headers, and format JSON with K Shell’s built-in HTTP client.</p><Link href="/features/#kreq-guide">How to use kreq <Arrow /></Link>
        </article>
      </div>
    </section>
  );
}
