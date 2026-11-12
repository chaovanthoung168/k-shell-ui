import Link from "next/link";
import { Arrow, Icon, Logo } from "./ui";
import { TerminalDemo } from "./terminal-demo";

export function Hero() {
  return (
    <section className="hero-banner">
      <div className="hero-backdrop" aria-hidden="true"><span /><span /><span /></div>
      <div className="container hero-banner-inner">
        <div className="hero-intro">
          <Link href="/about/#project" className="hero-announcement"><span className="status-dot" /><code>kshell.exe</code><span>A fresh take on Windows</span><Arrow /></Link>
          <h1>A smarter shell.<br />Built for Windows.</h1>
          <p>Built with Rust. Inspired by Zsh and Fish.<br className="desktop-break" /> Familiar commands, smart suggestions, and a shell that feels like yours.</p>
          <div className="hero-banner-actions">
            <Link className="button button-primary" href="/docs/#installation"><Logo /> Start your session <Arrow /></Link>
            <a className="button button-secondary" href="#features">Find your flow <Icon name="spark" /></a>
          </div>
          <div className="hero-proof"><span><Icon name="windows" /> Native Windows</span><span><Icon name="rust" /> Built with Rust</span><span><Icon name="code" /> Open source</span></div>
        </div>
        <div className="hero-command-stage">
          <div className="stage-track" aria-hidden="true" />
          <div className="stage-callout completion-callout"><span className="callout-icon"><Icon name="spark" /></span><div><span>A thought ahead.</span><code>cargo bu<span>ild</span><kbd>Tab</kbd></code></div></div>
          <div className="hero-terminal"><TerminalDemo /></div>
          <Link href="/docs/#customization" className="stage-callout theme-callout"><div className="theme-swatches" aria-hidden="true"><i /><i /><i /></div><div><span>Feels like you.</span><strong>Three themes. Your choice.</strong></div><Arrow /></Link>
          <span className="stage-corner corner-top" aria-hidden="true">+</span><span className="stage-corner corner-bottom" aria-hidden="true">+</span>
        </div>
        <div className="hero-stage-caption"><span className="status-dot" /> An actual taste of your next terminal. Go ahead, type something.</div>
      </div>
    </section>
  );
}
