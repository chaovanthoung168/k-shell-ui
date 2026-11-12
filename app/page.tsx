import Link from "next/link";
import { Arrow, Icon, Logo } from "./components/ui";
import { Hero } from "./components/hero";
import { FeatureExplorer } from "./components/feature-explorer";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <div className="foundation container"><span>A better shell, from the ground up.</span><div><span><Icon name="rust" /> Powered by Rust</span><span><Icon name="terminal" /> Inspired by Zsh & Fish</span><span><Icon name="code" /> Open by design</span></div></div>
      <FeatureExplorer />
      <section className="advantage-section"><div className="container advantage-grid"><div className="advantage-copy"><span className="section-kicker">Feels familiar. Works natively.</span><h2>Linux habits.<br />Windows home.</h2><p>Your favorite command-line habits, without leaving Windows. Navigate with <code>ls</code>, read with <code>cat</code>, and keep using the tools you already know.</p><Link className="text-link" href="/docs/#commands">Find your first command <Arrow /></Link></div><div className="advantage-list"><article><Icon name="windows" /><div><h3>Windows, first class.</h3><p>A native executable that works in your terminal. No WSL or compatibility layer required.</p></div></article><article><Icon name="sliders" /><div><h3>Make yourself at home.</h3><p>Choose Ocean, Dusk, or Midnight. Fine-tune your icons and suggestion styles.</p></div></article><article><Icon name="code" /><div><h3>Your tools come along.</h3><p>Run Git, Cargo, Python, and your installed developer tools from one familiar prompt.</p></div></article></div></div></section>
      <section className="section container quickstart"><div><span className="section-kicker">A fresh prompt is waiting.</span><h2>Meet your next shell.</h2><p>Build it, launch it, make it yours.</p><Link className="button button-primary" href="/docs/#installation">Install K Shell <Arrow /></Link></div><div className="quickstart-code"><div className="code-label"><Logo /> From the source directory <span>PowerShell</span></div><pre><span className="muted"># Build K Shell with stable Rust</span>{"\n"}cargo build{"\n\n"}<span className="muted"># Start your first session</span>{"\n"}cargo run</pre><Link href="/docs/#build-from-source">See prerequisites and installation guide <Arrow /></Link></div></section>
      <section className="about-strip container"><span className="about-symbol"><Logo /></span><div><h3>Made for the love of the command line.</h3><p>Open source. Built with Rust. Inspired by the shells we love.</p></div><Link href="/about/" className="text-link">The story behind K Shell <Arrow /></Link></section>
    </main>
  );
}
