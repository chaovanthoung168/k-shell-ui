import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Icon } from "../components/ui";
import { ToolGuides } from "../components/tool-guides";
import { FeatureWorkbench } from "./feature-workbench";
import styles from "./features.module.css";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore K Shell’s familiar commands, completion, history, prompt themes, Kpm package manager, and kreq HTTP client.",
};

export default function Features() {
  return <main id="main-content" className={styles.page}>
    <div className="container">
      <header className={styles.intro}>
        <div className={styles.breadcrumb}><Link href="/">K Shell</Link><span>/</span><span>Features</span></div>
        <div className={styles.introGrid}><h1>One familiar prompt.<br />More within reach.</h1><div><p>Navigate your files, finish a command, and make your prompt feel like home. Explore the details that make K Shell yours.</p><div className={styles.actions}><Link className={styles.primary} href="/playground/"><Icon name="terminal" />Try the Playground</Link><Link className={styles.secondary} href="/docs/">Read the handbook<Arrow /></Link></div></div></div>
      </header>
      <FeatureWorkbench />
    </div>
    <ToolGuides />
    <section className={`container ${styles.closing}`} aria-labelledby="features-start-heading"><div><h2 id="features-start-heading">Make it your daily prompt.</h2><p>Native on Windows 10 and 11. Built with Rust. No WSL required.</p></div><Link className={styles.primary} href="/docs/#installation">Install K Shell<Arrow /></Link></section>
  </main>;
}
