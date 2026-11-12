import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Icon, Logo } from "../components/ui";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: "The story and technology behind K Shell: a native Windows shell built with Rust, Rustyline, windows-sys, and unicode-width.",
};

const dependencies = [
  {
    name: "Rustyline", version: "19.0.0", icon: "terminal", role: "The interactive experience",
    description: "Line editing, persistent history, and the hooks K Shell uses for completion, hints, and highlighting.",
    detail: "K Shell implements its own completion and validation logic on top of Rustyline’s editor. File-history and custom-key-binding features keep useful commands and keyboard shortcuts within reach.",
    href: "https://docs.rs/rustyline/19.0.0/rustyline/",
  },
  {
    name: "windows-sys", version: "0.61.2", icon: "windows", role: "A direct connection to Windows",
    description: "Native Windows API bindings for console behavior, files, system information, and desktop integration.",
    detail: "Windows-specific operations live in dedicated platform modules. They handle tasks such as console titles, interrupts, file associations, filesystem checks, and read-only system snapshots.",
    href: "https://docs.rs/windows-sys/0.61.2/windows_sys/",
  },
  {
    name: "unicode-width", version: "0.2.3", icon: "code", role: "Space for every character",
    description: "Measures text in terminal cells so file listings and prompts can align with Unicode filenames.",
    detail: "A character does not always occupy one terminal cell. K Shell uses unicode-width when laying out output so spacing follows the visible width of the text.",
    href: "https://docs.rs/unicode-width/",
  },
];

const layers = [
  { title: "Interactive editor", location: "src/interactive", text: "The prompt, editing, suggestions, and command history. Rustyline handles the editing surface; K Shell supplies its shell-specific behavior.", icon: "terminal" },
  { title: "Language & runtime", location: "src/language + src/runtime", text: "K Shell’s own lexer and single-command parser turn input into commands. Its runtime dispatches built-ins and launches native applications.", icon: "code" },
  { title: "Windows platform", location: "src/platform", text: "Native process lookup, console behavior, and Windows APIs stay behind a dedicated platform layer.", icon: "windows" },
];

export default function About() {
  return (
    <main id="main-content" className="about-page">
      <section className="container about-intro">
        <div className="about-intro-copy">
          <span className="about-eyebrow"><Logo /> The story behind the prompt</span>
          <h1>Windows roots.<br />Open possibilities.</h1>
          <p>K Shell is an open-source shell written in Rust. Inspired by Zsh and Fish, built to make your Windows command line feel like your own.</p>
          <div className="about-intro-actions"><a href="#technology" className="button button-primary">See what’s inside <Arrow /></a><Link href="/docs/" className="text-link">Start a session <Arrow /></Link></div>
          <div className="about-project-meta"><span><span className="status-dot" /> In active development</span><span>MIT licensed</span></div>
        </div>
        <figure className="shell-blueprint">
          <div className="blueprint-heading"><span><Icon name="windows" /> Native by design</span><code>kshell.exe</code></div>
          <div className="blueprint-stack">
            <div className="blueprint-node"><Icon name="terminal" /><div><strong>Your next command</strong><span>Editing & history with Rustyline</span></div><kbd>Enter</kbd></div>
            <span className="blueprint-connector" aria-hidden="true" />
            <div className="blueprint-core"><span className="blueprint-core-icon"><Logo /></span><div><strong>K Shell</strong><span>Lexer. Parser. Runtime.</span></div><span className="blueprint-rust"><Icon name="rust" /> Rust</span></div>
            <span className="blueprint-connector" aria-hidden="true" />
            <div className="blueprint-node"><Icon name="windows" /><div><strong>Right at home on Windows</strong><span>Native processes & platform APIs</span></div></div>
          </div>
          <figcaption><span className="status-dot" /> From a keystroke to a native Windows process.</figcaption>
        </figure>
      </section>

      <nav className="container about-page-nav" aria-label="On this page"><span>Get to know K Shell</span><a href="#project">The idea</a><a href="#technology">The technology</a><a href="#architecture">Under the hood</a><a href="#roadmap">What’s next</a></nav>

      <section id="project" className="container about-story">
        <div><span className="section-kicker">A familiar feeling, built from the ground up.</span><h2>The shell should<br />meet you halfway.</h2></div>
        <div className="about-story-copy"><p>A good command line gives you room to think. It remembers where you’ve been, helps with what comes next, and makes the routine feel effortless.</p><p>That’s the idea behind K Shell. Take inspiration from the experience of Zsh and Fish, then build for Windows on its own terms: native applications, familiar paths, and a prompt that fits your workflow.</p><p>The current shell brings together Linux-style file commands, smart suggestions, persistent history, and personal themes. It’s a foundation that’s still growing, with its own language and runtime at the center.</p></div>
      </section>

      <div className="container about-beliefs"><article><Icon name="windows" /><div><h3>Native where it matters.</h3><p>Work with Windows programs and paths directly.</p></div></article><article><Icon name="sliders" /><div><h3>Personal by choice.</h3><p>Colors, icons, and suggestions that feel like you.</p></div></article><article><Icon name="code" /><div><h3>Open from the start.</h3><p>MIT licensed, with room to explore and contribute.</p></div></article></div>

      <section id="technology" className="about-technology">
        <div className="container">
          <div className="section-heading"><div><span className="section-kicker">The technology behind K Shell</span><h2>Small stack.<br />Deep foundations.</h2></div><p>A native core and a few focused libraries.<br />Each one has a clear job.</p></div>
          <div className="technology-layout">
            <article className="rust-foundation"><div className="rust-foundation-top"><span className="rust-symbol"><Icon name="rust" /></span><span className="technology-badge">Core language</span></div><h3>Rust</h3><span className="rust-edition">2024 edition</span><p>The shell’s own lexer, parser, runtime, commands, and platform modules are written in Rust.</p><div className="rust-source-sample"><code><span>language</span> / lexer + parser<br /><span>runtime</span> / command dispatch<br /><span>platform</span> / native Windows</code></div><a className="text-link" href="https://doc.rust-lang.org/edition-guide/rust-2024/index.html" target="_blank" rel="noopener noreferrer">Explore Rust 2024 <Arrow /></a></article>
            <div className="dependency-list">{dependencies.map((dependency) => <details className="dependency" key={dependency.name}><summary><span className="dependency-icon"><Icon name={dependency.icon} /></span><span className="dependency-summary"><span className="dependency-title"><strong>{dependency.name}</strong><code>{dependency.version}</code></span><span>{dependency.role}</span><span className="dependency-description">{dependency.description}</span></span><span className="dependency-expand" aria-hidden="true">+</span></summary><div className="dependency-expanded"><p>{dependency.detail}</p><a href={dependency.href} target="_blank" rel="noopener noreferrer">Read the library documentation <Arrow /></a></div></details>)}</div>
          </div>
          <p className="technology-source"><Icon name="book" /> Versions reflect this project’s Cargo.lock. <a href="/reference.md" download>Download the project reference <Arrow /></a></p>
        </div>
      </section>

      <section id="architecture" className="container about-architecture"><div className="architecture-intro"><span className="section-kicker">Under the hood</span><h2>One command.<br />Clear responsibilities.</h2><p>The interactive layer, language, and Windows integration each have their place. Here’s how the pieces fit together.</p><Link href="/docs/#commands" className="text-link">Try your first command <Arrow /></Link></div><div className="architecture-layers">{layers.map((layer) => <article key={layer.title}><span className="architecture-icon"><Icon name={layer.icon} /></span><div><code>{layer.location}</code><h3>{layer.title}</h3><p>{layer.text}</p></div></article>)}</div></section>

      <section id="roadmap" className="container about-progress"><div className="section-heading"><div><span className="section-kicker">An open project. A clear direction.</span><h2>A useful foundation.<br />More to build.</h2></div><p>K Shell is in active development.<br />Here’s what’s available and what’s ahead.</p></div><div className="progress-columns"><article><span className="progress-label"><span className="status-dot" /> In the current build</span><h3>Ready for your next session.</h3><ul><li>Linux-style file and directory commands</li><li>Native Windows application execution</li><li>Completion, suggestions, and persistent history</li><li>Ocean, Dusk, and Midnight appearance options</li></ul></article><article><span className="progress-label future"><Icon name="code" /> Future direction</span><h3>A more expressive shell.</h3><ul><li>Pipes and file redirection</li><li>Variables and aliases</li><li>A fuller shell scripting language</li></ul><p>These are planned capabilities and are not implemented in the current build.</p></article></div></section>

      <section className="container about-open-source"><div className="open-source-mark"><Logo /></div><div><span className="section-kicker">Free to use. Open to possibility.</span><h2>Your next idea starts<br />with a fresh prompt.</h2><p>Explore the docs, build it yourself, and make K Shell part of your workflow.</p><div className="open-source-actions"><Link className="button button-primary" href="/docs/#installation">Get started with K Shell <Arrow /></Link><a className="text-link" href="/LICENSE.txt">Read the MIT license <Arrow /></a></div></div></section>
    </main>
  );
}
