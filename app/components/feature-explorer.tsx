"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { Arrow, Icon, Logo } from "./ui";
import styles from "./feature-explorer.module.css";

const features = [
  { id: "completion", icon: "spark", label: "Smart completion", caption: "Less typing", title: "A few keystrokes.\nThe whole command.", text: "Start a command and let suggestions fill in the rest. Commands, paths, and remembered input stay within reach.", benefit: "Accept a suggestion with Tab.", link: "shortcuts", action: "Accept suggestion", key: "Tab" },
  { id: "colors", icon: "palette", label: "Syntax highlighting", caption: "More clarity", title: "Know your command\nbefore you run it.", text: "Color helps you read a suggestion at a glance: locally valid syntax, known errors, and arguments still to be verified.", benefit: "A little clarity before Enter.", link: "shortcuts", action: "Show syntax colors", key: "Preview" },
  { id: "history", icon: "history", label: "Persistent history", caption: "Pick up anywhere", title: "Good commands\nare worth keeping.", text: "Your previous commands stay with you between sessions. Recall recent input or search for the one you need.", benefit: "Search your history with Ctrl R.", link: "shortcuts", action: "Recall previous command", key: "↑" },
  { id: "commands", icon: "terminal", label: "Familiar commands", caption: "Feel at home", title: "The commands\nyou already reach for.", text: "Move with cd, explore with ls, and read with cat. Familiar Linux-style file commands that understand Windows paths.", benefit: "Keep your habits. Keep moving.", link: "commands", action: "Preview tree output", key: "Enter" },
  { id: "themes", icon: "sliders", label: "Personal themes", caption: "Make it yours", title: "Your prompt.\nYour atmosphere.", text: "Choose Ocean, Dusk, or Midnight, then fine-tune your icons and suggestion style. Find a prompt you feel at home in.", benefit: "Three themes. Your kind of workspace.", link: "customization", action: "", key: "" },
  { id: "native", icon: "windows", label: "Native tools", caption: "Built for Windows", title: "Your tools.\nRight where you work.", text: "Use your installed Git, Cargo, Python, and supported npm and VS Code setups from a native Windows shell.", benefit: "No Linux compatibility layer required.", link: "commands", action: "Preview Git status", key: "Enter" },
] as const;

type Feature = (typeof features)[number];
const themes = ["Ocean", "Dusk", "Midnight"] as const;

function FeatureDemo({ feature }: { feature: Feature }) {
  const [played, setPlayed] = useState(false);
  const [theme, setTheme] = useState<(typeof themes)[number]>("Ocean");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const history = ["cargo build --release", "cd projects", "ls -la"];

  function play() {
    setPlayed(true);
    if (feature.id === "history") setHistoryIndex((index) => (index + 1) % history.length);
  }

  let command = <><span>cargo bu</span><span className={styles.suggestion}>ild --release</span></>;
  let output = <div className={styles.completionNote}>A command you started.<br />A suggestion to finish it.</div>;

  switch (feature.id) {
    case "completion":
      if (played) command = <span>cargo build --release</span>;
      output = played
        ? <div className={styles.success}><Icon name="check" /> Suggestion accepted. Ready when you are.</div>
        : <div className={styles.suggestionRow}><Icon name="spark" /><code>cargo build --release</code><kbd>Tab</kbd></div>;
      break;
    case "colors":
      command = <><span className={played ? styles.syntaxValid : undefined}>echo</span>{" "}<span className={played ? styles.syntaxArgument : undefined}>&apos;hello, world&apos;</span></>;
      output = <div className={styles.syntaxLegend} data-active={played}><span><i />Locally valid</span><span><i />Known error</span><span><i />Unverified argument</span></div>;
      break;
    case "history":
      command = <span>{historyIndex < 0 ? "" : history[historyIndex]}</span>;
      output = <div className={styles.historyList}>{history.map((item, index) => <div key={item} data-active={historyIndex === index}><span>{index + 1}</span><code>{item}</code>{historyIndex === index && <Icon name="check" />}</div>)}</div>;
      break;
    case "commands":
      command = <span>tree -L 2</span>;
      output = played ? <pre>{"k-shell/\n├── src/\n│   └── main.rs\n└── Cargo.toml"}</pre> : <div className={styles.completionNote}>Explore your project, one directory at a time.</div>;
      break;
    case "themes":
      command = <><span>theme </span><span className={styles.syntaxValid}>{theme.toLowerCase()}</span></>;
      output = <div className={styles.themeSample}><Logo /><div><strong>{theme}</strong><span>A different mood. The same K Shell.</span></div></div>;
      break;
    case "native":
      command = <span>git status</span>;
      output = played ? <pre>{"On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean"}</pre> : <div className={styles.toolList}>{["Git", "Cargo", "Python", "npm"].map((tool) => <span key={tool}>{tool}</span>)}</div>;
      break;
  }

  return (
    <div className={styles.demo}>
      <div className={`${styles.terminal} ${styles[theme.toLowerCase()]}`}>
        <div className={styles.titlebar} aria-hidden="true"><span><Logo /> K Shell</span><div><span>−</span><span>□</span><span>×</span></div></div>
        <div className={styles.terminalBody}>
          <div className={styles.path}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M2 5h6l2 2h8v9H2V5Z" stroke="currentColor" strokeWidth="1.4" /></svg><span>D:\projects\k-shell</span><span className={styles.branch}>main</span></div>
          <div className={styles.demoResult} aria-live="polite" aria-atomic="true">
            <div className={styles.command}><span className={styles.prompt}>›</span><code>{command}<span className={styles.caret} aria-hidden="true" /></code></div>
            <div className={styles.output}>{output}</div>
          </div>
        </div>
        <div className={styles.terminalStatus}><span><span className={styles.statusDot} />{played && feature.id === "completion" ? "Ready to run" : "K Shell on Windows"}</span><span>Illustrative preview</span></div>
      </div>
      <div className={styles.demoControls}>
        {feature.id === "themes" ? <div className={styles.themeChoices} role="group" aria-label="Preview a terminal theme">{themes.map((item) => <button key={item} className={styles[item.toLowerCase()]} aria-pressed={theme === item} onClick={() => setTheme(item)}><i />{item}</button>)}</div> : <button className={styles.playButton} onClick={play} disabled={played && feature.id !== "history"}><kbd>{played && feature.id !== "history" ? <Icon name="check" /> : feature.key}</kbd><span>{played && feature.id !== "history" ? "Preview shown" : feature.action}</span></button>}
        <span className={styles.demoNote}>Try it here</span>
      </div>
    </div>
  );
}

export function FeatureExplorer({ editorial = false }: { editorial?: boolean }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const feature = features[selected];

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % features.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + features.length) % features.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = features.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className={`section container ${styles.section} ${editorial ? styles.editorial : ""}`} id="features" aria-labelledby="features-heading">
      <div className={styles.heading}><div><span className={styles.kicker}>Small details. A better everyday.</span><h2 id="features-heading">Less friction<br />More flow</h2></div></div>
      <div className={styles.explorer}>
        <div className={styles.tabs} role="tablist" aria-label="K Shell features">
          {features.map((item, index) => <button key={item.id} ref={(node) => { tabs.current[index] = node; }} id={`feature-tab-${item.id}`} role="tab" aria-selected={selected === index} aria-controls="feature-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => navigateTabs(event, index)}><Icon name={item.icon} /><span><strong>{item.label}</strong><span>{item.caption}</span></span></button>)}
        </div>
        <div className={styles.panel} role="tabpanel" id="feature-panel" aria-labelledby={`feature-tab-${feature.id}`} tabIndex={0}>
          <div className={styles.copy}>
            <span className={styles.featureIcon}><Icon name={feature.icon} /></span>
            <h3>{feature.title}</h3><p>{feature.text}</p>
            <div className={styles.benefit}><Icon name="check" /><span>{feature.benefit}</span></div>
            <Link className={styles.guide} href={`/docs/#${feature.link}`}>Explore {feature.label.toLowerCase()} <Arrow /></Link>
          </div>
          <FeatureDemo key={feature.id} feature={feature} />
        </div>
      </div>
      <div className={styles.footnote}><span><Icon name="rust" />Built with Rust. At home on Windows.</span><Link href="/docs/">Meet your next shell <Arrow /></Link></div>
    </section>
  );
}
