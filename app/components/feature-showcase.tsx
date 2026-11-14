"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow, Icon, Logo } from "./ui";
import styles from "./feature-showcase.module.css";

const themes = ["Ocean", "Dusk", "Midnight"] as const;
const commandExamples = {
  ls: { command: "ls", output: "src/    tests/    Cargo.toml    README.md" },
  cd: { command: "cd src", output: "D:\\projects\\k-shell\\src" },
  cat: { command: "cat Cargo.toml", output: '[package]\nname = "kshell"\nversion = "0.1.1"' },
  tree: { command: "tree -L 2", output: "k-shell/\n├── src/\n│   └── main.rs\n└── Cargo.toml" },
};
const sampleHistory = ["cargo build --release", "git status", "cd projects", "ls -la"];

function FeatureLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className={styles.featureLink} href={`/docs/#${href}`}>{children}<Arrow /></Link>;
}

export function FeatureShowcase() {
  const [accepted, setAccepted] = useState(false);
  const [theme, setTheme] = useState<(typeof themes)[number]>("Ocean");
  const [query, setQuery] = useState("");
  const [recalled, setRecalled] = useState("");
  const [command, setCommand] = useState<keyof typeof commandExamples>("ls");
  const matches = sampleHistory.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className={`section container ${styles.section}`} id="features" aria-labelledby="features-heading">
      <header className={styles.heading}>
        <div><span className={styles.intro}>Made for life at the command line.</span><h2 id="features-heading">A little smarter.<br />At every prompt.</h2></div>
        <div className={styles.headingAside}><p>The details that make the work flow.<br />All together in one native Windows shell.</p><Link href="/docs/">Explore the documentation <Arrow /></Link></div>
      </header>

      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.completion}`} aria-labelledby="completion-title">
          <div className={styles.cardHeading}><Icon name="spark" /><span>Smart completion</span></div>
          <h3 id="completion-title">You start it.<br />K Shell helps finish it.</h3>
          <p>Commands, paths, and remembered input.<br className={styles.desktopBreak} /> A useful suggestion, right when you need it.</p>
          <div className={styles.completionTerminal}>
            <div className={styles.windowBar}><span><Logo /> K Shell</span><span>Command preview</span></div>
            <div className={styles.completionBody}>
              <span className={styles.path}>D:\projects\k-shell</span>
              <div className={styles.promptLine} aria-live="polite" aria-atomic="true"><span>›</span><code>cargo bu<span className={accepted ? styles.accepted : styles.ghost}>ild --release</span><i aria-hidden="true" /></code></div>
              <div className={styles.completionFooter}><span>{accepted ? "Yours to run." : "Your next command is a Tab away."}</span><button onClick={() => setAccepted((value) => !value)} aria-label={accepted ? "Reset completion preview" : "Accept completion suggestion"}>{accepted ? <><Icon name="check" /> Reset</> : <><kbd>Tab</kbd> Accept</>}</button></div>
            </div>
          </div>
          <FeatureLink href="shortcuts">Get to know completion</FeatureLink>
        </article>

        <article className={`${styles.card} ${styles.themes}`} aria-labelledby="themes-title">
          <div className={styles.cardHeading}><Icon name="sliders" /><span>Personal themes</span></div>
          <h3 id="themes-title">Set the mood.</h3>
          <p>Your colors. Your icons. Your kind of workspace.</p>
          <div className={`${styles.themePreview} ${styles[theme.toLowerCase()]}`}>
            <div className={styles.themePreviewBar}><Logo /><span>{theme}</span><span>kshell.exe</span></div>
            <div className={styles.themePreviewBody} aria-live="polite"><span>~\your-next-project</span><div><b>›</b> theme {theme.toLowerCase()}<i aria-hidden="true" /></div><p>Make yourself at home.</p></div>
          </div>
          <div className={styles.themeOptions} role="group" aria-label="Preview a shell theme">{themes.map((item) => <button key={item} className={styles[item.toLowerCase()]} aria-pressed={theme === item} onClick={() => setTheme(item)}><i />{item}{theme === item && <Icon name="check" />}</button>)}</div>
          <FeatureLink href="customization">Make it yours</FeatureLink>
        </article>

        <article className={`${styles.card} ${styles.history}`} aria-labelledby="history-title">
          <div className={styles.cardHeading}><Icon name="history" /><span>Persistent history</span></div>
          <h3 id="history-title">Been there. Run that.</h3>
          <p>Your commands stay with you.<br />Find a good one and use it again.</p>
          <div className={styles.historyPreview}>
            <label className={styles.search}><Icon name="search" /><input aria-label="Search example command history" placeholder="Find a command…" value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>Ctrl R</kbd></label>
            <div className={styles.historyMatches}>{matches.length ? matches.slice(0, 3).map((item) => <button key={item} onClick={() => setRecalled(item)} aria-pressed={recalled === item}><code>{item}</code>{recalled === item ? <Icon name="check" /> : <Arrow />}</button>) : <p>No match. Try “git” or “cargo”.</p>}</div>
            <div className={styles.recalled} aria-live="polite"><span>›</span><code>{recalled || "Select a command to recall it"}</code></div>
          </div>
          <FeatureLink href="shortcuts">Pick up where you left off</FeatureLink>
        </article>

        <article className={`${styles.card} ${styles.syntax}`} aria-labelledby="syntax-title">
          <div className={styles.cardHeading}><Icon name="palette" /><span>Syntax highlighting</span></div>
          <h3 id="syntax-title">Clarity, before Enter.</h3>
          <p>Read the suggestion. Spot a known mistake. Keep your next move clear.</p>
          <div className={styles.syntaxPreview}><code><span>›</span> <b>echo</b> <em>&apos;hello, world&apos;</em></code><div><span><i className={styles.valid} />Locally valid</span><span><i className={styles.error} />Known error</span><span><i className={styles.unverified} />Unverified argument</span></div></div>
          <FeatureLink href="shortcuts">Read your prompt</FeatureLink>
        </article>

        <article className={`${styles.card} ${styles.native}`} aria-labelledby="native-title">
          <div className={styles.cardHeading}><Icon name="windows" /><span>Native developer tools</span></div>
          <h3 id="native-title">Your tools come along.</h3>
          <p>Use your installed developer tools.<br />Stay right at home on Windows.</p>
          <div className={styles.tools}><span><Icon name="code" />Git</span><span><Icon name="rust" />Cargo</span><span><Icon name="terminal" />Python</span><span><Icon name="code" />npm</span></div>
          <div className={styles.nativeNote}><Icon name="check" /><span>Native Windows executable.<br />No WSL required.</span></div>
          <FeatureLink href="commands">Bring your workflow</FeatureLink>
        </article>
      </div>

      <article className={styles.commands} aria-labelledby="commands-title">
        <div className={styles.commandCopy}><div className={styles.cardHeading}><Icon name="terminal" /><span>Familiar commands</span></div><h3 id="commands-title">Same muscle memory.<br />New home.</h3><p>Linux-style essentials. Windows paths.</p><FeatureLink href="commands">Find your first command</FeatureLink></div>
        <div className={styles.commandDemo}><div className={styles.commandOptions} role="group" aria-label="Preview a familiar command">{(Object.keys(commandExamples) as (keyof typeof commandExamples)[]).map((item) => <button key={item} aria-pressed={command === item} onClick={() => setCommand(item)}>{item}</button>)}<span>Try a command</span></div><div className={styles.commandOutput} aria-live="polite" aria-atomic="true"><div><span>›</span> <code>{commandExamples[command].command}</code></div><pre>{commandExamples[command].output}</pre></div></div>
      </article>
      <div className={styles.footnote}><span><Icon name="rust" />Built with Rust. Designed for your everyday.</span><span>Interactive examples are illustrative previews.</span></div>
    </section>
  );
}
