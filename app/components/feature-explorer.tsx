"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow, Icon } from "./ui";

const features = [
  { id: "completion", icon: "spark", title: "Finish the thought.", label: "Smart completion", text: "Commands, paths, and suggestions, right where you need them. A quick Tab takes you from almost there to ready to run.", command: "cargo bu", hint: "ild --release", output: ["A little less typing.", "A little more doing."], key: "Tab", keyText: "Accept a suggestion", link: "shortcuts" },
  { id: "colors", icon: "palette", title: "See it before you run it.", label: "Syntax highlighting", text: "Suggestions use color to show locally valid syntax, a known mistake, or an argument that has not been verified. More clarity before Enter.", command: "echo ", hint: "'hello, world'", output: ["Mint: locally valid or remembered success", "Rose: a known syntax or command error", "Slate: external arguments not yet verified"], key: "Enter", keyText: "Run when you are ready", link: "shortcuts" },
  { id: "history", icon: "history", title: "Pick up where you left off.", label: "Persistent history", text: "The useful command from yesterday is still within reach. Recall previous input or search your history without leaving the prompt.", command: "history 3", hint: "", output: ["1  cargo build", "2  cd projects", "3  ls -la"], key: "Ctrl R", keyText: "Find that command again", link: "shortcuts" },
  { id: "commands", icon: "terminal", title: "Your habits come with you.", label: "Familiar commands", text: "Navigate with cd, explore with ls, read with cat. Useful Linux-style file commands, made to work with Windows paths.", command: "tree -L 2", hint: "", output: ["k-shell/", "├── src/", "│   └── main.rs", "└── Cargo.toml"], key: "ls", keyText: "A familiar place to start", link: "commands" },
  { id: "themes", icon: "sliders", title: "Set your own atmosphere.", label: "Personal themes", text: "Ocean, Dusk, or Midnight. Choose your colors, icons, and suggestion style for a command line that feels like yours.", command: "theme midnight", hint: "", output: ["Theme set to Midnight.", "Try Ocean or Dusk for a different mood."], key: "theme", keyText: "See your current choices", link: "customization" },
  { id: "native", icon: "windows", title: "Right at home on Windows.", label: "Native developer tools", text: "Keep working with your installed Git, Cargo, Python, and supported npm and VS Code setups. No Linux compatibility layer required.", command: "git status", hint: "", output: ["On branch main", "Your branch is up to date.", "Ready for your next commit."], key: ">_", keyText: "Your tools, one prompt", link: "commands" },
];

export function FeatureExplorer() {
  const [selected, setSelected] = useState(0);
  const feature = features[selected];

  return (
    <section className="section container feature-section" id="features">
      <div className="section-heading"><div><span className="section-kicker">Built around the way you work.</span><h2>Find your flow.<br />Keep it.</h2></div><p>The little things, thoughtfully connected.<br />Explore what makes K Shell feel different.</p></div>
      <div className="feature-explorer">
        <div className="feature-selector" role="group" aria-label="Explore K Shell features">
          {features.map((item, index) => <button key={item.id} aria-pressed={selected === index} className={selected === index ? "feature-option is-selected" : "feature-option"} onClick={() => setSelected(index)}><Icon name={item.icon} /><span>{item.label}</span><Arrow /></button>)}
        </div>
        <div className={`feature-detail feature-detail-${feature.id}`} aria-live="polite">
          <div className="feature-detail-copy"><span className="feature-detail-icon"><Icon name={feature.icon} /></span><h3>{feature.title}</h3><p>{feature.text}</p></div>
          <div className="feature-preview" key={feature.id}>
            <div className="preview-path"><span className="status-dot" /> ~/your-next-project</div>
            <div className="preview-command"><span className="prompt">›</span> {feature.command}<span className="preview-hint">{feature.hint}</span></div>
            <pre>{feature.output.join("\n")}</pre>
            <div className="preview-shortcut"><kbd>{feature.key}</kbd><span>{feature.keyText}</span></div>
          </div>
          <Link className="feature-guide" href={`/docs/#${feature.link}`}>Take it for a spin <Arrow /></Link>
        </div>
      </div>
      <div className="feature-footnote"><Icon name="rust" /><span>Rust at the core. Windows at heart. Thoughtful by design.</span><Link href="/docs/">Explore the documentation <Arrow /></Link></div>
    </section>
  );
}
