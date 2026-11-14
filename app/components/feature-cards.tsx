"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow, Icon } from "./ui";
import styles from "./feature-cards.module.css";

export function FeatureCards() {
  const [completed, setCompleted] = useState(false);
  const [history, setHistory] = useState(0);
  const [theme, setTheme] = useState("Ocean");
  const commands = ["cargo build --release", "cd projects", "ls -la"];
  return (
    <section className={`container ${styles.section}`} id="features" aria-labelledby="features-heading">
      <div className={styles.heading}><h2 id="features-heading">Small details.<br />A better command line.</h2><p>Everything that just came together.<br />Built for the way you work.</p></div>
      <div className={styles.grid}>
        <article className={styles.card}>
          <div className={styles.visual}><span className={styles.path}>~\projects\k-shell</span><div className={styles.command}><b>›</b><code>cargo bu<span className={completed ? undefined : styles.ghost}>ild --release</span></code></div><button className={styles.keyAction} disabled={completed} onClick={() => setCompleted(true)}><kbd>{completed ? "✓" : "Tab"}</kbd>{completed ? "Suggestion accepted" : "Accept suggestion"}</button></div>
          <h3>Less typing. More doing.</h3><p>Commands, paths, and remembered input. Let smart completion meet you halfway.</p><Link href="/docs/#shortcuts">Smart completion <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={`${styles.visual} ${styles.syntax}`}><span className={styles.path}>Read it before you run it</span><div className={styles.command}><b>›</b><code><span>echo</span> <em>&apos;hello, Windows&apos;</em></code></div><div className={styles.legend}><span><i />Locally valid</span><span><i />Argument</span></div></div>
          <h3>Clarity before Enter.</h3><p>Read your command at a glance with syntax colors and helpful suggestions.</p><Link href="/docs/#shortcuts">Syntax highlighting <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={styles.visual}><div className={styles.history} aria-live="polite">{commands.map((command, i) => <div key={command} data-active={history === i}><span>{i + 1}</span><code>{command}</code></div>)}</div><button className={styles.keyAction} onClick={() => setHistory(value => (value + 1) % commands.length)}><kbd>↑</kbd>Recall a command</button></div>
          <h3>Pick up where you left off.</h3><p>Keep your history between sessions. Find the command you need and run with it.</p><Link href="/docs/#shortcuts">Persistent history <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={`${styles.visual} ${styles.files}`}><div className={styles.command}><b>›</b><code>ls</code></div><div className={styles.fileRow}><span>src/</span><span>tests/</span><span>docs/</span></div><div className={styles.fileRow}><span>Cargo.toml</span><span>README.md</span></div><div className={styles.commandList}>cd<span>cat</span>mkdir<span>tree</span></div></div>
          <h3>Old habits. New home.</h3><p>Navigate with cd, explore with ls, and read with cat. Familiar commands on Windows.</p><Link href="/docs/#commands">Explore the commands <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={`${styles.visual} ${styles.themeVisual}`} data-palette={theme.toLowerCase()}><div className={styles.command}><b>›</b><code>theme {theme.toLowerCase()}</code></div><span className={styles.themeCaption}>Your prompt. Your atmosphere.</span><div className={styles.themeChoices} role="group" aria-label="Preview a color theme">{["Ocean", "Dusk", "Midnight"].map(item => <button key={item} aria-pressed={theme === item} onClick={() => setTheme(item)}><i data-palette={item.toLowerCase()} />{item}</button>)}</div></div>
          <h3>Make the prompt yours.</h3><p>Choose a theme, then fine-tune your icons and suggestion style to feel at home.</p><Link href="/docs/#customization">Personal themes <Arrow /></Link>
        </article>
        <article className={styles.card}>
          <div className={`${styles.visual} ${styles.native}`}><Icon name="windows" /><div className={styles.nativeTools}><span>Git</span><span>Cargo</span><span>Python</span><span>npm</span><span>VS Code</span></div><span className={styles.nativeCaption}>Your installed tools. Running natively.</span></div>
          <h3>Windows, all the way.</h3><p>Bring your installed developer tools. A native Rust shell, with no WSL required.</p><Link href="/docs/#commands">Native tools <Arrow /></Link>
        </article>
      </div>
    </section>
  );
}
